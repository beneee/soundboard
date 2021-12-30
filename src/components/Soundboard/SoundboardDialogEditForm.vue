<script setup lang="ts">
import { ref } from 'vue'
import { ColorOptions } from '../../types/ColorOptions'
import { Sound } from '../../types/Sound'
import { SoundInput } from '../../types/SoundInput'
import SoundboardDialogEditFormIconInput from './SoundboardDialogEditFormIconInput.vue'
import SoundboardDialogEditFormSoundInput from './SoundboardDialogEditFormSoundInput.vue'
import SoundboardDialogEditFormTitleInput from './SoundboardDialogEditFormTitleInput.vue'

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

const emitChange = (newSound: SoundInput) => {
  console.log('newSound', newSound)
  emit('changeSound', newSound)
}
</script>

<template>
  <div class="">
    <div class="mb-4">
      <SoundboardDialogEditFormTitleInput
        :title="sound.title"
        @change="(title) => emitChange({ ...sound, title })"
      ></SoundboardDialogEditFormTitleInput>
    </div>

    <div class="mb-4">
      <SoundboardDialogEditFormSoundInput
        :sound-data-url="sound.dataUrl"
        @change="(dataUrl) => emitChange({ ...sound, dataUrl })"
      ></SoundboardDialogEditFormSoundInput>
    </div>

    <div class="mb-4">
      <SoundboardDialogEditFormIconInput
        :icon-data-url="sound.iconDataUrl"
        @change="(iconDataUrl) => emitChange({ ...sound, iconDataUrl })"
      ></SoundboardDialogEditFormIconInput>
    </div>
  </div>
</template>
