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
  <div>
    <h2>Form</h2>
    <input type="file" @change="handleFileChange" />
    <input
      type="text"
      @input="title = ($event.target as HTMLInputElement).value"
    />
    <button @click="play">Play</button>
    <button
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
