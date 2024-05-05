<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  headingText?: string
}>()

const { headingText } = toRefs(props)
</script>

<template>
  <main class="px-10 py-[100px]">
    <div
      v-if="!!headingText"
      class="flex justify-center font-bold text-2xl md:text-3xl text-primary4"
    >
      {{ headingText }}
    </div>
    <div class="mt-5">
      <slot></slot>
    </div>
  </main>
</template>
