<script setup lang="ts">
import { ref } from 'vue'
import { Sound } from '../../types/Sound'

const props = defineProps<{
  sound: Sound
}>()

const emit = defineEmits<{
  (e: 'editSound', sound: Sound): void
}>()

const isImageVisible = ref(true)

const isPlaying = ref(false)

const edit = () => {
  emit('editSound', { ...props.sound })
}

const audioElement: HTMLAudioElement = new Audio()
audioElement.onplay = () => {
  isPlaying.value = true
}
audioElement.onended = () => {
  isPlaying.value = false
}

const play = () => {
  audioElement.src = props.sound.dataUrl
  audioElement.play()
}
</script>

<template>
  <div
    class="item-wrapper w-full flex flex-col items-center justify-center h-60"
  >
    <div class="relative">
      <div
        v-if="isPlaying"
        class="z-20 w-8 h-8 flex absolute bottom-0 right-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 shadow-md items-center justify-center"
      >
        <img
          class="rounded-full h-6 w-6"
          src="../../assets/volume_up_black_24dp.svg"
          alt="Is playing"
        />
      </div>
      <button
        :class="{ [`${sound.color}`]: true }"
        class="sound-button flex items-center justify-center w-32 h-32 rounded-full shadow-lg hover:shadow-md"
        @click="play"
      >
        <div class="w-28 h-28">
          <div class="relative">
            <img
              v-if="isImageVisible"
              class="rounded-full shadow-inner"
              src="../../assets/logo.png"
              alt="Vue logo"
            />
            <div
              class="status-overlay absolute items-center justify-center text-white top-0 left-0 z-10 w-full h-full bg-gray-900 bg-opacity-50 rounded-full hidden"
            >
              <img
                v-if="isImageVisible"
                class="rounded-full h-12 w-12 scale-150"
                src="../../assets/play_arrow_white_24dp.svg"
                alt="Play"
              />
            </div>
          </div>
        </div>
      </button>
    </div>
    <div class="p-3 w-full text-xl flex flex-row items-center justify-center">
      <div class="p-2 inline-block">{{ sound.title }}</div>
      <button
        class="edit-button p-2 w-8 h-8 flex rounded-full bg-gradient-to-br from-gray-200 to-gray-100 shadow-sm items-center justify-center"
        @click="edit"
      >
        <img
          class="rounded-full h-6 w-6"
          src="../../assets/edit_black_24dp.svg"
          alt="Edit"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.sound-button:hover .status-overlay {
  @apply flex;
}

.sound-button.green-to-blue {
  @apply bg-green-300 bg-gradient-to-br from-green-500 to-blue-500;
}

.sound-button.green-to-blue > div > div > img {
  @apply bg-green-300 bg-gradient-to-br from-green-400 to-blue-400;
}

.sound-button.red {
  @apply bg-red-500;
}

.sound-button.red > div > div > img {
  @apply bg-red-400;
}

.sound-button.blue {
  @apply bg-blue-500;
}

.sound-button.blue > div > div > img {
  @apply bg-blue-400;
}

.sound-button.green {
  @apply bg-green-500;
}

.sound-button.green > div > div > img {
  @apply bg-green-400;
}
</style>
