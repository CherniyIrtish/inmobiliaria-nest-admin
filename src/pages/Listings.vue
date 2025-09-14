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
              <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Listing</h1>
            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">ACTIONS</div>
          </div>

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-6">CONTENT</div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
import { getCurrentUser } from '../lib/auth-state';
import { ref } from 'vue';

const sidebarOpen = ref(false);
const currentUser = getCurrentUser();
</script>
