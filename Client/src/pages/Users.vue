<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/models/users';
import { defineProps } from 'vue';
import UsersCard from '@/components/UsersCard.vue';
import type { User } from '@/models/users';

const props = defineProps({
  user: {
    type: Object as () => User,
    default: null
  }
});
const users = ref<User[]>([]);

onMounted(() => {
  const { data } = getAllUsers();
  users.value = data;
});

const editUser = (user: User) => {
  console.log('Editing user:', user);//temporary code for button to get rid of warning
  // Implement edit user functionality
};

const deleteUser = (user: User) => {
  console.log('Deleting user:', user);//temporary code for button to get rid of warning
  // Implement delete user functionality
};
</script>
<template>
  <div>
    <h1>Admin - User List</h1>
    <table v-if="props.user?.adminAccess">
      <thead>
        <tr>
          <th>Profile Picture</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Admin Access</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <UsersCard
          v-for="user in users"
          :key="user.email"
          :user="user"
          @edit="editUser"
          @delete="deleteUser"
        />
      </tbody>
    </table>
    <p v-else>You do not have access to view this page.</p>
  </div>
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