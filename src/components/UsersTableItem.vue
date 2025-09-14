<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ user.email }}</div>
    </td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ user.listings.length }}</div>
    </td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-1">
        <button class="text-red-500 hover:text-red-600 rounded-full cursor-pointer" @click="deleteUser()">
          <span class="sr-only">Delete</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
            <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
defineOptions({ name: 'UsersTableItem' });

const props = defineProps<{ user: any; value: any; selected?: any[] }>();

const emit = defineEmits<{ (e: 'delete-user', value: any[]): void }>();

function deleteUser() {
  emit('delete-user', props.user);
}
</script>
