<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { defineProps } from 'vue';
import { getAll, addActivityLog, removeActivityLog, updateActivityLog, type User, type ActivityLog } from '@/models/users';

const props = defineProps({
  user: {
    type: Object as () => User | null,
    default: null
  }
});

const users = ref<User[]>([]);
const activityLogs = ref<ActivityLog[]>([]);
const newExercise = ref<ActivityLog>({ date: '', activity: '', duration: 0, calories: 0, distance: 0 });
const goal = ref<number | null>(null);

const showAddForm = ref(true);
const showEditForm = ref(false);
const editExerciseForm = ref<Partial<ActivityLog>>({});
let editIndex = ref<number | null>(null);

onMounted(async () => {
  const response = await getAll();
  users.value = response.data;
  const currentUser = users.value.find(user => user.email === props.user?.email);
  if (currentUser) {
    activityLogs.value = currentUser.activityLogs;
  }
});



const dailyTip = ref('Stay hydrated and drink at least 8 glasses of water a day.');
const exerciseTips = ref([
  'Warm up before exercising to prevent injuries.',
  'Maintain proper form to maximize benefits and avoid injuries.',
  'Cool down after exercising to help your muscles recover.',
  'Stay consistent with your workouts for the best results.',
  'Listen to your body and rest when needed.'
]);

// Filter exercises for the logged-in user
const filteredExercises = computed(() => {
  return activityLogs.value;
});

const addExercise = async () => {
  console.log('Adding exercise:', newExercise.value);
  if (newExercise.value.date && newExercise.value.activity && newExercise.value.duration) {
    const currentUser = users.value.find(user => user.email === props.user?.email);
    if (currentUser) {
      console.log('Current user found:', currentUser);
      const response = await addActivityLog(currentUser.id, newExercise.value);
      console.log('API response:', response);
      if (response.isSuccess) {
        activityLogs.value.push({ ...newExercise.value } as ActivityLog);
        newExercise.value = { date: '', activity: '', duration: 0, calories: 0, distance: 0 };
        console.log('Exercise added successfully');
      } else {
        console.error('Error adding exercise:', response.message);
      }
    } else {
      console.error('Current user not found');
    }
  } else {
    console.error('Invalid exercise data:', newExercise.value);
  }
};

const deleteExercise = async (index: number) => {
  console.log('Deleting exercise at index:', index);
  const currentUser = users.value.find(user => user.email === props.user?.email);
  if (currentUser) {
     console.log('Current user found:', currentUser);
    const exercise = activityLogs.value[index];
   console.log('Exercise to delete:', exercise);
    const response = await removeActivityLog(currentUser.id, exercise);
    console.log('API response:', response);
    if (response.isSuccess) {
      activityLogs.value.splice(index, 1);
      console.log('Exercise deleted successfully');
    } else {
      console.error('Error deleting exercise:', response.message);
    }
  }else {
    console.error('Current user not found');
  }
};

const showEditExerciseForm = (index: number) => {
  editExerciseForm.value = { ...activityLogs.value[index] };
  editIndex.value = index;
  showEditForm.value = true;
  showAddForm.value = false;
};

const editExercise = async () => {
   console.log('Editing exercise:', editExerciseForm.value);
  if (editIndex.value !== null) {
    const currentUser = users.value.find(user => user.email === props.user?.email);
    if (currentUser) {
      console.log('Current user found:', currentUser);
      const updatedExercise: ActivityLog = {
        date: editExerciseForm.value.date || '',
        activity: editExerciseForm.value.activity || '',
        duration: editExerciseForm.value.duration || 0,
        calories: editExerciseForm.value.calories || 0,
        distance: editExerciseForm.value.distance || 0,
      };
      console.log('Updated exercise:', updatedExercise);
      const response = await updateActivityLog(currentUser.id, updatedExercise);
      console.log('API response:', response);
      if (response.isSuccess) {
        activityLogs.value[editIndex.value] = updatedExercise;
        editIndex.value = null;
        showEditForm.value = false;
        showAddForm.value = true;
        console.log('Exercise edited successfully');
      } else {
        console.error('Error editing exercise:', response.message);
      }
    } else {
      console.error('Current user not found');
    }
  } else {
    console.error('Invalid edit index:', editIndex.value);
  }
};

const totalDuration = computed(() => {
  return filteredExercises.value.reduce((total, exercise) => total + exercise.duration, 0);
});

