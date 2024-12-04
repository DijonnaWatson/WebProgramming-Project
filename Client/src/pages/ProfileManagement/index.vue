<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getById, update, type User } from '@/models/users';
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object as () => User | null,
    default: null
  }
});

const router = useRouter();
const user = ref<User | null>(props.user);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchUserData = async () => {
  if (!user.value) {
    error.value = 'User is not logged in';
    loading.value = false;
    return;
  }

  try {
    const response = await getById(user.value.id);
    user.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch user data';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserData);

const updateProfile = async () => {
  if (user.value) {
    try {
      const response = await update(user.value);
      if (response.isSuccess) {
        alert('Profile updated successfully. Reload and sign back in to see the changes.');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      alert('An error occurred while updating the profile');
    }
  }
};
</script>

<template>
  <div>
    <h1 class="peoplesearch">The Profile Management Page</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="user">
      <form @submit.prevent="updateProfile">
        <div>
          <label for="firstName">First Name:</label>
          <input v-model="user.firstName" id="firstName" type="text" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input v-model="user.lastName" id="lastName" type="text" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="user.email" id="email" type="email" required />
        </div>
        <div>
          <label for="profilePic">Profile Picture:</label>
          <input v-model="user.profilePic" id="profilePic" type="text" />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    <div v-else>
      <p>You need to log in to manage your profile.</p>
      <button @click="router.push('/login')">Go to Login</button>
    </div>
  </div>
</template>

<style scoped>
.peoplesearch {
  text-align: center;
  margin-bottom: 20px;
}

form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>