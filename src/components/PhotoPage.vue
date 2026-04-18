<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { images } from '../images'

const route = useRoute()
const router = useRouter()

const photo = computed(() => images.find(img => img.id === Number(route.params.id)))
</script>

<template>
  <div class="page">
    <header class="header">
      <button class="back-btn" @click="router.back()">
        <FaIcon icon="chevron-left" />
        Back
      </button>
      <span class="photo-label">{{ photo ? `Photo ${photo.id}` : '' }}</span>
    </header>

    <main class="main">
      <div v-if="photo" class="photo-wrap">
        <img :src="photo.src" :alt="photo.alt" draggable="false" />
        <div class="img-shield" @contextmenu.prevent />
      </div>
      <div v-else class="not-found">
        <p>Photo not found.</p>
        <button class="back-btn" @click="router.push('/')">Back to gallery</button>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/mixins' as *;

.page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.header {
  @include sticky-header;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  @include back-btn;
}

.photo-label {
  font-size: 14px;
  color: var(--text-muted);
}

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.photo-wrap {
  position: relative;
  width: 80%;
  max-width: 900px;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
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
  color: var(--text-muted);
}
</style>
