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
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
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