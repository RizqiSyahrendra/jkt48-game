<script setup lang="ts">
import images from '@/utils/images'
const props = defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const { size = 'sm' } = props

const sizeObj: Record<typeof size, { w: string; h: string }> = {
  sm: {
    w: 'w-10',
    h: 'h-10'
  },
  md: {
    w: 'w-16',
    h: 'h-16'
  },
  lg: {
    w: 'w-20',
    h: 'h-20'
  },
  xl: {
    w: 'w-28',
    h: 'h-28'
  }
}
</script>

<template>
  <img :src="images.loader" class="animate-spin" :class="[sizeObj[size].w, sizeObj[size].w]" />
</template>
