<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { User } from '@/models/users';

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const editUser = (user: User) => {
  emit('edit', user);
};

const deleteUser = (user: User) => {
  emit('delete', user);
};
</script>

<template>
  <tr>
    <td><img :src="props.user.profilePic" alt="Profile Picture" class="profile-pic"></td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.adminAccess ? 'Yes' : 'No' }}</td>
    <td>
      <button @click="editUser(user)" class="action-button">
        <i class="fas fa-edit"></i>
      </button>
      <button @click="deleteUser(user)" class="action-button">
        <i class="fas fa-trash"></i>
      </button>
    </td>
  </tr>
</template>

<style>
.profile-pic {
  width: 5.5rem;
  height: 3.5rem;
  border-radius: 0%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
  color:black
}
th {
  background-color: #f2f2f2;
}
button.action-button {
  background: none;
  border: .2rem solid black;
  cursor: pointer;
  padding: .5rem;
  margin-right: .5rem;
  border-radius: .5rem;
}
button.action-button:active {
   box-shadow: 0 0 .1rem blue;/* Change border color when clicked */
}
button.action-button i {
  font-size: 1.2rem;
}
</style>