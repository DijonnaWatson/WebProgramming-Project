<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/models/users';
import type { User, ActivityLog } from '@/models/users';

const users = ref<User[]>([]);

onMounted(() => {
  const { data } = getAllUsers();
  users.value = data;
});
</script>

<template>
  <div class="friends-activity-page">
    <h1 class="title">The Friends Activity Page</h1>
    <!-- <p class="description">Here is a list of your friends' activities</p> -->
    <div class="activity-container">
      <div v-for="user in users" :key="user.email" class="activity-log">
        <img :src="user.profilePic" alt="Profile Picture" class="profile-pic">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <ul>
          <li v-for="(log, index) in user.activityLogs" :key="index">
            <span class="date">{{ new Date(log.date).toLocaleDateString() }}</span>
            <span class="activity">{{ log.activity }}</span>
            <span class="duration">{{ log.duration }} minutes</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-pic {
  width: 5.5rem;
  height: 3.5rem;
  border-radius: 0%;
}
.friends-activity-page {
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
}

.activity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.activity-log {
  width: 300px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.activity-log h2 {
  margin-bottom: 1rem;
  color: #333;
}

.activity-log ul {
  list-style-type: none;
  padding: 0;
}

.activity-log li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.activity-log li:last-child {
  border-bottom: none;
}

.activity-log .date {
  font-weight: bold;
  color: #555;
}

.activity-log .activity {
  color: #007BFF;
}

.activity-log .duration {
  color: #28a745;
}
</style>