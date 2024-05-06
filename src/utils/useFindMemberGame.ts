import { computed, ref } from 'vue'
import { useCountDown } from './useCountDown'

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
  timeForEachStageInSecond: number
}

const loadingSpeedMs = 250
const deckRotationSpeedMs = 200

export function useFindMemberGame(param: UseFindMemberGameProps) {
  const stageScore = ref(initDefaultStageScore(param.totalStage))
  const currentStage = ref(1)
  const isDeckLoading = ref(false)
  const isDeckRotated = ref(true)
  const memberDeck = ref<typeof param.data>([])
  const memberQuestioned = ref<IMember | null>(null)
  const { countDownText, setCountDownInSeconds, clearCountDown } = useCountDown()

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
    clearCountDown()
    stageScore.value[currentStage.value - 1] = memberQuestioned.value?.id === id ? 1 : 0
    if (currentStage.value === param.totalStage) {
      setLoading(loadingSpeedMs)
      return
    }

    isDeckRotated.value = true
    setTimeout(() => {
      currentStage.value++
      setupDeck()
    }, deckRotationSpeedMs - 50)
  }

  function skipStage() {
    clearCountDown()
    stageScore.value[currentStage.value - 1] = 0
    if (currentStage.value === param.totalStage) {
      setLoading(loadingSpeedMs)
      return
    }

    isDeckRotated.value = true
    setTimeout(() => {
      currentStage.value++
      setupDeck()
    }, deckRotationSpeedMs - 50)
  }

  async function setupDeck() {
    //set loading at first stage
    if (currentStage.value === 1) {
      setLoading(loadingSpeedMs)
    }

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

    setupTimer()
    setTimeout(() => {
      isDeckRotated.value = false
    }, deckRotationSpeedMs)
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

  function setupTimer() {
    setCountDownInSeconds(param.timeForEachStageInSecond + 1, () => skipStage())
  }

  return {
    stageScore,
    skipStage,
    submitStageAnswer,
    currentStage,
    memberDeck,
    isDeckLoading,
    isDeckRotated,
    setupDeck,
    memberQuestioned,
    gameSummary,
    stageCountDown: countDownText
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
