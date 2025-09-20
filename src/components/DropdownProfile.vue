<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group cursor-pointer"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <div class="flex items-center truncate">
        <span class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">{{ currentUser?.email }}</span>
        <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <ul ref="dropdown" @focusin="dropdownOpen = true" @focusout="dropdownOpen = false">
          <li>
            <button
              @click="signOut"
              type="button"
              class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3 cursor-pointer"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { http } from '../lib/http';
import { clearAuth } from '../lib/auth-state';

const props = defineProps({
  align: { type: String, default: 'right' },
  currentUser: { type: Object, default: null },
});

const { align, currentUser } = toRefs(props);

const dropdownOpen = ref(false);
const trigger = ref(null);
const dropdown = ref(null);
const router = useRouter();

function onClickOutside(e) {
  if (!dropdownOpen.value) return;

  const t = trigger.value;
  const d = dropdown.value;

  if ((t && t.contains(e.target)) || (d && d.contains(e.target))) return;

  dropdownOpen.value = false;
}

function onKeydown(e) {
  if (dropdownOpen.value && e.key === 'Escape') dropdownOpen.value = false;
}

onMounted(() => {
  document.addEventListener('click', onClickOutside);
  document.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
  document.removeEventListener('keydown', onKeydown);
});

async function signOut() {
  try {
    await http.post('/signout');
  } catch {
  } finally {
    clearAuth();
    router.push('/signin');
  }
}
</script>
