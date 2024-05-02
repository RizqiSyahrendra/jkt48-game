import { ref } from 'vue'

interface IModalContent {
  text: string
  continueButtonText?: string
  cancelButtonText?: string
  onContinue?: () => void
  onCancel?: () => void
}

const isModalVisible = ref(false)
const isAnimating = ref(false)
const modalContent = ref<IModalContent>({ text: '' })

export function useModal() {
  function showModal(param: IModalContent) {
    modalContent.value = param
    isModalVisible.value = true
    setTimeout(() => {
      isAnimating.value = true
    }, 500)
  }

  function handlePressContinue() {
    modalContent.value?.onContinue?.()
    closeModal()
  }

  function handlePressCancel() {
    modalContent.value?.onCancel?.()
    closeModal()
  }

  function closeModal() {
    isAnimating.value = false
    setTimeout(() => {
      isModalVisible.value = false
      modalContent.value = { text: '' }
    }, 500)
  }

  return {
    isModalVisible,
    isAnimating,
    showModal,
    closeModal,
    handlePressCancel,
    handlePressContinue,
    modalContent
  }
}
