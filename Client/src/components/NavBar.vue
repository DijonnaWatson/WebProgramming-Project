<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
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
          <RouterLink to="/products" class="navbar-item">Shop</RouterLink>
          <RouterLink to="/exerciselog" class="navbar-item">
            <i class="fas fa-running"></i>My Activity</RouterLink>

           <RouterLink to="/friendsactivity" class="navbar-item">
            <i class="fas fa-users"></i> Friends Activity</RouterLink>

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
              <RouterLink to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </RouterLink>
              <RouterLink to="/login" class="button is-light">
                Log in
              </RouterLink>
              <div class="navbar-item">
                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" 
                data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span><span> Tweet </span></a>
              </div>
            </div>
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

</style>