<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { images } from '../images'

const route = useRoute()
const router = useRouter()

const photo = computed(() => images.find(img => img.id === Number(route.params.id)))
</script>

<template>
  <main class="main">
    <div v-if="photo" class="photo-wrap">
      <button class="back-btn" @click="router.push('/')">
        <FaIcon icon="chevron-left" />Back
      </button>
      <div class="img-wrap">
        <img :src="photo.src" :alt="photo.alt" draggable="false" />
        <div class="img-shield" @contextmenu.prevent />
      </div>
    </div>
    <div v-else class="not-found">
      <p>Photo not found.</p>
      <button class="back-btn" @click="router.push('/')">
        <FaIcon icon="chevron-left" />Back to gallery
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
  padding: 24px 16px;
}

.photo-wrap {
  width: 80%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.img-wrap {
  position: relative;

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

.back-btn {
  @include back-btn;
  align-self: flex-start;
}
</style>
