<script setup lang="ts">
import { ref } from 'vue'
import { ColorOptions } from '../../types/ColorOptions'
import { Sound } from '../../types/Sound'
import { SoundInput } from '../../types/SoundInput'

const props = defineProps<{
  sound: SoundInput
}>()

const emit = defineEmits<{
  (e: 'changeSound', sound: SoundInput): void
}>()

const readFile = async (file: File): Promise<string> => {
  const fileReader = new FileReader()
  const promise = new Promise((resolve, reject) => {
    fileReader.onload = function (e: ProgressEvent<FileReader>) {
      console.log(e?.target?.result)
      if (e?.target?.result) {
        resolve(e?.target?.result)
      } else {
        reject('Failed to load file')
      }
    }
  })
  fileReader.readAsDataURL(file)
  return promise as Promise<string>
}

const handleFileChange = async (event: Event) => {
  if (event.target && (event.target as HTMLInputElement).files) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const selectedFile = (event.target as HTMLInputElement).files![0]
    const newDataUrl = await readFile(selectedFile)
    emit('changeSound', { ...props.sound, dataUrl: newDataUrl })
  }
}

const play = () => {
  if (props.sound.dataUrl) {
    const audio = new Audio(props.sound.dataUrl)
    audio.play()
  }
}
</script>

<template>
  <div class="">
    <input
      type="file"
      class="w-full border border-gray-400 rounded p-2 mb-4"
      @change="handleFileChange"
    />
    <button
      v-if="sound.dataUrl"
      class="w-min bg-gray-400 rounded px-4 py-2 mb-4"
      @click="play"
    >
      Play
    </button>
    <input
      :value="props.sound.title"
      type="text"
      class="w-full border border-gray-400 rounded p-2 mb-4"
      @input="emit('changeSound', {...sound, title: ($event.target as HTMLInputElement).value})"
    />
  </div>
</template>
