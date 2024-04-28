<script setup lang="ts">
import { useRouter } from 'vue-router'
import Screen from '@/components/layouts/Screen.vue'
import LevelBox from '@/components/LevelBox.vue'
import Button from '@/components/Button.vue'

const router = useRouter()
</script>

<template>
  <Screen heading-text="Select Mode">
    <div class="flex flex-col items-center">
      <LevelBox @click="console.log('helo')" title="Find Member" class="mt-8" />
      <LevelBox title="?" desc="(Coming Soon)" :is-disabled="true" class="mt-8" />

      <div class="mt-10">
        <Button @click="router.back()" color="secondary" class="px-4" size="lg" text="Back" />
      </div>
    </div>
  </Screen>
</template>
