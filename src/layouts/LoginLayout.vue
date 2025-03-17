<script setup>
import { ref } from 'vue';
import { Motion } from '@oku-ui/motion';
import { api } from '../../utils/axios';
import { useRouter } from 'vue-router';
import toast from '../../utils/toast';
import { useResize } from '@/composables/useResize';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';

const { isOnMobile } = useResize();

const router = useRouter();

const isLoading = ref(false);

const mousePosition = ref({ x: 0, y: 0 });

const username = ref('');
const password = ref('');
const rememberMe = ref(false);

const usernameInput = ref(null);
const passwordInput = ref(null);

const errors = ref({
  name: '',
  email: '',
});

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
    if (!validateInputs() || isLoading.value) return;

    isLoading.value = true;

    const { data } = await api.post('/login', {
      username: username.value,
      password: password.value,
      remember: rememberMe.value,
    });

    resetErrors();

    localStorage.setItem('token', data.token);

    router.push('/admin');
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleMouseMove = (event) => {
  mousePosition.value = { x: event.clientX, y: event.clientY };
};
</script>

<template>
  <div class="login-container" @mousemove="handleMouseMove">
    <Motion
      class="login-image"
      as="div"
      :initial="isOnMobile ? { top: -100, opacity: 0 } : { left: -300, opacity: 0 }"
      :animate="isOnMobile ? { top: 0, opacity: 1 } : { left: 0, opacity: 1 }"
      :transition="{ duration: 0.8 }"
    >
      <Motion
        as="img"
        :animate="!isOnMobile && { x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }"
        :transition="{ duration: 0.5 }"
        src="/images/art-knight.jpg"
        alt="Login art - night in the flowers."
        loading="lazy"
      />
    </Motion>

    <Motion
      class="login-form"
      as="div"
      :initial="{ scale: 0.5, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.8 }"
    >
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
          <BaseCheckbox v-model="rememberMe" label="Remember me" id="rememberMe" />

          <BaseButton type="submit" :isLoading="isLoading">Sign In</BaseButton>
        </form>
      </div>
    </Motion>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  // height: calc(100dvh - 11rem);

  @media (min-width: 1024px) {
    height: calc(100dvh - 4rem);
    flex-direction: row;
    gap: 0;
  }

  .input-group:last-of-type {
    margin-left: 4px;
  }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

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
    height: 25dvh;
    position: relative;

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

  /* 🎭 Cubist Shapes */
  .shape {
    position: absolute;
    opacity: 0.3;
    filter: blur(5px);
  }

  .red {
    width: 150px;
    height: 150px;
    background: #780c09;
    rotate: 20deg;
    top: 10%;
    left: 15%;
  }

  .blue {
    width: 120px;
    height: 120px;
    background: #009d91;
    rotate: -15deg;
    top: 60%;
    right: 20%;
  }

  .yellow {
    width: 80px;
    height: 80px;
    background: #db8700;
    rotate: 30deg;
    bottom: 20%;
    left: 40%;
  }
}
</style>
