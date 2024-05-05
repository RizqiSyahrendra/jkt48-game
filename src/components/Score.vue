<script setup lang="ts">
import images from '@/utils/images'
const props = defineProps<{
  value: number
}>()

const { value } = props

function getScoreImages(val: number) {
  if (val >= 90) {
    return images.scoreTop
  } else if (val >= 60) {
    return images.scoreMiddle
  } else {
    return images.scoreBottom
  }
}
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <img :src="getScoreImages(value)" class="w-48 h-44 object-cover rounded-[10px]" />
    <span class="mt-2 font-bold text-primary4 text-2xl">Score : {{ value }}</span>
  </div>
</template>
