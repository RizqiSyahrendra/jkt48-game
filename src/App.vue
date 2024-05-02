<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layouts/Header.vue'
import Modal from './components/Modal.vue'
</script>

<template>
  <Header />
  <Modal />
  <RouterView />
</template>
