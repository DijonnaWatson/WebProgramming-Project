<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import {  defineEmits } from 'vue';

const props = defineProps<{
  user: Record<string, any> | null | undefined;
}>();

const emit = defineEmits(['logout']);

const isOpen = ref(false);

function handleLogout() {
  emit('logout');
}
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
           :class="{ 'is-active': isOpen }" @click="isOpen = !isOpen">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item">Home</RouterLink>
          <RouterLink to="/exerciselog" class="navbar-item">
            <i class="fas fa-running"></i> My Activity
          </RouterLink>

          <RouterLink to="/statistics" class="navbar-item">
            <i class="fas fa-chart-line"></i> Statistics</RouterLink>

          <RouterLink to="/friendsactivity" class="navbar-item">
            <i class="fas fa-users"></i> Friends Activity
          </RouterLink>

           <RouterLink to="/peoplesearch" class="navbar-item">
            <i class="fas fa-search"></i> People Search
          </RouterLink>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Admin
            </a>

            <div class="navbar-dropdown">
              <RouterLink to="/users" class="navbar-item">
                Users
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <RouterLink v-if="!props.user" to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </RouterLink>
              <RouterLink v-if="!user" to="/login" class="button is-light">
                Log in
              </RouterLink>
              <div v-if="props.user" class="user-info">
                <img :src="props.user.profilePic" alt="Profile Picture" class="profile-pic">
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link">
                    <span>{{ props.user.firstName }} {{ props.user.lastName }}</span>
                  </a> 
                  <div class="navbar-dropdown"> 
                      <RouterLink to="/profilemanagement" class="navbar-item">
                      Profile
                    </RouterLink>
                  </div>
                </div>
                <!-- <span>{{ props.user.firstName }} {{ props.user.lastName }}</span> -->
                <button class="button is-light" @click="handleLogout">Log out</button>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" 
               data-social-target="https://bulma.io" target="_blank" 
               href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span> Tweet </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.profile-pic {
  width: 4rem;
  height: 5rem;
  /* border-radius: 50%; */
  object-fit: cover; /* Ensure the image covers the entire area */
}

.bd-tw-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #1DA1F2;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.bd-tw-button:hover {
  background-color: #1A91DA;
  transform: translateY(-0.1rem);
}

.bd-tw-button:active {
  background-color: #1A91DA;
  transform: translateY(0);
}

.tweet-text {
  font-weight: bold;
}

</style>