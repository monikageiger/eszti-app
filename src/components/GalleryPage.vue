<script setup lang="ts">
import { images } from '../images'
</script>

<template>
  <main>
    <section class="gallery">
      <div class="masonry">
        <RouterLink
          v-for="img in images"
          :key="img.id"
          :to="`/image/${img.id}`"
          class="masonry-item"
        >
          <img :src="img.src" :alt="img.alt" loading="lazy" draggable="false" />
          <div class="img-shield" @contextmenu.prevent />
        </RouterLink>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>© {{ new Date().getFullYear() }} Eszter Bodnar</p>
  </footer>
</template>

<style scoped lang="scss">
@use '../styles/mixins' as *;

.gallery {
  width: 80%;
  margin: 0 auto;
  padding: 16px 0;
}

.masonry {
  columns: 1;
  column-gap: 20px;

  @include sm { columns: 2; }
}

.masonry-item {
  display: flex;
  justify-content: center;
  position: relative;
  break-inside: avoid;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: auto;
    max-width: 100%;
    max-height: calc(85svh - 56px);
    display: block;
  }
}

.img-shield {
  position: absolute;
  inset: 0;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 20px 16px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}
</style>
