<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<template>
  <div class="admin-layout">
    <!-- Side navigation for admin -->
    <div class="sidebar">
      <ul>
        <li><router-link to="/admin">Dashboard</router-link></li>
        <li><router-link to="/admin/users">User Management</router-link></li>
        <li><router-link to="/admin/settings">Settings</router-link></li>
        <li><button @click="logout" class="logout-btn">Logout</button></li>
      </ul>
    </div>

    <!-- Main content area -->
    <div class="content">
      <!-- Optional header for the admin -->
      <header>
        <h1>Admin Panel</h1>
      </header>

      <!-- Render the page content here -->
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;

  .sidebar {
    width: 250px;
    background-color: #2d3748;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin: 20px 0;

      a {
        color: white;
        text-decoration: none;
        font-size: 18px;

        &:hover {
          text-decoration: underline;
        }
      }
      .logout-btn {
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
      }

      .logout-btn:hover {
        background-color: #d43f3f;
      }
    }
  }

  .content {
    margin-left: 250px;
    padding: 20px;
    width: calc(100% - 250px);

    header {
      background-color: #edf2f7;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
