<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ user.email }}</div>
    </td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ user.listings.length }}</div>
    </td>

    <td>
      <div class="flex justify-center">
        <label class="inline-flex cursor-pointer">
          <span class="sr-only">Select</span>
          <input :id="user.id" class="form-checkbox cursor-pointer" type="checkbox" @change="totpToggle()" :checked="user.totpRequired" />
        </label>
      </div>
    </td>

    <td>
      <div v-if="user.totpEnabled" class="flex justify-center" aria-hidden="true">
        <div class="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500"></div>
      </div>

      <div v-if="!user.totpEnabled" class="flex justify-center" aria-hidden="true">
        <div class="relative inline-flex rounded-full w-1.5 h-1.5 bg-red-500"></div>
      </div>
    </td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-1 text-center">
        <button class="text-red-500 hover:text-red-600 rounded-full rounded-full cursor-pointer" @click="deleteUser()">
          <span class="sr-only">Delete</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
            <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
          </svg>
        </button>

        <button
          class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full cursor-pointer"
          @click="listingsToggle()"
          :aria-expanded="props.listingToggle"
        >
          <svg
            class="w-8 h-8 shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            :class="{ 'rotate-180': props.listingToggle }"
            viewBox="0 0 32 32"
          >
            <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
          </svg>
        </button>
      </div>
    </td>
  </tr>

  <tr v-show="listingToggle" class="bg-linear-to-r from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04] text-grey-100 dark:text-grey-800">
    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-semibold text-left">Title</div>
    </th>

    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-semibold text-center">Price</div>
    </th>

    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></th>
    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></th>

    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-semibold text-center">Approve</div>
    </th>
  </tr>

  <tr
    v-show="listingToggle"
    class="bg-linear-to-r from-green-500/[0.12] dark:from-green-500/[0.24] to-green-500/[0.04] text-xs text-grey-100 dark:text-grey-800"
    v-for="listing in user.listings"
    :key="listing.id"
  >
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ listing.title }}</div>
    </td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ listing.price }}</div>
    </td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></td>

    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex justify-center">
        <label class="inline-flex cursor-pointer">
          <span class="sr-only">Select</span>
          <input :id="listing.id" class="form-checkbox cursor-pointer" type="checkbox" @change="listingApprovigToggle(listing)" :checked="listing.approved" />
        </label>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
const props = defineProps<{ user: any; value: any; selected?: any[]; listingToggle: boolean }>();
const emit = defineEmits(['delete-user', 'listings-toggle-handle', 'approve-listing', 'totp-toggle']);

function deleteUser() {
  emit('delete-user', props.user);
}

function listingsToggle() {
  emit('listings-toggle-handle', props.user);
}

function listingApprovigToggle(listing: any) {
  emit('approve-listing', { listingId: listing.id, approved: !listing.approved });
}

function totpToggle() {
  emit('totp-toggle', props.user.totpRequired);
}
</script>
