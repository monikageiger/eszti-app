<script setup lang="ts">
import { ref } from 'vue'

const FORMSPREE_URL = 'https://formspree.io/f/xzdyjold'

const form = ref({ name: '', email: '', message: '', _gotcha: '' })
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')
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

async function submitForm() {
  if (!validate()) return
  submitting.value = true
  submitError.value = ''
  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error('Submission failed')
    submitted.value = true
    form.value = { name: '', email: '', message: '', _gotcha: '' }
    errors.value = {}
  } catch {
    submitError.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="main">
    <div v-if="submitted" class="success">
      <FaIcon icon="circle-check" />
      <h3>Message sent!</h3>
      <p>Thank you for reaching out. I'll get back to you soon.</p>
      <button class="reset-btn" @click="submitted = false">Send another message</button>
    </div>

    <form v-else class="form" @submit.prevent="submitForm" novalidate>
      <h2>Get in Touch</h2>
      <input type="text" name="_gotcha" v-model="form._gotcha" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
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
      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? 'Sending…' : 'Send Message' }}
      </button>
      <span v-if="submitError" class="error">{{ submitError }}</span>
    </form>
  </main>
</template>

<style scoped lang="scss">
@use '../styles/mixins' as *;

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

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
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

  &:hover:not(:disabled) { background: var(--accent-hover); }
  &:active:not(:disabled) { transform: scale(0.98); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
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
