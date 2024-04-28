<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Screen from '@/components/layouts/Screen.vue'
import LevelBox, { type ILevelBoxProps } from '@/components/LevelBox.vue'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'

interface ILevelBoxExtended extends ILevelBoxProps {
  id: number
}

const router = useRouter()
const selectedMode = ref(0)
const isLoading = ref(false)
const isSelectModeVisible = computed(() => !selectedMode.value)

function selectMode(id: number) {
  selectedMode.value = id
}

function cancelSelectMode() {
  selectedMode.value = 0
}

function selectLevel(id: number) {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    router.replace({ name: 'find-member-game', query: { lvl: id } })
  }, 500)
}

const availableModes: ILevelBoxExtended[] = [
  { id: 1, title: 'Find Member' },
  { id: 2, title: '?', desc: '(Coming Soon)', isDisabled: true }
]

const availableLevels: ILevelBoxExtended[] = [
  { id: 1, title: 'Level 1', desc: '6 sec for each stage' },
  { id: 2, title: 'Level 2', desc: '4 sec for each stage' },
  { id: 3, title: 'Level 3', desc: '2 sec for each stage' }
]
</script>

<template>
  <Screen :heading-text="isSelectModeVisible ? 'Select Mode' : 'Select Level'">
    <div v-if="isLoading" class="flex justify-center mt-8">
      <Loader size="lg" />
    </div>

    <div v-if="!isLoading && isSelectModeVisible" class="flex flex-col items-center">
      <template v-for="m in availableModes">
        <LevelBox
          @click="() => selectMode(m.id)"
          :title="m.title"
          :desc="m.desc"
          :is-disabled="m.isDisabled"
          class="mt-8"
        />
      </template>

      <div class="mt-10">
        <Button @click="router.back()" color="secondary" class="px-4" size="lg" text="Back" />
      </div>
    </div>
    <div v-if="!isLoading && !isSelectModeVisible" class="flex flex-col items-center">
      <template v-for="lv in availableLevels">
        <LevelBox
          @click="() => selectLevel(lv.id)"
          :title="lv.title"
          :desc="lv.desc"
          class="mt-8"
        />
      </template>

      <div class="mt-10">
        <Button @click="cancelSelectMode" color="secondary" class="px-4" size="lg" text="Back" />
      </div>
    </div>
  </Screen>
</template>
