<script setup lang="ts">
import SoundboardItem from '../components/Soundboard/SoundboardItem.vue'
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
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
      <SoundboardItem></SoundboardItem>
    </div>
  </div>
</template>
