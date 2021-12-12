<script setup lang="ts">
import { ref } from 'vue'
import { ColorOptions } from '../../types/ColorOptions'
import { SoundInput } from '../../types/SoundInput'

const fileDataUrl = ref<string>('')
const title = ref<string>('')

const emit = defineEmits<{
  (e: 'addSound', sound: SoundInput): void
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
    fileDataUrl.value = await readFile(selectedFile)
    console.log(fileDataUrl.value)
  }
}

const play = () => {
  if (fileDataUrl.value) {
    const audio = new Audio(fileDataUrl.value)
    audio.play()
  }
  console.log(title.value)
}
</script>

<template>
  <div class="flex flex-col p-4 max-w-lg border border-gray-400 rounded">
    <h2 class="mb-4 text-xl">Add sound</h2>
    <input
      type="file"
      class="w-full border border-gray-400 rounded p-2 mb-4"
      @change="handleFileChange"
    />
    <input
      type="text"
      class="w-full border border-gray-400 rounded p-2 mb-4"
      @input="title = ($event.target as HTMLInputElement).value"
    />
    <button class="w-min bg-gray-400 rounded px-4 py-2 mb-4" @click="play">
      Play
    </button>
    <button
      class="bg-gray-400 rounded px-4 py-2"
      @click="
        () =>
          emit('addSound', {
            dataUrl: fileDataUrl,
            title: title,
            color: ColorOptions.GREEN_TO_BLUE,
          })
      "
      >Add Sound</button
    >
  </div>
</template>
