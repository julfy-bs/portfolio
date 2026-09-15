import { cn } from '@/shared/lib';

import styles from './pagination.module.css';

export interface PaginationProps {
  /** Нумерация с 1. */
  readonly page: number;
  readonly pageCount: number;
  readonly onChange: (page: number) => void;
  readonly ariaLabel: string;
  readonly prevLabel: string;
  readonly nextLabel: string;
}

// Страниц немного, поэтому показываем все номера без сокращения через многоточие.
export function Pagination({
  page,
  pageCount,
  onChange,
  ariaLabel,
  prevLabel,
  nextLabel,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const go = (target: number): void => {
    const next = Math.min(Math.max(target, 1), pageCount);
    if (next !== page) onChange(next);
  };

  return (
    <nav className={styles.pagination} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label={prevLabel}
      >
        ‹
      </button>
      <ul className={styles.pages}>
        {pages.map((value) => (
          <li key={value}>
            <button
              type="button"
              className={cn(styles.page, value === page && styles.active)}
              aria-current={value === page ? 'page' : undefined}
              onClick={() => go(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(page + 1)}
        disabled={page >= pageCount}
        aria-label={nextLabel}
      >
        ›
      </button>
    </nav>
  );
}
