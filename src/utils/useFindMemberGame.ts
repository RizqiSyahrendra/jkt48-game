import { computed, ref } from 'vue'

interface IMember {
  id: number
  name: string
}

interface IGameSummary {
  isFinished: boolean
  totalScore: number
}

interface UseFindMemberGameProps {
  data: IMember[]
  totalMemberInDeck: number
  totalStage: number
  scoreForEachStage: number
}

export function useFindMemberGame(param: UseFindMemberGameProps) {
  const stageScore = ref(initDefaultStageScore(param.totalStage))
  const currentStage = ref(1)
  const isDeckLoading = ref(false)
  const memberDeck = ref<typeof param.data>([])
  const memberQuestioned = ref<IMember | null>(null)

  const gameSummary = computed<IGameSummary>(() => {
    const summary: IGameSummary = {
      isFinished: false,
      totalScore: 0
    }

    summary.isFinished = stageScore.value[stageScore.value.length - 1] !== -1
    if (summary.isFinished) {
      for (const s of stageScore.value) {
        if (s === 1) {
          summary.totalScore += param.scoreForEachStage
        }
      }
    }

    return summary
  })

  function submitStageAnswer(id: number) {
    setLoading(250)
    stageScore.value[currentStage.value - 1] = memberQuestioned.value?.id === id ? 1 : 0

    if (currentStage.value === param.totalStage) return
    currentStage.value++
    setupDeck()
  }

  function skipStage() {
    setLoading(250)
    stageScore.value[currentStage.value - 1] = 0

    if (currentStage.value === param.totalStage) return
    currentStage.value++
    setupDeck()
  }

  async function setupDeck() {
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
  }

  async function setLoading(ms: number) {
    isDeckLoading.value = true
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
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
    memberQuestioned,
    gameSummary
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
