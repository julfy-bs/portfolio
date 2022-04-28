<template>
  <div
    ref="group"
    class="navigation__group"
  >
    <button
      ref="button"
      class="navigation__button"
      aria-haspopup="true"
      aria-expanded="false"
      @click="toggleFlyout(group, button)"
    >
      <span
        class="navigation__button-text"
      >
        {{ linksGroup.title }}
      </span>
      <element-svg
        v-if="!isBurgerActive"
        file-name="arrow-left"
        class="navigation__button-icon"
      />
      <element-svg
        v-else
        file-name="plus"
        class="navigation__button-icon"
      />
    </button>
    <div
      v-if="!isBurgerActive"
      class="navigation__flyout"
      @mouseleave="closeFlyout(group, button)"
    >
      <div class="flyout-menu">
        <div class="flyout-menu__items">
          <div class="flyout-menu__group">
            <p
              v-if="linksGroup.groupName"
              class="flyout-menu__title"
            >
              {{ linksGroup.groupName }}
            </p>
            <router-link
              v-for="groupItem in linksGroup.group"
              :key="groupItem.id"
              :to="groupItem.to"
              class="navigation__link"
              :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
              @click="closeBurger"
            >
              {{ groupItem.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="navigation-screen-group__list"
    >
      <div class="navigation-screen-group__item">
        <p
          v-if="linksGroup.groupName"
          class="flyout-menu__title"
        >
          {{ linksGroup.groupName }}
        </p>
        <router-link
          v-for="groupItem in linksGroup.group"
          :key="groupItem.id"
          :to="groupItem.to"
          class="navigation__link"
          :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
          @click="closeBurger"
        >
          {{ groupItem.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementSvg from '@/components/UI/ElementSvg/ElementSvg.vue'
import { useBurger } from '@/hooks/useBurger'
import { useFlayout } from '@/hooks/useFlayout'
import { ref, toRefs } from 'vue'

const { closeBurger, isBurgerActive } = useBurger()
const { closeFlyout, toggleFlyout } = useFlayout()

interface Props {
  linksGroup: {
    id: number;
    title: string;
    isGroup: boolean;
    to: string | null;
    groupName?: string;
    group?: [
      {
        id: number;
        title: string;
        to: string;
      },
    ]
  },
}

const props = defineProps<Props>()
const { linksGroup } = toRefs(props)

const group = ref<HTMLDivElement | null>(null)
const button = ref<HTMLButtonElement | null>(null)
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.navigation {
  .navigation__group {
    position: relative;

    &:hover {
      transition: color .25s;

      .navigation__button-text {
        color: $text-2;
      }
    }
  }

  .navigation__group:hover .navigation__flyout,
  .navigation__button[aria-expanded=true] + .navigation__flyout {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .navigation__button {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: $header-height;
    color: $text-1;
    transition: color .5s;
    width: 100%;

    &:focus {
      .navigation__flyout {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
  }

  .navigation__button-text {
    display: flex;
    align-items: center;
    line-height: $header-height;
    font-size: 13px;
    font-weight: 500;
    color: $text-1;
    transition: color .25s;
    font-family: $font-family-base;

  }

  .navigation__button-icon {
    transform: rotate(-90deg);
    margin-left: 4px;
    width: 14px;
    height: 14px;
    fill: currentColor;
  }

  .navigation__flyout {
    position: absolute;
    top: calc(#{$header-height} / 2 + 15px);
    right: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: opacity .25s, visibility .25s, transform .25s;
  }

  .flyout-menu {
    border-radius: 8px;
    padding: 12px 0;
    min-width: 192px;
    border: 1px solid transparent;
    background: $bg;
    box-shadow: $shadow-3;
    transition: background-color .5s;
  }


  .flyout-menu__items {
    transition: border-color .5s;
  }

  .flyout-menu .flyout-menu__group {
    padding: 0 0 12px;
  }

  .flyout-menu__title {
    padding: 0 18px;
    line-height: 28px;
    font-size: 10px;
    font-weight: 600;
    color: $text-3;
    text-transform: uppercase;
    transition: color .25s;
  }

  .flyout-menu .navigation__link {
    display: block;
    padding: 0 18px;
    line-height: 28px;
    font-size: 13px;
    font-weight: 400;
    color: $text-1;
    white-space: nowrap;
    transition: color .25s;

    &:hover {
      color: $hover-link-color;
    }
  }
}

.navigation--burger-is-active {

  .navigation__group {
    border-bottom: 1px solid $divider-2;
    height: 48px;
    overflow: hidden;
    transition: border-color .5s;

    &:hover {
      .navigation__button-text {
        color: $text-1;
      }
    }

    .navigation-screen-group__list {
      visibility: hidden;
    }

    .navigation__button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 4px 11px 0;
      width: 100%;
      line-height: 24px;
      font-size: 14px;
      font-weight: 500;
      color: $text-1;
      transition: color .25s;

      &:hover {
        color: $hover-link-color;

        .navigation__button-text {
          color: $hover-link-color;
        }
      }
    }

    .navigation__button-text {
      font-size: 14px;
    }

    .navigation__button-icon {
      transform: rotate(0deg);
      margin: 0;
      transition: fill .5s, transform .25s;
    }
  }

  .navigation__group.open {
    height: auto;

    & .navigation__button-text {
      font-size: 14px;
      color: $hover-link-color;
    }

    & .navigation__button-icon {
      transform: rotate(45deg);
      color: $hover-link-color;
    }

    & .navigation-screen-group__list {
      visibility: visible;
    }

    & .item__title {
      line-height: 32px;
      font-size: 11px;
      font-weight: 700;
      color: $text-2;
      text-transform: uppercase;
      transition: color .25s;
    }

    & .navigation__link {
      display: block;
      line-height: 32px;
      font-size: 13px;
      font-weight: 400;
      color: $text-1;
      transition: color .25s;
      margin-left: 0.6em;
      padding: 0;

      &:hover {
        color: $hover-link-color;
      }
    }
  }

}

.dark-theme .flyout-menu {
  background: $bg;
  box-shadow: $shadow-1;
  border: 1px solid $divider-2;
}

.ease-out-enter-active {
  transition: all 3s ease-out;
}

.ease-out-leave-active {
  transition: all 3s ease-out;
}

.ease-out-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.ease-out-enter-from {
  opacity: .3;
  transform: translateY(-20px);
}

.ease-out-enter {
  opacity: 1;
  transform: translateY(0px);
}

.ease-out-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
</style>
