<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUsers, type User } from '@/models/users';
import { defineProps } from 'vue';
import UsersCard from '@/components/UsersCard.vue';


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

const addUser = (user: User) => {
  console.log('Add user button clicked', user);//temporary code for button to get rid of warning, does display that editing user works in the inspect console
  // Implement edit user functionality
};

const editUser = () => {
  console.log('Editing user:');//temporary code for button to get rid of warning, does display that editing user works in the inspect console
  // Implement edit user functionality
};

const deleteUser = (user: User) => {
  console.log('Deleting user:', user);//temporary code for button to get rid of warning, does display that deleting user works in the inspect console
  // Implement delete user functionality
};
</script>
<template>
  <div>
    <h1>Admin - User List</h1>
    <div v-if="props.user?.adminAccess"> 
      <button @click="addUser(user)" class="add-user-button"> 
        <i class="fas fa-plus"></i> Add User
      </button>
      <table>
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
    </div>
    <p v-else>You do not have access to view this page. Login as Angela to get access</p>
  </div>
</template>

<style>
.add-user-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin : 0;
  margin-top:1.5rem;
}

.add-user-button:hover {
  background-color: #0056b3;
}
.profile-pic {
  width: 5.5rem;
  height: 3.5rem;
  border-radius: 0%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0;
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