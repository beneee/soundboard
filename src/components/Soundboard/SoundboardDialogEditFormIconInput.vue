<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  iconDataUrl?: string
}>()

const emit = defineEmits<{
  (e: 'change', iconDataUrl: string): void
}>()

const isCustomIconEnabled = ref(!!props.iconDataUrl)

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

watch(isCustomIconEnabled, (isEnabled) => {
  if (!isEnabled) {
    emit('change', '')
  }
})
</script>

<template>
  <div
    :class="isCustomIconEnabled ? '' : 'pb-2'"
    class="bg-green-300 bg-gradient-to-br from-green-500 to-blue-500 p-4 pt-2 rounded-2xl shadow-md"
  >
    <div class="flex justify-between items-center">
      <div class="text-2xl font-light text-white leading-6">Custom Icon</div>
      <Switch
        v-model="isCustomIconEnabled"
        :class="isCustomIconEnabled ? 'bg-gray-900/75' : 'bg-gray-900/50'"
        class="relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="isCustomIconEnabled ? 'translate-x-9' : 'translate-x-0'"
          class="pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
        />
      </Switch>
    </div>
    <div
      v-if="isCustomIconEnabled"
      class="bg-white rounded-2xl p-4 shadow-inner mt-2"
    >
      <div v-if="iconDataUrl" class="flex justify-between items-center">
        <img
          :src="iconDataUrl"
          alt="sound icon"
          class="w-24 h-24 rounded-full border-gray-300 border-8"
        />
        <button
          class="w-10 h-10 bg-red-600 rounded-full flex justify-center items-center flex-grow-0 bg-gradient-to-br from-red-500 to-red-700 shadow hover:shadow-sm"
          @click="emit('change', '')"
        >
          <img
            class="rounded-full h-6 w-6"
            src="../../assets/delete_outline_white_24dp.svg"
            alt="Remove Custom Icon"
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
