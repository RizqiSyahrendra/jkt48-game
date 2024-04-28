<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  text: string
}>()

const { size = 'lg', color = 'primary', text } = props
const isMouseDown = ref(false)

const sizeObj: Record<
  typeof size,
  {
    px: string
    py: string
    textSize: string
  }
> = {
  sm: {
    px: 'px-2',
    py: 'py-1',
    textSize: 'text-xs'
  },
  md: {
    px: 'px-2',
    py: 'py-1',
    textSize: 'text-sm'
  },
  lg: {
    px: 'px-2',
    py: 'py-2',
    textSize: 'text-lg'
  }
}

const colorObj: Record<typeof color, string> = {
  primary: 'bg-primary4',
  secondary: 'bg-primary3'
}
</script>

<template>
  <button
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
    class="rounded-[10px] text-primary1 font-semibold hover:bg-opacity-90 transition duration-75 ease-in-out"
    :class="[
      colorObj[color],
      sizeObj[size].px,
      sizeObj[size].py,
      sizeObj[size].textSize,
      { 'scale-95': isMouseDown }
    ]"
  >
    {{ text }}
  </button>
</template>
