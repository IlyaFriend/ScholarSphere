<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-xl font-semibold leading-7 text-gray-900 dark:text-gray-50">
        {{ title }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        {{ subtitle }}
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div v-for="(value, key) in item" :key="key" :class="dlClass" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
            {{ key }}
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0">
            {{ value }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  item: {
    type: Object,
    default: () => {}
  },
  dlClass: {
    type: String,
    default: ''
  }
})
</script>
