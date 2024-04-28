<script setup lang="ts">
import { ref } from 'vue'

const isTop = ref(false)
</script>

<template>
  <header class="fixed top-0 left-0 flex w-screen h-screen bg-primary4 justify-center">
    <span
      class="text-3xl font-bold text-primary1 transition duration-500 ease-in-out mt-3"
      :class="{
        'translate-y-0': isTop,
        'translate-y-32': !isTop
      }"
    >
      JKT48 ゲーム
    </span>
  </header>
</template>
