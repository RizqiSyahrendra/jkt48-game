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
  const memberQuestioned = ref<IMember | null>(null)

  function submitStageAnswer(id: number) {
    stageScore.value[currentStage.value - 1] = memberQuestioned.value?.id === id ? 1 : 0

    if (currentStage.value === param.totalStage) return
    currentStage.value++
    setupDeck()
  }

  function skipStage() {
    stageScore.value[currentStage.value - 1] = 0

    if (currentStage.value === param.totalStage) return
    currentStage.value++
    setupDeck()
  }

  async function setupDeck() {
    // set loading on
    isDeckLoading.value = true

    await new Promise((resolve) => {
      // randomize member and put in deck
      const availableMember = [...param.data]
      let availableMemberLength = availableMember.length
      const tempMemberDeck: typeof availableMember = []
      for (let i = 0; i < param.totalMemberInDeck; i++) {
        const idx = getRandomInt(availableMemberLength)
        const selectedMember = availableMember.splice(idx, 1)
        if (selectedMember.length > 0) {
          tempMemberDeck.push(selectedMember[0])
          availableMemberLength--
        }
      }
      memberDeck.value = tempMemberDeck

      // randomize answer
      const answerIdx = getRandomInt(param.totalMemberInDeck)
      if (!!tempMemberDeck[answerIdx]) {
        memberQuestioned.value = tempMemberDeck[answerIdx]
      }
      setTimeout(() => {
        resolve(true)
      }, 250)
    })

    // set loading off
    isDeckLoading.value = false
  }

  return {
    stageScore,
    skipStage,
    submitStageAnswer,
    currentStage,
    memberDeck,
    isDeckLoading,
    setupDeck,
    memberQuestioned
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
