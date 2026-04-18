<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.dataset.theme === 'dark'
})

function toggleTheme() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)
}
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <RouterLink to="/" class="logo">Eszter Bodnar</RouterLink>
        <nav class="nav">
          <RouterLink to="/contact"><FaIcon icon="envelope" />Contact</RouterLink>
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

    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@use './styles/mixins' as *;

.app {
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
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
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
    display: flex;
    align-items: center;
    gap: 6px;
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
</style>
