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
import Loader from '@/components/Loader.vue'
import Score from '@/components/Score.vue'

const route = useRoute()
const router = useRouter()
const { query } = route
const queryLvl = (query?.lvl ?? '1') as string
const lvl = parseQueryLevel(queryLvl)
const { showModal } = useModal()

const totalStage = 10
const scoreForEachStage = 10
const totalMemberInDeck = 16
const timeForEachStageInSecond = getTimeForEachLevel(lvl)
const {
  stageScore,
  currentStage,
  setupDeck,
  memberDeck,
  memberQuestioned,
  isDeckLoading,
  skipStage,
  submitStageAnswer,
  gameSummary,
  stageCountDown
} = useFindMemberGame({
  data: members,
  totalMemberInDeck,
  totalStage,
  scoreForEachStage,
  timeForEachStageInSecond
})

onMounted(() => {
  showModal({
    text: 'The rules of this game is simple. Try to find the mentioned JKT48 member inside the provided area!',
    continueButtonText: 'Start!',
    cancelButtonText: 'Back',
    onCancel: () => {
      router.back()
    },
    onContinue: () => {
      setupDeck()
    }
  })
})

function parseQueryLevel(paramQueryLvl: string) {
  try {
    return parseInt(paramQueryLvl)
  } catch (error) {
    return 1
  }
}

function getTimeForEachLevel(level: number): number {
  switch (level) {
    case 1:
      return 9

    case 2:
      return 6

    default:
      return 3
  }
}

function goBack() {
  router.back()
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
    <div
      v-if="!gameSummary.isFinished && !!memberQuestioned?.name"
      class="flex flex-col items-center font-semibold"
    >
      <span class="text-primary3 text-2xl">Find :</span>
      <span class="text-primary4 text-2xl">{{ memberQuestioned.name }}</span>
    </div>
    <div
      class="flex flex-wrap space-x-2 justify-center w-[50%] rounded-[10px] p-2 mt-4 bg-primary2 mx-auto"
    >
      <div v-if="isDeckLoading" class="w-full mt-4 flex justify-center">
        <Loader size="md" />
      </div>

      <template
        v-if="!gameSummary.isFinished && !isDeckLoading"
        v-for="m in memberDeck"
        :key="m.id"
      >
        <CardMemberImg @click="() => submitStageAnswer(m.id)" :id="m.id" class="mb-2" />
      </template>

      <div
        v-if="!gameSummary.isFinished && !isDeckLoading && !!memberDeck?.[0]"
        class="w-full mt-4 flex justify-center"
      >
        <Button @click="skipStage" size="md" color="secondary" text="Skip" class="min-w-[80px]" />
      </div>

      <div v-if="!isDeckLoading && gameSummary.isFinished" class="mt-4">
        <Score :value="gameSummary.totalScore" />
        <div v-if="!isDeckLoading" class="w-full mt-4 flex justify-center">
          <Button
            @click="goBack"
            size="md"
            color="secondary"
            text="Back To Home"
            class="min-w-[80px]"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!!stageCountDown && stageCountDown !== '00:00'"
      class="flex justify-center items-center w-[80px] h-[30px] bg-primary2 text-primary4 font-semibold rounded-full mx-auto mt-2"
    >
      {{ stageCountDown }}
    </div>
  </Screen>
</template>
