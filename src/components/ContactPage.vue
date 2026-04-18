<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const submitted = ref(false)
const errors = ref<Record<string, string>>({})

function validate(): boolean {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Required'
  if (!form.value.email.trim()) {
    errors.value.email = 'Required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email'
  }
  if (!form.value.message.trim()) errors.value.message = 'Required'
  return Object.keys(errors.value).length === 0
}

function submitForm() {
  if (validate()) {
    submitted.value = true
    form.value = { name: '', email: '', message: '' }
    errors.value = {}
  }
}
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <RouterLink to="/" class="back-btn">
          <FaIcon icon="chevron-left" />
          Back
        </RouterLink>
        <span class="page-title">Contact</span>
      </div>
    </header>

    <main class="main">
      <div v-if="submitted" class="success">
        <FaIcon icon="circle-check" />
        <h3>Message sent!</h3>
        <p>Thank you for reaching out. I'll get back to you soon.</p>
        <button class="reset-btn" @click="submitted = false">Send another message</button>
      </div>

      <form v-else class="form" @submit.prevent="submitForm" novalidate>
        <h2>Get in Touch</h2>
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" type="text" placeholder="Your name" :class="{ 'input-error': errors.name }" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" :class="{ 'input-error': errors.email }" />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" rows="6" placeholder="What's on your mind?" :class="{ 'input-error': errors.message }"></textarea>
          <span v-if="errors.message" class="error">{{ errors.message }}</span>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
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
}

.header-inner {
  @include header-inner;
}

.back-btn {
  @include back-btn;
}

.page-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}

.main {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
}

.form {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--text);
    margin-bottom: 8px;

    @include sm { font-size: 34px; }
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }

  input, textarea {
    @include text-input;
    resize: vertical;
  }
}

.error {
  font-size: 12px;
  color: #ef4444;
}

.submit-btn {
  padding: 11px 24px;
  background: var(--accent);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  font-family: inherit;
  transition: background 0.15s, transform 0.1s;

  &:hover { background: var(--accent-hover); }
  &:active { transform: scale(0.98); }
}

.success {
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  svg {
    font-size: 36px;
    color: #22c55e;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
  }

  p {
    font-size: 15px;
    color: var(--text-muted);
  }
}

.reset-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  text-decoration: underline;
  align-self: flex-start;
  font-family: inherit;

  &:hover { color: var(--accent-hover); }
}
</style>
