<script setup lang="ts">
import { ref } from 'vue'
import { ColorOptions } from '../../types/ColorOptions'
import { Sound } from '../../types/Sound'
import { SoundInput } from '../../types/SoundInput'

import SoundboardDialogEditForm from './SoundboardDialogEditForm.vue'

const props = defineProps<{
  sound: SoundInput
}>()

const newSound = ref<SoundInput>({ ...props.sound })

const emit = defineEmits<{
  (e: 'updateSound', sound: SoundInput): void
  (e: 'deleteSound', soundId: string): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="flex flex-col p-4 max-w-lg border border-gray-400 rounded">
    <h2 class="mb-4 text-xl">Add sound</h2>
    <SoundboardDialogEditForm
      :sound="sound"
      @change-sound="(updatedSound) => (newSound = updatedSound)"
    ></SoundboardDialogEditForm>
    <button
      class="bg-gray-400 rounded px-4 py-2"
      @click="() => emit('updateSound', newSound)"
    >
      Update Sound
    </button>
    <button
      v-if="props.sound.id"
      class="bg-red-700 text-white rounded px-4 py-2"
      @click="() => emit('deleteSound', props.sound.id!)"
    >
      Delete Sound
    </button>
    <button
      class="bg-gray-700 text-white rounded px-4 py-2"
      @click="() => emit('cancel')"
    >
      Cancel
    </button>
  </div>
</template>
