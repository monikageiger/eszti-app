<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { images } from '../images'

const isDark = ref(false)

onMounted(() => {
  const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = prefersDark
  document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light'
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
}
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <span class="logo">Gallery</span>
        <nav class="nav">
          <RouterLink to="/">Photos</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>
        <button
          class="theme-toggle"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <span class="toggle-track" :class="{ active: isDark }">
            <span class="toggle-thumb">
              <FaIcon v-if="!isDark" icon="sun" />
              <FaIcon v-else icon="moon" />
            </span>
          </span>
        </button>
      </div>
    </header>

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
      <p>© {{ new Date().getFullYear() }} Gallery</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/mixins' as *;

.page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.header {
  @include sticky-header;
  backdrop-filter: blur(8px);
}

.header-inner {
  @include header-inner;
}

.logo {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
}

.nav {
  display: flex;
  gap: 4px;
  margin-left: auto;

  a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;

    &:hover {
      color: var(--text);
      background: var(--bg-secondary);
    }
  }
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50px;
  display: flex;
  align-items: center;
}

.toggle-track {
  width: 44px;
  height: 24px;
  border-radius: 50px;
  background: var(--toggle-bg);
  display: flex;
  align-items: center;
  padding: 2px;
  transition: background 0.25s ease;

  &.active {
    background: var(--accent);

    .toggle-thumb {
      transform: translateX(20px);
      svg { color: var(--accent); }
    }
  }
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--toggle-thumb);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  svg {
    width: 11px;
    height: 11px;
    color: #6b7280;
  }
}

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
  display: block;
  position: relative;
  break-inside: avoid;
  margin-bottom: 20px;
  overflow: hidden;
  background: var(--bg-secondary);
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
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
