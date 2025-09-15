<template>
  <div class="px-5 py-4 mb-6 rounded-lg border border-gray-200 dark:border-gray-700/60">
    <button class="flex items-center justify-between w-full group mb-1 cursor-pointer" @click.prevent="emit('form-toggle-handle', formToggle)" :aria-expanded="formToggle">
      <div class="text-sm text-gray-800 dark:text-gray-100 font-medium">{{ title }}</div>
      <svg
        class="w-8 h-8 shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-3"
        :class="{ 'rotate-180': formToggle }"
        viewBox="0 0 32 32"
      >
        <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
      </svg>
    </button>
    <div class="text-sm" v-show="formToggle">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ title: { type: String, required: true }, formToggle: { type: Boolean, required: true } });
const emit = defineEmits(['form-toggle-handle']);
</script>
