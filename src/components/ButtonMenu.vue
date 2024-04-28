<script setup lang="ts">
defineProps<{
  title: string
  additionalClass?: string
}>()
</script>

<template>
  <button class="text-white rounded-full bg-red-500 hover:bg-opacity-90 p-2 w-full">
    {{ title }}
  </button>
</template>
