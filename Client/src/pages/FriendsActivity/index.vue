<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type User, getAllUsers } from '@/models/users';
import ActivityLog from '@/components/ActivityLog.vue';


const users = ref<User[]>([]);

onMounted(() => {
  const { data } = getAllUsers();
  users.value = data;
});
</script>

<template>
  <div>
    <h1 class="friendsactivity">The Friends Activity Page</h1>
    <p>Here is a list of your friends' activities</p>
    <div class="shelf">
      <ActivityLog v-for="user in users" :key="user.email" :user="user" :activityLogs="user.activityLogs" />
    </div>
  </div>
</template>

<style scoped>
.shelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.activity-log {
  width: 300px;
}
</style>