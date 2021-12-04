<script setup lang="ts">
import SoundboardItem from '../components/Soundboard/SoundboardItem.vue'
import { ColorOptions } from '../types/ColorOptions'

const handleFileChange = (event: Event) => {
  if (
    event &&
    event.target &&
    (event.target as HTMLInputElement).files &&
    (event.target as HTMLInputElement).files !== null
  ) {
    const fileList = (event.target as HTMLInputElement).files![0]
    readFile(fileList)
    console.log(fileList)
  }
}

const readFile = async (file: File) => {
  var freader = new FileReader()

  freader.onload = function (e: ProgressEvent<FileReader>) {
    console.log(e?.target?.result)
    let audioElement = document.getElementById('audio') as HTMLAudioElement
    if (audioElement) {
      audioElement.src = (e?.target?.result as string) || ''
      audioElement.play()
    }
    audioElement.onended = () => {
      console.log('ended playing')
    }
  }
  freader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <SoundboardItem :color="ColorOptions.BLUE"></SoundboardItem>
      <SoundboardItem :color="ColorOptions.GREEN"></SoundboardItem>
      <SoundboardItem :color="ColorOptions.GREEN_TO_BLUE"></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
    </div>
    <div>
      <input type="file" @change="handleFileChange" />
      <audio id="audio" src=""></audio>
    </div>
  </div>
</template>
