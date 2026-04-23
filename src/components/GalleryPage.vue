<script setup lang="ts">
import { images } from '../images'

const pad = (n: number) => String(n).padStart(3, '0')
</script>

<template>
  <main>
    <section class="gallery">
      <div class="masonry">
        <RouterLink
          v-for="img in images"
          :key="img.id"
          :to="`/image/${img.id}`"
          class="frame"
        >
          <div class="frame-img">
            <img :src="img.src" :alt="img.alt" loading="lazy" draggable="false" />
            <div class="img-shield" @contextmenu.prevent />
          </div>
          <div class="frame-caption">
            <span class="num">№ {{ pad(img.id) }}</span>
            <span class="plus">View <span class="arr">→</span></span>
          </div>
        </RouterLink>
      </div>
    </section>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Eszter Bodnar</p>
    </footer>
  </main>
</template>

<style scoped lang="scss">
@use '../styles/mixins' as *;

.gallery {
  @include container;
  padding-top: 40px;
  padding-bottom: 64px;

  @include md {
    padding-top: 56px;
    padding-bottom: 80px;
  }
}

.masonry {
  columns: 1;
  column-gap: 24px;

  @include md {
    columns: 2;
    column-gap: 28px;
  }

  @include lg {
    columns: 3;
    column-gap: 32px;
  }
}

.frame {
  display: block;
  break-inside: avoid;
  margin-bottom: 28px;
  text-decoration: none;
  color: inherit;

  @include md { margin-bottom: 32px; }
}

.frame-img {
  position: relative;
  overflow: hidden;
  background: var(--bg-secondary);

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.9s cubic-bezier(0.2, 0.6, 0.15, 1), filter 0.6s ease;
    will-change: transform;
  }

  .frame:hover & img {
    transform: scale(1.025);
    filter: saturate(1.05);
  }
}

.img-shield {
  position: absolute;
  inset: 0;
}

.frame-caption {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 2px 0;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  .num { color: var(--ink); }

  .plus {
    color: var(--ink-muted);
    opacity: 0.55;
    transition: opacity 0.3s ease, color 0.3s ease;

    .arr {
      display: inline-block;
      transition: transform 0.3s ease;
    }
  }

  .frame:hover & .plus {
    opacity: 1;
    color: var(--accent);
    .arr { transform: translateX(4px); }
  }
}

.footer {
  border-top: 1px solid var(--rule);
  padding: 24px 16px;
  text-align: center;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
</style>
