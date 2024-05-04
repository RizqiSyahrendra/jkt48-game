import { ref } from 'vue'

interface IMember {
  id: number
  name: string
}

interface UseFindMemberGameProps {
  data: IMember[]
  totalMemberInDeck: number
  totalStage: number
}

export function useFindMemberGame(param: UseFindMemberGameProps) {
  const stageScore = ref(initDefaultStageScore(param.totalStage))
  const currentStage = ref(1)
  const isDeckLoading = ref(false)
  const memberDeck = ref<typeof param.data>([])

  function nextStage() {
    stageScore.value[currentStage.value - 1] = 1

    if (currentStage.value === param.totalStage) return
    currentStage.value++
  }

  function setupDeck() {
    isDeckLoading.value = true

    let availableMemberLength = param.data.length
    const tempMemberDeck: typeof param.data = []
    for (let i = 0; i < param.totalMemberInDeck; i++) {
      const idx = getRandomInt(availableMemberLength)
      const selectedMember = param.data.splice(idx, 1)
      if (selectedMember.length > 0) {
        tempMemberDeck.push(selectedMember[0])
        availableMemberLength--
      }
    }

    memberDeck.value = tempMemberDeck
    isDeckLoading.value = false
  }

  return {
    stageScore,
    nextStage,
    currentStage,
    memberDeck,
    isDeckLoading,
    setupDeck
  }
}

function initDefaultStageScore(totalStage: number) {
  const stages: number[] = []
  for (let i = 0; i < totalStage; i++) {
    stages[i] = -1
  }

  return stages
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
