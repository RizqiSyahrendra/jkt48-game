<script setup lang="ts">
import Images from '@/utils/images'

const props = defineProps<{
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const { size = 'sm', color = 'primary' } = props

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

const colorObj: Record<typeof color, string> = {
  primary: 'stroke-primary4',
  secondary: 'stroke-primary1'
}
</script>

<template>
  <Images.loader
    class="animate-spin"
    :class="[sizeObj[size].w, sizeObj[size].w, colorObj[color]]"
  />
</template>
