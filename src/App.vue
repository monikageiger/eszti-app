<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.dataset.theme === 'dark'
})

function setTheme(dark: boolean) {
  isDark.value = dark
  const theme = dark ? 'dark' : 'light'
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

          <RouterLink to="/contact" class="nav-link" aria-label="Contact">
            <span class="nav-text">Contact</span>
            <FaIcon icon="envelope" class="nav-icon" />
          </RouterLink>
          <a
            href="https://www.instagram.com/bodnareszti/"
            target="_blank"
            rel="noopener"
            class="icon-link"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </nav>
        <fieldset class="theme-switch" aria-label="Theme">
          <span class="switch-thumb" :class="{ right: isDark }" aria-hidden="true" />
          <label class="switch-opt" :class="{ active: !isDark }" aria-label="Light mode">
            <input
              type="radio"
              name="theme"
              value="light"
              :checked="!isDark"
              @change="setTheme(false)"
            />
            <FaIcon icon="sun" />
          </label>
          <label class="switch-opt" :class="{ active: isDark }" aria-label="Dark mode">
            <input
              type="radio"
              name="theme"
              value="dark"
              :checked="isDark"
              @change="setTheme(true)"
            />
            <FaIcon icon="moon" />
          </label>
        </fieldset>
      </div>
    </header>

    <RouterView v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped lang="scss">
@use './styles/mixins' as *;

.app {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.header { @include sticky-header; }
.header-inner { @include header-inner; }

.logo {
  font-family: 'Fraunces', serif;
  font-variation-settings: 'SOFT' 40, 'opsz' 48;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: var(--ink-muted);
  transition: color 0.2s ease, transform 0.2s ease;

  svg { width: 17px; height: 17px; }

  &:hover {
    color: var(--ink);
    transform: translateY(-1px);
  }
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: var(--ink-muted);
  text-decoration: none;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  width: 34px;
  height: 34px;
  padding: 0;
  transition: color 0.2s ease, transform 0.2s ease;

  .nav-text { display: none; }
  .nav-icon { width: 15px; height: 15px; }

  @include md {
    width: auto;
    height: auto;
    padding: 10px 12px;

    .nav-text { display: inline; }
    .nav-icon { display: none; }

    &::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 6px;
      height: 1px;
      background: var(--ink);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
    }
  }

  &:hover {
    color: var(--ink);
    @media (max-width: 767px) { transform: translateY(-1px); }
  }

  &:hover::after,
  &.router-link-exact-active::after {
    transform: scaleX(1);
  }

  &.router-link-exact-active { color: var(--ink); }
}

/* ---------- Theme switch (segmented, ux-friendly) ---------- */
.theme-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 3px;
  margin: 0 0 0 10px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  background: var(--bg-secondary);
  overflow: hidden;
}

.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 30px;
  height: 30px;
  background: var(--ink);
  border-radius: 999px;
  transition: transform 0.35s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: 0;

  &.right { transform: translateX(30px); }
}

.switch-opt {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  cursor: pointer;
  color: var(--ink-muted);
  transition: color 0.25s ease;

  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: pointer;

    &:focus-visible + svg {
      outline: 2px solid var(--ink);
      outline-offset: 4px;
      border-radius: 50%;
    }
  }

  svg {
    width: 12px;
    height: 12px;
    pointer-events: none;
    transition: color 0.25s ease, transform 0.3s ease;
  }

  &.active {
    color: var(--bg);
    svg { transform: scale(1.05); }
  }

  &:not(.active):hover { color: var(--ink); }
}

/* ---------- Page transition ---------- */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
