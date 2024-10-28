<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';

// Define reactive variables for user data
const user = ref<Record<string, any> | undefined | null>(null);

// Function to handle user login
const handleLogin = (userData: Record<string, any>) => {
  user.value = userData;
};

// Function to handle user logout
const handleLogout = () => {
  user.value = null;
};
</script>

<template>
  <NavBar :user="user" @logout="handleLogout" />
  <div class="container">
    <RouterView @login="handleLogin" :user="user" />
  </div>
</template>

<style scoped>
.container {
  /* padding: 20px;
  margin-top:0; */
  min-height: 100vh;
}
</style>