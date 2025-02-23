<script setup>
import { ref } from 'vue';
import BaseInput from '../components/UI/BaseInput.vue';
import BaseButton from '../components/UI/BaseButton.vue';
import { useResize } from '/composables/useResize';

const { isOnMobile } = useResize();

const formResetTrigger = ref(0);
const formSubmitted = ref(false);
const loading = ref(false);
const form = ref({
  name: '',
  email: '',
  message: '',
});
const errors = ref({
  name: '',
  email: '',
  message: '',
});

const nameInput = ref(null);
const emailInput = ref(null);
const messageInput = ref(null);

const reset = (array) => {
  Object.keys(array.value).forEach((key) => (array.value[key] = ''));
  formResetTrigger.value++;
};
const validateForm = () => {
  const isNameValid = nameInput.value?.validate();
  const isEmailValid = emailInput.value?.validate();
  const isMessageValid = messageInput.value?.validate();

  return isNameValid && isEmailValid && isMessageValid;
};

const submitForm = async () => {
  try {
    if (!validateForm() || loading.value) return;

    loading.value = true;

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    if (response.status === 200) {
      reset(form);
      reset(errors);

      formSubmitted.value = true;
    }
  } catch (error) {
    console.log('Email sending failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="contact-section">
    <p :class="['section-greeting', { 'scaled-down': formSubmitted }]">
      &lt; This is where you can <strong>reach out to me</strong> <br v-if="isOnMobile" />
      — whether <br v-if="!isOnMobile" />
      you have a project, a question, <br v-if="isOnMobile" />
      or just want to <strong> say hello.</strong> /&gt;
    </p>

    <Transition name="fade" mode="out-in">
      <form v-if="!formSubmitted" @submit.prevent="submitForm">
        <BaseInput
          v-model="form.name"
          name="name"
          label="Your Name"
          required
          :resetTrigger="formResetTrigger"
          @update:error="errors.name = $event"
          ref="nameInput"
        />

        <BaseInput
          v-model="form.email"
          name="email"
          type="email"
          label="Email Address"
          required
          :resetTrigger="formResetTrigger"
          @update:error="errors.email = $event"
          ref="emailInput"
        />

        <BaseInput
          v-model="form.message"
          name="message"
          textarea
          label="Your Message"
          required
          :resetTrigger="formResetTrigger"
          @update:error="errors.message = $event"
          ref="messageInput"
        />

        <BaseButton :isLoading="loading" type="submit">Submit Message</BaseButton>
      </form>
      <div v-else class="form-submitted">
        <p>Thank you for reaching out!</p>
        <p>I've received your message and will get back to you soon.</p>
        <p>Want to send another one?</p>

        <BaseButton @click="formSubmitted = !formSubmitted">Send Another Message</BaseButton>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  .section-greeting {
    @media (min-width: 1024px) {
      margin-bottom: 4rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }

  button {
    margin-inline: auto;
  }
}
</style>
