<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Screen from '@/components/layouts/Screen.vue'
import CardMemberImg from '@/components/CardMemberImg.vue'
import Button from '@/components/Button.vue'
import CardStageCheck from '@/components/CardStageCheck.vue'
import { useModal } from '@/utils/useModal'
import { onMounted } from 'vue'
import { useFindMemberGame } from '@/utils/useFindMemberGame'
import members from '@/data/member.json'

const route = useRoute()
const router = useRouter()
const { query } = route
const queryLvl = (query?.lvl ?? '1') as string
const lvl = parseQueryLevel(queryLvl)
const { showModal } = useModal()

const totalStage = 10
const totalMemberInDeck = 16
const { stageScore, currentStage, setupDeck, memberDeck } = useFindMemberGame({
  data: members,
  totalMemberInDeck,
  totalStage
})

onMounted(() => {
  setupDeck()
  // showModal({
  //   text: 'The rules of this game is simple. Try to find the mentioned JKT48 member inside the provided area!',
  //   continueButtonText: 'Start!',
  //   cancelButtonText: 'Back',
  //   onCancel: () => {
  //     router.back()
  //   }
  // })
})

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
      <div class="font-semibold text-xl text-center text-primary4">
        Stage : {{ currentStage }} / {{ totalStage }}
      </div>
      <div class="mt-4 flex flex-wrap justify-center">
        <template v-for="(s, idx) in stageScore">
          <CardStageCheck v-if="s === -1" class="mb-2 mr-1" :key="idx" />
          <CardStageCheck v-if="s === 0" preset="wrong" class="mb-2 mr-1" :key="idx" />
          <CardStageCheck v-if="s === 1" preset="checked" class="mb-2 mr-1" :key="idx" />
        </template>
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
      <CardMemberImg v-for="(s, idx) in memberDeck" :id="s.id" :key="idx" class="mb-2" />
      <div class="w-full mt-4 flex justify-center">
        <Button size="md" color="secondary" text="Skip" class="min-w-[80px]" />
      </div>
    </div>
  </Screen>
</template>
