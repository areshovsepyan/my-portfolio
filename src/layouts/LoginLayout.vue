<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

const router = useRouter();
const toast = useToast();

const loading = ref(false);

const username = ref('');
const password = ref('');

const usernameInput = ref(null);
const passwordInput = ref(null);

const errors = ref({
  name: '',
  email: '',
  message: '',
});

const showErrorToast = () => {
  toast.error(errors.value.message);
};

const validateInputs = () => {
  const isUsernameValid = usernameInput.value?.validate();
  const isPasswordValid = passwordInput.value?.validate();

  return isUsernameValid && isPasswordValid;
};

const resetErrors = () => {
  Object.keys(errors.value).forEach((key) => (errors.value[key] = ''));
};

const login = async () => {
  try {
    if (!validateInputs() || loading.value) return;

    loading.value = true;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (res.ok) {
      const data = await res.json();

      resetErrors();

      localStorage.setItem('token', data.token);

      router.push('/admin');
    } else {
      const error = await res.json();
      errors.value.message = error?.error;
      showErrorToast();
    }
  } catch (error) {
    console.log('ERROR IN LOGIN VIEW:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-image">
      <img src="/images/art.jpeg" alt="Login art" loading="lazy" />
    </div>

    <div class="login-form">
      <div class="form-content">
        <h2>Welcome Back</h2>

        <form @submit.prevent="login">
          <BaseInput
            v-model="username"
            name="username"
            label="Username"
            required
            @update:error="errors.username = $event"
            ref="usernameInput"
          />
          <BaseInput
            v-model="password"
            name="password"
            label="Password"
            type="password"
            required
            @update:error="errors.password = $event"
            ref="passwordInput"
          />

          <BaseButton type="submit" :isLoading="loading">Sign In</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 11rem);

  @media (min-width: 1024px) {
    height: calc(100dvh - 4rem);
    flex-direction: row;
  }

  .login-form {
    width: 100%;
    height: 75%;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 1024px) {
      width: 50%;
      height: 100%;
    }

    .form-content {
      width: 100%;
      max-width: 400px;

      h2 {
        color: var(--vt-c-white);
        text-align: center;
        font-size: 36px;
        margin-bottom: 3rem;

        @media (min-width: 1024px) {
          font-size: 48px;
          margin-bottom: 4rem;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        width: 100%;

        button {
          margin-inline: auto;
        }
      }
    }
  }

  .login-image {
    width: 100%;
    height: 25%;

    @media (min-width: 1024px) {
      width: 50%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 24px;
    }
  }
}
</style>
