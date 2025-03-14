<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '@/components/UI/BaseButton.vue';

const router = useRouter();

const routes = [
  { label: 'Dashboard', path: '/admin', icon: 'dash', alt: 'Dash Icon' },
  { label: 'Experience', path: '/admin/experience', icon: 'briefcase', alt: 'Briefcase Icon' },
  { label: 'Education', path: '/admin/education', icon: 'hat', alt: 'Hat Icon' },
  { label: 'Inbox', path: '/admin/inbox', icon: 'envelope', alt: 'Envelope Icon' },
  { label: 'Banned IPs', path: '/admin/banned-ips', icon: 'banned-ips', alt: 'Banned IPs Icon' },
  { label: 'Logs', path: '/admin/logs', icon: 'logs', alt: 'Logs Icon' },
];

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<template>
  <div class="admin-layout">
    <div class="sidebar border-gradient-dark">
      <ul>
        <li v-for="{ label, path, icon, alt } in routes" :key="label">
          <RouterLink :to="path">
            <img :src="`/icons/admin/icon_${icon}.svg`" :alt="alt" />
          </RouterLink>
        </li>
        <li>
          <BaseButton @click="logout" btn_class="btn-signout">
            <img src="/icons/admin/icon_signout.svg" alt="Signout icon" />
          </BaseButton>
        </li>
      </ul>
    </div>

    <div class="content card-admin border-gradient-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: calc(100vh - 4rem);
  gap: 1rem;

  .sidebar {
    display: flex;
    flex-direction: column;
    width: 65px;
    height: 500px;
    padding: 5px;
    box-shadow:
      0px 1px 2px rgba(0, 0, 0, 0.04),
      0px 3px 8px rgba(0, 0, 0, 0.12),
      0px 8px 16px rgba(0, 0, 0, 0.6);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%),
      rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);

    ul {
      display: flex;
      flex-direction: column;
      height: 100%;

      li {
        &:last-of-type {
          margin-top: auto;
        }

        .router-link-active {
          background-color: rgba(255, 255, 255, 0.15);

          img {
            width: 32px;
            height: 32px;
            filter: opacity(1);
          }
          &:hover {
            img {
              scale: 1;
            }
          }
        }
        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 55px;
          width: 55px;
          border-radius: 50%;

          img {
            width: 24px;
            height: 24px;
            filter: opacity(0.5);
          }

          &:hover {
            img {
              scale: 1.3;
            }
          }
        }
      }
    }
  }

  .content {
    padding: 20px;
    width: 100%;
  }
}
</style>