const progressBarWidth = computed(() => {
  if (!goal.value) return 0;
  return Math.min((totalDuration.value / goal.value) * 100, 100);
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Convert to UTC
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getDate()).padStart(2, '0');
  const year = utcDate.getFullYear();
  return `${month}-${day}-${year}`;
};
</script>

<template>
  <div class="home">
    <h1>Welcome to the Fitness App Fitness Log Page!</h1>
    <p class="daily-tip">{{ dailyTip }}</p>
    <div class="content">
      <div class="exercise-log">
        <h2>Exercise Log</h2>
        <ul>
          <li v-for="(exercise, index) in filteredExercises" :key="index">
            <span class="date">{{ formatDate(exercise.date) }}</span>
            <span class="activity">{{ exercise.activity }}</span>
            <span class="duration">{{ exercise.duration }} minutes</span>
            <button @click="showEditExerciseForm(index)" class="edit-button">Edit</button>
            <button @click="deleteExercise(index)" class="delete-button">Delete</button>
          </li>
        </ul>
        <div class="goal-input">
          <label for="goal">Set your goal (minutes):</label>
          <input v-model="goal" type="number" id="goal" placeholder="Enter goal time" />
        </div>
        <div class="goal-status" v-if="goal">
          Goal: {{ goal }} minutes
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
          </div>
          <div v-if="totalDuration >= goal" class="goal-achieved">Congratulations! You've reached your goal!</div>
          <div v-else class="goal-pending">Keep going! You need {{ goal - totalDuration }} more minutes to reach your goal.</div>
        </div>
        
        <!-- Add Exercise Form -->
        <form v-if="showAddForm" @submit.prevent="addExercise">
          <input v-model="newExercise.date" type="date" required />
          <input v-model="newExercise.activity" type="text" placeholder="Activity" required />
          <input v-model="newExercise.duration" type="number" placeholder="Duration (minutes)" required />
          <input v-model="newExercise.calories" type="number" placeholder="Calories" required />
          <input v-model="newExercise.distance" type="number" placeholder="Distance (km)" required />
          <button type="submit">Add Exercise</button>
        </form>
        
        <!-- Edit Exercise Form -->
        <form v-if="showEditForm" @submit.prevent="editExercise">
          <input v-model="editExerciseForm.date" type="date" required />
          <input v-model="editExerciseForm.activity" type="text" placeholder="Activity" required />
          <input v-model="editExerciseForm.duration" type="number" placeholder="Duration (minutes)" required />
          <input v-model="editExerciseForm.calories" type="number" placeholder="Calories" required />
          <input v-model="editExerciseForm.distance" type="number" placeholder="Distance (km)" required />
          <button type="submit">Save Changes</button>
        </form>
      </div>

      <div class="tips-box">
        <h2>Exercise Tips</h2>
        <ul>
          <li v-for="(tip, index) in exerciseTips" :key="index">
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.daily-tip {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #007BFF;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.exercise-log {
  flex: 2;
  padding: 2rem;
  background-color: #36d3fa;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.exercise-log h2 {
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  font-size: 2.4rem;
}

.exercise-log ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.exercise-log li {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
}

.exercise-log li .date {
  font-weight: bold;
  color: #555;
}

.exercise-log li .activity {
  color: #007BFF;
}

.exercise-log li .duration {
  color: #28a745;
}

.goal-input {
  text-align: center;
  margin-bottom: 2rem;
}

.goal-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.goal-input input {
  padding: 1rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
}

.goal-status {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
}

.progress-bar-container {
  width: 100%;
  max-width: 30rem;
  height: 2rem;
  background-color: #ddd;
  border-radius: 1rem;
  margin: 1rem auto;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s;
}

.goal-achieved {
  color: #28a745;
  font-weight: bold;
}

.goal-pending {
  color: #ff6347;
  font-weight: bold;
  font-size: 1.5rem;
}

.exercise-log form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exercise-log form input,
.exercise-log form button {
  width: 100%;
  max-width: 30rem;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
}

.exercise-log form input:focus,
.exercise-log form button:focus {
  outline: none;
  border-color: #007BFF;
}

.exercise-log form button {
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
 
}

.exercise-log form button:hover {
  background-color: #0056b3;
}

.tips-box {
  flex: 1;
  padding: 2rem;
  background-color: #36d3fa;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height:fit-content;
}

.tips-box h2 {
  margin-bottom: 1rem;
  color: black;
  font-size: 2rem;
}

.tips-box ul {
  list-style-type: none;
  padding: 0;
}

.tips-box li {
  background-color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  color: black;
}

.edit-button {
  background-color: #33d1f8;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.delete-button {
  background-color: #f34758;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  
}
</style>