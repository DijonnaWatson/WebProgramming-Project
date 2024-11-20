<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAll, create, update,remove, type User } from '@/models/users';

const props = defineProps<{
  user: User | null;
}>();

const users = ref<User[]>([]);
const showAddForm = ref(false);
const showEditForm = ref(false);
const newUser = ref<Partial<User>>({});
const editUserForm = ref<Partial<User>>({});

onMounted(() => {
  getAll().then(response => {
    users.value = response.data;
  });
});

const handleAddUser = async () => {
if (newUser.value.firstName && newUser.value.lastName && newUser.value.email) {
    await create(newUser.value as User);
    const response = await getAll();
    users.value = response.data;
    showAddForm.value = false;
    newUser.value = {};
  }
};

const handleEditUser = async () => {
  if (editUserForm.value.id) {
    await update(editUserForm.value as User);
    const response = await getAll();
    users.value = response.data;
    showEditForm.value = false;
    editUserForm.value = {};
  }
};

const handleDeleteUser = async (id: number) => {
  await remove(id);
  const response = await getAll();
  users.value = response.data;
};

const showAddUserForm = () => {
  showAddForm.value = true;
  showEditForm.value = false;
};

const showEditUserForm = (user: User) => {
  showEditForm.value = true;
  showAddForm.value = false;
  editUserForm.value = { ...user };
};
</script>


<template>
  <div>
    <h1>Admin Page - Users</h1>
    <button v-if="props.user?.adminAccess" class="add-user-button" @click="showAddUserForm">Add User</button>
    <table v-if="props.user?.adminAccess">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Profile Pic</th>
          <th>Admin Access</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td><img :src="user.profilePic" alt="Profile Picture" class="profile-pic"></td>
          <td>{{ user.adminAccess }}</td>
          <td>
            <button class="action-button" @click="showEditUserForm(user)">Edit</button>
            <button class="action-button" @click="handleDeleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add User Form -->
   <div v-if="props.user?.adminAccess"> 
    <div v-if="showAddForm">
      <h2>Add User</h2>
      <form @submit.prevent="handleAddUser">
        <input v-model="newUser.firstName" placeholder="First Name" required />
        <input v-model="newUser.lastName" placeholder="Last Name" required />
        <input v-model="newUser.email" placeholder="Email" required />
        <input v-model="newUser.profilePic" placeholder="Profile Pic URL" />
        <label>
          Admin Access:
          <input type="checkbox" v-model="newUser.adminAccess" />
        </label>
        <button type="submit">Add</button>
      </form>
     </div>
   

    <!-- Edit User Form -->
    <div v-if="showEditForm">
      <h2>Edit User</h2>
      <form @submit.prevent="handleEditUser">
        <input v-model="editUserForm.firstName" placeholder="First Name" required />
        <input v-model="editUserForm.lastName" placeholder="Last Name" required />
        <input v-model="editUserForm.email" placeholder="Email" required />
        <input v-model="editUserForm.profilePic" placeholder="Profile Pic URL" />
        <label>
          Admin Access:
          <input type="checkbox" v-model="editUserForm.adminAccess" />
        </label>
        <button type="submit">Save</button>
      </form>
     </div>
    </div>
    <p v-else>You do not have access to view this page. Login as Angela to get access</p>
  </div>
</template>

<style scoped>
.add-user-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0;
  margin-top: 1.5rem;
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
  color: black;
}

th {
  background-color: #f2f2f2;
}

button.action-button {
  background: none;
  border: 0.2rem solid black;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
}

button.action-button:active {
  box-shadow: 0 0 0.1rem blue; /* Change border color when clicked */
}

button.action-button i {
  font-size: 1.2rem;
}
</style>