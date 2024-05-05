<script setup lang="ts">
import images from '@/utils/images'

const props = defineProps<{
  id: number
}>()

const { id } = props
const imgSrc = `${images.directory.member}/${id}.jpg`
</script>

<template>
  <div
    class="w-[64px] h-[84px] shadow-md rounded-[10px] hover:cursor-pointer hover:scale-105 transition duration-100 ease-in-out"
  >
    <img :src="imgSrc" class="object-cover w-[64px] h-[84px] rounded-[10px]" />
  </div>
</template>
