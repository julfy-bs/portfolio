import { useLayoutEffect, useRef, type RefObject } from 'react';

interface RevealOptions {
  /** Сдвиг по вертикали в начале анимации, px. */
  readonly y?: number;
  /** Длительность появления одного элемента, сек. */
  readonly duration?: number;
  /** Задержка между детьми, которые попали в вид одновременно, сек. */
  readonly stagger?: number;
}

// Описываем только нужный кусок gsap сами: библиотека грузится динамически, и её
// типы не должны попадать в статический граф импортов.
interface RevealTween {
  kill: () => void;
  progress: (value: number) => void;
}

interface GsapApi {
  fromTo: (
    targets: readonly HTMLElement[],
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
  ) => RevealTween;
}

/**
 * Плавно проявляет прямых детей контейнера, когда они попадают во вьюпорт при прокрутке.
 * Следим через IntersectionObserver, а не ScrollTrigger: тот опирается на
 * `window.innerHeight` и ломается на нестандартном вьюпорте. gsap грузим лениво, чтобы
 * не раздувать основной бандл.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
): RefObject<T | null> {
  const { y = 8, duration = 0.5, stagger = 0.08 } = options;
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }
    const items = Array.from(el.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    );
    if (items.length === 0) {
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const clearHidden = (targets: readonly HTMLElement[]): void => {
      for (const target of targets) {
        target.style.removeProperty('opacity');
        target.style.removeProperty('transform');
        target.style.removeProperty('will-change');
      }
    };

    // Прячем до первой отрисовки, иначе готовый контент успевает мигнуть.
    for (const item of items) {
      item.style.opacity = '0';
      item.style.transform = `translateY(${String(y)}px)`;
      item.style.willChange = 'opacity, transform';
    }

    // Без IntersectionObserver следить за прокруткой нечем, показываем сразу.
    if (typeof IntersectionObserver === 'undefined') {
      clearHidden(items);
      return undefined;
    }

    let cancelled = false;
    const pending = new Set<HTMLElement>(items);
    const tweens = new Set<RevealTween>();
    let gsapApi: GsapApi | undefined;
    let gsapPromise: Promise<void> | undefined;

    // Если observer так и не сработал, раскрываем оставшееся, чтобы контент не
    // остался скрытым навсегда.
    const failsafe = window.setTimeout(() => {
      clearHidden(Array.from(pending));
      pending.clear();
    }, 8000);

    const animate = (batch: readonly HTMLElement[]): void => {
      if (cancelled || batch.length === 0) {
        return;
      }
      if (!gsapApi) {
        clearHidden(batch);
        return;
      }
      const tween: RevealTween = gsapApi.fromTo(
        batch,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: 'power2.out',
          stagger,
          clearProps: 'opacity,transform,willChange',
          onComplete: () => {
            tweens.delete(tween);
          },
        },
      );
      tweens.add(tween);
      // В фоновой вкладке rAF замирает, и твин может застрять на середине.
      // setTimeout от rAF не зависит, поэтому им и доигрываем анимацию.
      const guardMs = (duration + stagger * batch.length + 0.4) * 1000;
      window.setTimeout(() => {
        tween.progress(1);
      }, guardMs);
    };

    const reveal = (batch: readonly HTMLElement[]): void => {
      for (const item of batch) {
        pending.delete(item);
      }
      if (pending.size === 0) {
        window.clearTimeout(failsafe);
      }
      gsapPromise ??= import('gsap')
        .then((module) => {
          gsapApi = module.gsap;
        })
        .catch(() => {
          // gsapApi остаётся пустым, и animate() покажет элементы без анимации.
        });
      void gsapPromise.then(() => {
        if (!cancelled) {
          animate(batch);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const entered = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .filter((target): target is HTMLElement => target instanceof HTMLElement);
        if (entered.length === 0) {
          return;
        }
        for (const target of entered) {
          obs.unobserve(target);
        }
        reveal(entered);
      },
      // Отступ снизу, чтобы секция проявлялась, когда уже немного вошла в кадр.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    for (const item of items) {
      observer.observe(item);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      observer.disconnect();
      for (const tween of tweens) {
        tween.kill();
      }
      clearHidden(items);
    };
  }, [y, duration, stagger]);

  return ref;
}
