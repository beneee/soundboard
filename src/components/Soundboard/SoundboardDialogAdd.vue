<script setup lang="ts">
import { ref } from 'vue'
import { ColorOptions } from '../../types/ColorOptions'
import { SoundInput } from '../../types/SoundInput'

import SoundboardDialogEditForm from './SoundboardDialogEditForm.vue'

const emit = defineEmits<{
  (e: 'addSound', sound: SoundInput): void
  (e: 'cancel'): void
}>()

const emptySound: SoundInput = {
  dataUrl: '',
  title: '',
  color: ColorOptions.GREEN_TO_BLUE,
}

const sound = ref<SoundInput>({
  ...emptySound,
})

const addSound = function () {
  emit('addSound', { ...sound.value })
  sound.value = { ...emptySound }
}
</script>

<template>
  <div class="flex flex-col p-4 max-w-lg border border-gray-400 rounded">
    <h2 class="mb-4 text-xl">Add sound</h2>
    <SoundboardDialogEditForm
      :sound="sound"
      @change-sound="(newSound) => (sound = newSound)"
    ></SoundboardDialogEditForm>
    <button class="bg-gray-400 rounded px-4 py-2" @click="addSound">
      Add Sound
    </button>
    <button
      class="bg-gray-700 text-white rounded px-4 py-2"
      @click="() => emit('cancel')"
    >
      Cancel
    </button>
  </div>
</template>
