<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layouts/Header.vue'
</script>

<template>
  <div class="w-screen h-screen bg-primary1">
    <Header />
    <RouterView />
  </div>
</template>
