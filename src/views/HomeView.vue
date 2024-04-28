<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import Button from '@/components/Button.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)
const loadingTime = 800

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, loadingTime)
})

function onClickStart() {
  isLoading.value = true
  setTimeout(() => {
    router.push('mode')
  }, loadingTime)
}
</script>

<template>
  <div v-if="isLoading" class="fixed bottom-10 h-64 w-screen flex justify-center">
    <Loader size="lg" color="secondary" />
  </div>

  <main
    class="fixed bottom-0 h-64 w-screen flex justify-center bg-transparent transition duration-500 ease-in-out"
    :class="{
      'translate-y-64': isLoading,
      'translate-y-0': !isLoading
    }"
  >
    <div class="w-[80%] h-full bg-primary1 rounded-t-[50px] flex flex-col items-center">
      <div class="text-primary4 text-2xl font-semibold mt-10">緒にゲームしましょう</div>
      <div class="mt-6">
        <Button @click="onClickStart" size="lg" class="min-w-48" text="Let's Get Started" />
      </div>
    </div>
  </main>
</template>
