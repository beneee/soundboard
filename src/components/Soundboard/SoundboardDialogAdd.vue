<script setup lang="ts">
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import { ColorOptions } from '../../types/ColorOptions'
import { SoundInput } from '../../types/SoundInput'

import SoundboardDialogEditForm from './SoundboardDialogEditForm.vue'

const emit = defineEmits<{
  (e: 'addSound', sound: SoundInput): void
  (e: 'cancel'): void
}>()

defineProps<{
  show?: boolean
}>()

const emptySound: SoundInput = {
  dataUrl: '',
  title: '',
  color: ColorOptions.GREEN_TO_BLUE,
}

const sound = ref<SoundInput>({
  ...emptySound,
})

const addSound = () => {
  emit('addSound', { ...sound.value })
  sound.value = { ...emptySound }
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <!-- <div class="fixed inset-0 flex items-center justify-center"></div> -->
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="cancel">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-900 opacity-50" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-3xl truncate font-medium leading-6 text-gray-900"
              >
                Add Sound
              </DialogTitle>
              <div class="mt-4">
                <SoundboardDialogEditForm
                  :sound="sound"
                  @change-sound="(newSound) => (sound = newSound)"
                ></SoundboardDialogEditForm>

                <div class="flex items-center justify-end">
                  <button
                    class="rounded-2xl px-4 py-2 text-white font-bold bg-blue-500 bg-gradient-to-br from-blue-500 to-green-500 shadow hover:shadow-sm"
                    @click="addSound"
                  >
                    Add Sound
                  </button>
                  <button
                    class="ml-4 bg-gray-300 bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl px-4 py-2 shadow hover:shadow-sm"
                    @click="cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- <div class="flex flex-col p-4 max-w-lg border border-gray-400 rounded">
    <h2 class="mb-4 text-xl">Add sound</h2>
    
  </div> -->
</template>
