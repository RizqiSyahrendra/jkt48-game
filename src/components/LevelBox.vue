<script setup lang="ts">
import { ref } from 'vue'

export interface ILevelBoxProps {
  title: string
  desc?: string
  isDisabled?: boolean
}

const props = defineProps<ILevelBoxProps>()

const { title, desc = '', isDisabled = false } = props
const isMouseDown = ref(false)
</script>

<template>
  <div
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
    class="flex p-2 w-[40%] bg-primary2 rounded-[10px] border-2 border-primary3 text-primary4 transition duration-75 ease-in-out"
    :class="{
      'hover:bg-opacity-75 hover:cursor-pointer': !isDisabled,
      'bg-opacity-40': isDisabled,
      'border-opacity-40': isDisabled,
      'text-opacity-40': isDisabled,
      'scale-95': isMouseDown && !isDisabled
    }"
  >
    <div class="flex-1 text-2xl font-semibold items-center">{{ title }}</div>
    <div class="flex flex-[0.5] justify-end text items-center">{{ desc }}</div>
  </div>
</template>
