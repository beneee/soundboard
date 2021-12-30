<script setup lang="ts">
const emit = defineEmits<{
  (e: 'addSound'): void
}>()
</script>

<template>
  <div
    class="item-wrapper w-full flex flex-col items-center justify-center h-60"
  >
    <div class="relative">
      <button
        class="sound-button flex items-center justify-center w-32 h-32 rounded-full border-8 border-gray-300 hover:border-gray-400 border-dashed"
        @click="emit('addSound')"
      >
        <div class="w-28 h-28">
          <div
            class="absolute items-center justify-center top-0 left-0 w-full h-full flex"
          >
            <img
              class="play-icon rounded-full h-12 w-12 scale-150 z-30"
              src="../../assets/add_gray_24dp.svg"
            />
          </div>
        </div>
      </button>
    </div>
    <div class="p-3 w-full text-xl flex flex-row items-center justify-center">
      <div class="p-2 inline-block">Add</div>
    </div>
  </div>
</template>
