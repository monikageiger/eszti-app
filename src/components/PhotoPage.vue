<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { images } from '../images'

const route = useRoute()
const router = useRouter()

const work = computed(() => images.find(img => img.id === Number(route.params.id)))

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') router.push('/')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <main class="main">
    <div v-if="work" class="photo-wrap">
      <button class="back-btn" @click="router.push('/')">
        <FaIcon icon="chevron-left" /> Back
      </button>
      <div class="img-wrap">
        <img :src="work.src" :alt="work.alt" draggable="false" />
        <div class="img-shield" @contextmenu.prevent />
      </div>
    </div>
    <div v-else class="not-found">
      <p>Not found.</p>
      <button class="back-btn" @click="router.push('/')">
        <FaIcon icon="chevron-left" /> Back
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '../styles/mixins' as *;

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px 48px;
}

.photo-wrap {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fade 0.5s ease both;
}

.img-wrap {
  position: relative;

  img {
    display: block;
    width: 100%;
    max-height: calc(100svh - 200px);
    object-fit: contain;
  }
}

.img-shield {
  position: absolute;
  inset: 0;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--ink-muted);

  p {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-style: italic;
  }
}

.back-btn {
  @include ghost-btn;
  align-self: flex-start;
}
</style>
