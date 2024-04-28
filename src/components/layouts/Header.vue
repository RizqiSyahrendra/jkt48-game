<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isTop = ref(false)

watch(route, (newRoute) => {
  if (newRoute.path !== '/') {
    isTop.value = true
  } else {
    isTop.value = false
  }
})
</script>

<template>
  <header
    class="fixed top-0 left-0 flex w-screen bg-primary4 justify-center shadow-md transition-all duration-500 ease-in-out"
    :class="{
      'h-[65px]': isTop,
      'h-screen': !isTop
    }"
  >
    <span
      class="text-4xl font-bold text-primary1 transition duration-500 ease-in-out mt-3"
      :class="{
        'translate-y-0': isTop,
        'translate-y-32': !isTop,
        'scale-75': isTop
      }"
    >
      JKT48 ゲーム
    </span>
  </header>
</template>
