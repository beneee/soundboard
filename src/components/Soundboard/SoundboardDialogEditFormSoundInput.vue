<script setup lang="ts">
const props = defineProps<{
  soundDataUrl?: string
}>()

const emit = defineEmits<{
  (e: 'change', soundDataUrl: string): void
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
    emit('change', newDataUrl)
  }
}

const play = () => {
  if (props.soundDataUrl) {
    const audio = new Audio(props.soundDataUrl)
    audio.play()
  }
}
</script>

<template>
  <div
    class="bg-green-300 bg-gradient-to-br from-green-500 to-blue-500 p-4 pt-2 rounded-2xl shadow-md"
  >
    <div class="text-2xl font-light text-white mb-2 leading-6">Sound File</div>
    <div class="bg-white rounded-2xl p-4 shadow-inner">
      <div
        v-if="soundDataUrl"
        class="flex flex-row justify-between items-center"
      >
        <button
          class="w-16 h-16 bg-gray-400 rounded-full flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-500 shadow hover:shadow-sm"
          @click="play"
        >
          <img
            class="play-icon rounded-full h-12 w-12 scale-100 z-30 flex-grow-0"
            src="../../assets/play_arrow_white_24dp.svg"
          />
        </button>
        <div class="flex-grow h-1.5 px-4">
          <div class="relative w-full h-full">
            <div
              class="w-full h-full bg-gray-300 bg-gradient-to-br from-gray-200 to-gray-300 rounded shadow-sm"
            ></div>
            <div
              style="width: 35%"
              class="absolute left-0 top-0 h-full bg-green-500 bg-gradient-to-br from-green-500 to-blue-500 rounded"
            ></div>
          </div>
        </div>
        <button
          class="w-10 h-10 bg-red-600 rounded-full flex justify-center items-center flex-grow-0 bg-gradient-to-br from-red-500 to-red-700 shadow hover:shadow-sm"
          @click="emit('change', '')"
        >
          <img
            class="rounded-full h-6 w-6"
            src="../../assets/delete_outline_white_24dp.svg"
            alt="Remove Sound File"
          />
        </button>
      </div>
      <div v-else>
        <input
          type="file"
          class="w-full rounded p-2"
          @change="handleFileChange"
        />
      </div>
    </div>
  </div>
</template>
