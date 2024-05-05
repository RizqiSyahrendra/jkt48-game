<script setup lang="ts">
import { useModal } from '@/utils/useModal'
import Button from './Button.vue'

const { isModalVisible, isAnimating, handlePressCancel, handlePressContinue, modalContent } =
  useModal()
</script>

<template>
  <div
    v-if="isModalVisible"
    class="flex flex-col items-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-50 transition-all ease-in-out duration-300"
    :class="{
      'opacity-0': !isAnimating,
      'opacity-100': isAnimating
    }"
  >
    <div
      class="flex flex-col w-[80%] md:w-[40%] min-h-[200px] mt-[30%] md:mt-[10%] p-4 rounded-[10px] bg-primary1 transition-all ease-in-out duration-300"
      :class="{
        'scale-75': !isAnimating,
        'scale-100': isAnimating
      }"
    >
      <div class="justify-center flex-1">
        <div class="text-center">
          {{ modalContent.text ?? '' }}
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <Button
          class="min-w-20"
          size="md"
          @click="handlePressCancel"
          color="secondary"
          :text="modalContent?.cancelButtonText ?? ''"
        />
        <Button
          class="min-w-20"
          size="md"
          @click="handlePressContinue"
          color="primary"
          :text="modalContent?.continueButtonText ?? ''"
        />
      </div>
    </div>
  </div>
</template>
