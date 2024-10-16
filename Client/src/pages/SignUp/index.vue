<script setup lang="ts">
import { ref } from 'vue';

// Define reactive variables for form data
const name = ref('');
const email = ref('');
const password = ref('');

// Define reactive variables for sign-in form data
const signInEmail = ref('');
const signInPassword = ref('');

// Handle form submission for profile creation
const createProfile = () => {
  // Perform form validation and submission logic here
  console.log('Profile Created:', { name: name.value, email: email.value, password: password.value });
  // Reset form fields
  name.value = '';
  email.value = '';
  password.value = '';
};

// Handle form submission for sign-in
const signIn = () => {
  // Perform form validation and submission logic here
  console.log('Signed In:', { email: signInEmail.value, password: signInPassword.value });
  // Reset form fields
  signInEmail.value = '';
  signInPassword.value = '';
};
</script>

<template>
  <main>
    <h1 class="app-title">Welcome to my Fitness App!</h1>

    <div class="forms-container">
      <section class="profile-creation">
        <h3>Are you a new User?</h3>
        <h2>Create Profile</h2>
        <form @submit.prevent="createProfile">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="name" type="text" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required />
          </div>
          <button type="submit">Create Profile</button>
        </form>
      </section>

      <section class="sign-in">
        <h3>Welcome Back!</h3>
        <h2>Login</h2>
        <form @submit.prevent="signIn">
          <div class="form-group">
            <label for="signInEmail">Email:</label>
            <input v-model="signInEmail" type="email" id="signInEmail" required />
          </div>
          <div class="form-group">
            <label for="signInPassword">Password:</label>
            <input v-model="signInPassword" type="password" id="signInPassword" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  text-align: center;
 /* background: linear-gradient(to right, #f8f9fa, #e9ecef);*/
  min-height: 100vh;
}

.app-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.forms-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.sign-in, .profile-creation {
  background: #36d3fa;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  max-width: 500px;
  flex: 1;
}

.sign-in h2, .profile-creation h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 2rem;
}

.sign-in h3, .profile-creation h3 {
  margin-bottom: 1rem;
  color: #555;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #007BFF;
  outline: none;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #218838;
  transform: translateY(-0.1rem);
}

button:active {
  background-color: #1e7e34;
  transform: translateY(0);
}
</style>