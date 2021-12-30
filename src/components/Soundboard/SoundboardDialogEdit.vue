<script setup lang="ts">
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import { SoundInput } from '../../types/SoundInput'

import SoundboardDialogEditForm from './SoundboardDialogEditForm.vue'

const props = defineProps<{
  show?: boolean
  sound: SoundInput
}>()

const newSound = ref<SoundInput>({ ...props.sound })

const emit = defineEmits<{
  (e: 'updateSound', sound: SoundInput): void
  (e: 'deleteSound', soundId: string): void
  (e: 'cancel'): void
}>()

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="cancel">
      <div class="fixed inset-0 z-40 overflow-y-auto">
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
                class="text-lg font-medium leading-6 text-gray-900 flex items-center"
              >
                <div class="flex-grow text-3xl truncate">
                  Edit {{ newSound.title || 'Sound' }}
                </div>
                <div class="flex-grow-0">
                  <button
                    class="w-10 h-10 bg-red-600 rounded-full flex justify-center items-center flex-grow-0 bg-gradient-to-br from-red-500 to-red-700 shadow hover:shadow-sm"
                    @click="() => emit('deleteSound', props.sound.id!)"
                  >
                    <img
                      class="rounded-full h-6 w-6"
                      src="../../assets/delete_outline_white_24dp.svg"
                      alt="Remove Sound File"
                    />
                  </button>
                </div>
              </DialogTitle>
              <div class="mt-4">
                <SoundboardDialogEditForm
                  :sound="newSound"
                  @change-sound="(updatedSound) => (newSound = updatedSound)"
                ></SoundboardDialogEditForm>

                <div class="flex items-center justify-end">
                  <button
                    class="rounded-2xl px-4 py-2 text-white font-bold bg-blue-500 bg-gradient-to-br from-blue-500 to-green-500 shadow hover:shadow-sm"
                    @click="() => emit('updateSound', newSound)"
                  >
                    Save
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
</template>
