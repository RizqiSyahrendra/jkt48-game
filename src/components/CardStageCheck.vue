<script setup lang="ts">
import Images from '@/utils/images'

const props = defineProps<{
  preset?: 'wrong' | 'checked'
}>()
const { preset } = props
</script>

<template>
  <div
    class="w-8 h-8 rounded-[7px] border-primary4"
    :class="{
      'border-2': preset === undefined
    }"
  >
    <img v-if="preset === 'wrong'" :src="Images.xsign" class="w-8 h-8" />
    <img v-if="preset === 'checked'" :src="Images.checksign" class="w-8 h-8" />
  </div>
</template>
