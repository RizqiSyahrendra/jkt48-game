<script setup lang="ts">
import { useRoute } from 'vue-router'
import Screen from '@/components/layouts/Screen.vue'
import CardMemberImg from '@/components/CardMemberImg.vue'
import Button from '@/components/Button.vue'
import CardStageCheck from '@/components/CardStageCheck.vue'

const route = useRoute()
const { query } = route
const queryLvl = (query?.lvl ?? '1') as string
const lvl = parseQueryLevel(queryLvl)

function parseQueryLevel(paramQueryLvl: string) {
  try {
    return parseInt(paramQueryLvl)
  } catch (error) {
    return 1
  }
}
</script>

<template>
  <Screen>
    <!-- Stage board -->
    <div class="fixed left-[30px] w-[150px] h-[400px] p-2 bg-primary2 rounded-[10px]">
      <div class="font-semibold text-xl text-center text-primary4">Stage : 1</div>
      <div class="mt-4 flex flex-wrap justify-center">
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck preset="checked" class="mb-2 mr-1" />
        <CardStageCheck preset="wrong" class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
        <CardStageCheck class="mb-2 mr-1" />
      </div>
    </div>

    <!-- Game area -->
    <div class="flex flex-col items-center font-semibold">
      <span class="text-primary3 text-2xl">Find :</span>
      <span class="text-primary4 text-2xl">Gita Sekar Andarini</span>
    </div>
    <div
      class="flex flex-wrap space-x-2 justify-center w-[50%] rounded-[10px] p-2 mt-4 bg-primary2 mx-auto"
    >
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <CardMemberImg class="mb-2" />
      <div class="w-full mt-4 flex justify-center">
        <Button size="md" color="secondary" text="Skip" class="min-w-[80px]" />
      </div>
    </div>
  </Screen>
</template>
