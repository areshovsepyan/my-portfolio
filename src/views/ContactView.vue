<script setup>
import { ref } from 'vue';
import BaseInput from '../components/UI/BaseInput.vue';
import { useResize } from '/composables/useResize';

const { isOnMobile } = useResize();

const name = ref('');
const email = ref('');
const message = ref('');
const errors = ref({
  name: '',
  email: '',
  message: '',
});

const nameInput = ref(null);
const emailInput = ref(null);
const messageInput = ref(null);

const submitForm = () => {
  const isNameValid = nameInput.value.validate();
  const isEmailValid = emailInput.value.validate();
  const isMessageValid = messageInput.value.validate();

  if (isNameValid && isEmailValid && isMessageValid) {
    console.log('Form submitted:', {
      name: name.value,
      email: email.value,
      message: message.value,
    });
  } else {
    console.log('Form has errors');
  }
};
</script>

<template>
  <section class="contact-section">
    <p class="section-message">
      &lt; This is where you can <strong>reach out to me</strong> <br v-if="isOnMobile" />
      — whether <br v-if="!isOnMobile" />
      you have a project, a question, <br v-if="isOnMobile" />
      or just want to <strong> say hello.</strong> /&gt;
    </p>
    <form @submit.prevent="submitForm">
      <BaseInput
        v-model="name"
        name="name"
        label="Your Name"
        required
        @update:error="errors.name = $event"
        ref="nameInput"
      />

      <BaseInput
        v-model="email"
        name="email"
        type="email"
        label="Email Address"
        required
        @update:error="errors.email = $event"
        ref="emailInput"
      />

      <BaseInput
        v-model="message"
        name="message"
        textarea
        label="Your Message"
        required
        @update:error="errors.message = $event"
        ref="messageInput"
      />

      <button type="submit">Submit Message</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }

  form {
    button {
      margin-inline: auto;
    }
  }
}
</style>
