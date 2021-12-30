<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'change', title: string): void
}>()
</script>

<template>
  <div
    class="bg-green-300 bg-gradient-to-br from-green-500 to-blue-500 p-4 pt-2 rounded-2xl shadow-md"
  >
    <div class="flex justify-between items-center">
      <div class="text-2xl font-light text-white leading-6">Title</div>
    </div>
    <input
      :value="props.title"
      type="text"
      class="w-full bg-white rounded-2xl p-4 shadow-inner mt-2"
      @input="emit('change', ($event.target as HTMLInputElement).value)"
    />
    <div class="">
      <div> </div>
    </div>
  </div>
</template>
