<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import SoundboardItem from '../components/Soundboard/SoundboardItem.vue'
import SoundboardForm from '../components/Soundboard/SoundboardForm.vue'
import { ColorOptions } from '../types/ColorOptions'
import { Sound } from '../types/Sound'
import { SoundInput } from '../types/SoundInput'

const soundList = ref<Sound[]>([])

const addSound = (newSound: SoundInput) =>
  (soundList.value = [
    ...soundList.value,
    {
      ...newSound,
      id: uuidv4(),
    },
  ])
</script>

<template>
  <div>
    <!-- <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <SoundboardItem :color="ColorOptions.BLUE"></SoundboardItem>
      <SoundboardItem :color="ColorOptions.GREEN"></SoundboardItem>
      <SoundboardItem :color="ColorOptions.GREEN_TO_BLUE"></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
    </div> -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <SoundboardItem
        v-for="sound in soundList"
        :key="`sound-${sound.id}`"
        :sound="sound"
      ></SoundboardItem>
    </div>
    <div>
      <SoundboardForm @add-sound="addSound"></SoundboardForm>
    </div>
  </div>
</template>
