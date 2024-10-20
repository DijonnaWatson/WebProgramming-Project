<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/models/users';
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});

const users = ref([]);

onMounted(() => {
  const { data } = getAllUsers();
  users.value = data;
});
</script>

<template>
   <div>
    <h1>Admin - User List</h1>
    <ul v-if="props.user?.adminAccess">
      <li v-for="user in users" :key="user.email">
        <img :src="user.profilePic" alt="Profile Picture" class="profile-pic">
        {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
      </li>
    </ul>
    <p v-else>You do not have access to view this page.</p>
  </div>
</template>

<style>

</style>