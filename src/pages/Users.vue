<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" :currentUser="currentUser" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" :currentUser="currentUser" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
          <!-- Dashboard actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Users</h1>
            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">ACTIONS</div>
          </div>

          <!-- Cards -->
          <div class="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative">
            <div>
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-gray-300">
                  <!-- Table header -->
                  <thead
                    class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60"
                  >
                    <tr>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Email</div>
                      </th>

                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold">Listings</div>
                      </th>

                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                    <UsersTableItem v-for="user in users" :key="user.id" :user="user" :value="user.id" @deleteUser="deleteUser($event)" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
import { http } from '../lib/http';
import { getCurrentUser } from '../lib/auth-state';
import UsersTableItem from '../components/UsersTableItem.vue';

const sidebarOpen = ref(false);
const currentUser = getCurrentUser();
const users = ref([]);

onMounted(async () => {
  await getUsers();
});

async function getUsers() {
  try {
    users.value = await http.get('/users');
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser(user) {
  try {
    await http.delete(`/users/${user.id}`);
    await getUsers();
  } catch (err) {
    console.error(err);
  }
}
</script>
