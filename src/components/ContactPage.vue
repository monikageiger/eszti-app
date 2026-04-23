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
      <h3>Message sent</h3>
      <p>Thank you. I'll get back to you soon.</p>
      <button class="reset-btn" @click="submitted = false">Send another</button>
    </div>

    <form v-else class="form" @submit.prevent="submitForm" novalidate>
      <h2>Get in touch</h2>
      <input
        type="text"
        name="_gotcha"
        v-model="form._gotcha"
        class="honeypot"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />
      <div class="field">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Your name"
          :class="{ 'input-error': errors.name }"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          :class="{ 'input-error': errors.email }"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>
      <div class="field">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="6"
          placeholder="What's on your mind?"
          :class="{ 'input-error': errors.message }"
        ></textarea>
        <span v-if="errors.message" class="error">{{ errors.message }}</span>
      </div>
      <button type="submit" class="submit-btn" :disabled="submitting">
        <span>{{ submitting ? 'Sending' : 'Send message' }}</span>
        <span class="arr">→</span>
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
  padding: 56px 24px 80px;
  animation: fade 0.5s ease both;
}

.form {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-family: 'Fraunces', serif;
    font-variation-settings: 'SOFT' 50, 'opsz' 144;
    font-weight: 400;
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 12px;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--ink-muted);
  }

  input, textarea {
    @include text-input;
    resize: vertical;
    font-family: 'Fraunces', serif;
    font-size: 18px;
  }
}

.error {
  font-size: 12px;
  color: var(--accent);
  font-family: 'Fraunces', serif;
  font-style: italic;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.submit-btn {
  align-self: flex-start;
  margin-top: 8px;
  padding: 14px 22px;
  background: var(--ink);
  color: var(--bg);
  border: none;
  border-radius: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s ease, gap 0.25s ease;

  .arr { display: inline-block; transition: transform 0.25s ease; }

  &:hover:not(:disabled) {
    background: var(--accent);
    gap: 14px;
    .arr { transform: translateX(4px); }
  }

  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.success {
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  svg {
    font-size: 28px;
    color: var(--accent);
    margin-bottom: 4px;
  }

  h3 {
    font-family: 'Fraunces', serif;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  p {
    font-family: 'Fraunces', serif;
    font-size: 17px;
    color: var(--ink-soft);
  }
}

.reset-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  text-decoration: underline;
  text-underline-offset: 4px;
  align-self: flex-start;
}
</style>
