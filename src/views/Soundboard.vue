<script setup lang="ts">
import SoundboardItem from '../components/Soundboard/SoundboardItem.vue'
import SoundboardForm from '../components/Soundboard/SoundboardForm.vue'
import { ColorOptions } from '../types/ColorOptions'
</script>

<template>
  <div>
    <div
      class="
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-4
      "
    >
      <SoundboardItem :color="ColorOptions.BLUE"></SoundboardItem>
      <SoundboardItem :color="ColorOptions.GREEN"></SoundboardItem>
      <SoundboardItem :color="ColorOptions.GREEN_TO_BLUE"></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
    </div>
    <div>
      <SoundboardForm></SoundboardForm>
    </div>
  </div>
</template>
