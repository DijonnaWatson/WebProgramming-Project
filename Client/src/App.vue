<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';

// Define reactive variables for user data
const user = ref(null);

// Function to handle user login
const handleLogin = (userData) => {
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
    <RouterView @login="handleLogin" />
  </div>
</template>

<style scoped>
body {
  background-color: aliceblue;
}

.container {
  background-color: white;
  /* box-shadow: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8)); */
  min-height: 100vh;
  /* padding: 2rem; */
}
</style>