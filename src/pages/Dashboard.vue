<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" :user="user" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
          <!-- Dashboard actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
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
<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
import { http } from '../lib/http';
import { setAccessToken } from '../utils/auth';

export default {
  name: 'Dashboard',
  components: { Sidebar, Header },
  setup() {
    const router = useRouter();
    const sidebarOpen = ref(false);
    const user = ref(null);

    onMounted(async () => {
      try {
        const me = await http.get('/me');

        if (!me.id || !me.email) {
          throw new Error('401 unauthorized');
        }

        user.value = me;
      } catch (err) {
        setAccessToken(null);
        router.push('/signin');
      }
    });

    return { sidebarOpen, user };
  },
};
</script>
