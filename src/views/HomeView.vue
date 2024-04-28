<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { onMounted, ref } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div v-if="isLoading" class="fixed bottom-10 h-64 w-screen flex justify-center">
    <Loader size="lg" />
  </div>
  <div
    class="fixed bottom-0 h-64 w-screen flex justify-center bg-transparent transition duration-500 ease-in-out"
    :class="{
      'translate-y-64': isLoading,
      'translate-y-0': !isLoading
    }"
  >
    <div class="w-[80%] h-full bg-primary1 rounded-t-[50px] flex justify-center">
      <div class="text-primary4 text-2xl font-semibold mt-10">緒にゲームしましょう</div>
    </div>
  </div>
</template>
