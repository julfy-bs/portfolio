<template>
  <div class="socials">
    <ul class="socials__list">
      <li class="socials__item">
        <a
          href="https://github.com/julfy-bs"
          class="socials__link"
          target="_blank"
        >
          <element-svg
            file-name="github"
            class-name="icon icon--socials icon--github"
          />
        </a>
      </li>
      <li class="socials__item">
        <a
          href="https://t.me/julfy_bs"
          class="socials__link"
          target="_blank"
        >
          <element-svg
            file-name="telegram"
            class-name="icon icon--socials icon--telegram"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainSocials'
}
</script>

<style lang='scss' scoped>



.socials__list {
  display: flex;
}

.socials__item {
  padding: 0 10px;

  &:last-child {
    margin: 0;
  }
}
</style>
