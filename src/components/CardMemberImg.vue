<script setup lang="ts">
import { toRef } from 'vue'
import images from '@/utils/images'

const props = defineProps<{
  id: number
  isRotated: boolean
}>()

const { id } = props
const isRotated = toRef(props, 'isRotated')
const imgSrc = `${images.directory.member}/${id}.jpg`
</script>

<template>
  <div
    class="w-[64px] h-[84px] shadow-md rounded-[10px] hover:cursor-pointer transition-transform duration-200 ease-in-out"
    :class="{
      'scale-x-[-1]': isRotated,
      'hover:scale-105': !isRotated
    }"
  >
    <img :src="imgSrc" class="object-cover w-[64px] h-[84px] rounded-[10px]" />
  </div>
</template>
