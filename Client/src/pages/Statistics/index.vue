<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getAll } from '@/models/users';
import type { User, ActivityLog } from '@/models/users';

const props = defineProps({
  user: {
    type: Object as () => User,
    default: null
  }
});

const users = ref<User[]>([]);
const activityLogs = ref<ActivityLog[]>([]);

onMounted(() => {
  getAll().then(response => {
    users.value = response.data;
    const currentUser = users.value.find(user => user.email === props.user?.email);
    if (currentUser) {
      activityLogs.value = currentUser.activityLogs;
    }
    console.log("Loaded activity logs:", activityLogs.value);
  });
  const currentUser = users.value.find(user => user.email === props.user?.email);
  if (currentUser) {
    activityLogs.value = currentUser.activityLogs;
  }
  console.log("Loaded activity logs:", activityLogs.value);
});

const today = new Date();
const startOfDay = new Date(today.toISOString().split("T")[0] + "T00:00:00Z");

// Calculate the start of the week in UTC for consistency across timezones
const startOfWeek = new Date(today.toISOString().split("T")[0] + "T00:00:00Z");
startOfWeek.setUTCDate(today.getUTCDate() - today.getUTCDay());

const filterLogs = (logs: ActivityLog[], startDate: Date) => {
  return logs.filter(log => new Date(Date.parse(log.date)) >= startDate);
};

const calculateMetrics = (logs: ActivityLog[]) => {
  const totalDistance = logs.reduce((sum, log) => sum + (log.distance || 0), 0);
  const totalDurationMinutes = logs.reduce((sum, log) => sum + log.duration, 0);
  const totalDurationHours = totalDurationMinutes / 60;
  const avgPace = totalDurationHours ? (totalDistance / totalDurationHours) : 0;
  const totalCalories = logs.reduce((sum, log) => sum + (log.calories || 0), 0);

  return {
    totalDistance,
    totalDuration: totalDurationMinutes,
    avgPace,
    totalCalories
  };
};

const metricsToday = computed(() => calculateMetrics(filterLogs(activityLogs.value, startOfDay)));
const metricsThisWeek = computed(() => calculateMetrics(filterLogs(activityLogs.value, startOfWeek)));
const metricsAllTime = computed(() => calculateMetrics(activityLogs.value));
</script>

<template>
  <div class="statistics-page">
    <h1 class="title">User Activity History</h1>
    <div class="activity-section">
      <h2>Today</h2>
      <div class="metrics-box">
        <div class="metrics-row">
          <span>Total Distance: {{ metricsToday.totalDistance.toFixed(2) }} mi</span>
          <span>Total Duration: {{ metricsToday.totalDuration }} minutes</span>
        </div>
        <div class="metrics-row">
          <span>Average Pace: {{ metricsToday.avgPace.toFixed(1) }} mph</span>
          <span>Total Calories: {{ metricsToday.totalCalories }} kcal</span>
        </div>
      </div>
    </div>
    <div class="activity-section">
      <h2>This Week</h2>
      <div class="metrics-box">
        <div class="metrics-row">
          <span>Total Distance: {{ metricsThisWeek.totalDistance.toFixed(2) }} mi</span>
          <span>Total Duration: {{ metricsThisWeek.totalDuration }} minutes</span>
        </div>
        <div class="metrics-row">
          <span>Average Pace: {{ metricsThisWeek.avgPace.toFixed(1) }} mph</span>
          <span>Total Calories: {{ metricsThisWeek.totalCalories }} kcal</span>
        </div>
      </div>
    </div>
    <div class="activity-section">
      <h2>All Time</h2>
      <div class="metrics-box">
        <div class="metrics-row">
          <span>Total Distance: {{ metricsAllTime.totalDistance.toFixed(2) }} mi</span>
          <span>Total Duration: {{ metricsAllTime.totalDuration }} minutes</span>
        </div>
        <div class="metrics-row">
          <span>Average Pace: {{ metricsAllTime.avgPace.toFixed(1) }} mph</span>
          <span>Total Calories: {{ metricsAllTime.totalCalories }} kcal</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.activity-section {
  margin-bottom: 2rem;
}

.activity-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.metrics-box {
  background-color: #36d3fa; /* Same color as used in the exercise log page */
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 80%; /* Adjust the width to make the boxes less wide */
  max-width: 600px; /* Ensure the boxes don't get too wide on larger screens */
  margin-left: auto;
  margin-right: auto;
}

.metrics-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.metrics-row span {
  flex: 1;
  text-align: center;
  font-weight: bold;
}
</style>
