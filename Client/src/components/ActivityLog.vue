<script setup lang="ts">
import { defineProps } from 'vue';

interface ActivityLog {
  date: string;
  activity: string;
  duration: number;
}

interface User {
  firstName: string;
  lastName: string;
  activityLogs: ActivityLog[];
}

const props = defineProps<{
  user: User;
  activityLogs: ActivityLog[];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};
</script>
<template>
  <div class="activity-log">
    <h2>{{ props.user.firstName }} {{ props.user.lastName }}</h2>
    <ul>
      <li v-for="(log, index) in props.activityLogs" :key="index">
        <span class="date">{{ formatDate(log.date) }}</span>
        <span class="activity">{{ log.activity }}</span>
        <span class="duration">{{ log.duration }} minutes</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.activity-log {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  width: 300px;
}
.activity-log h2 {
  margin-bottom: 1rem;
}

.activity-log ul {
  list-style-type: none;
  padding: 0;
}

.activity-log li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.activity-log .date {
  font-weight: bold;
}

.activity-log .activity {
  color: #007BFF;
}

.activity-log .duration {
  color: #28a745;
}
</style>