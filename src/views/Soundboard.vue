<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SoundboardItem from '../components/Soundboard/SoundboardItem.vue'
// import SoundboardForm from '../components/Soundboard/SoundboardForm.vue'
import SoundboardDialogAdd from '../components/Soundboard/SoundboardDialogAdd.vue'
import SoundboardDialogEdit from '../components/Soundboard/SoundboardDialogEdit.vue'
import { Sound } from '../types/Sound'
import { SoundInput } from '../types/SoundInput'
import DialogDemo from '../components/headless-ui/DialogDemo.vue'
import { useStore } from 'vuex'
import { State } from '../types/state/State'

const soundList = computed<Sound[]>(() => store.getters['sounds/soundList'])

const isLoading = ref(false)

const store = useStore<State>()

onMounted(async () => {
  isLoading.value = true
  await store.dispatch('sounds/loadSoundList')
  isLoading.value = false
})

/*
 * Add sound
 */
const isAddSoundDialogVisible = ref(false)
const addSound = (newSound: SoundInput) => {
  isAddSoundDialogVisible.value = false
  store.dispatch('sounds/addSound', newSound)
}

/*
 * Edit/delete sound
 */
const selectedSoundForEdit = ref<SoundInput>()
const updateSound = (newSound: SoundInput) => {
  selectedSoundForEdit.value = undefined
  store.dispatch('sounds/addSound', newSound)
}
const deleteSound = (soundId: string) => {
  selectedSoundForEdit.value = undefined
  store.dispatch('sounds/removeSound', soundId)
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <SoundboardItem
        v-for="sound in soundList"
        :key="`sound-${sound.id}`"
        :sound="sound"
        @edit-sound="selectedSoundForEdit = sound"
      ></SoundboardItem>
      <div>
        <button @click="isAddSoundDialogVisible = true">+</button>
      </div>
    </div>
    <div>
      <SoundboardDialogAdd
        v-if="isAddSoundDialogVisible"
        @add-sound="addSound"
        @cancel="isAddSoundDialogVisible = false"
      ></SoundboardDialogAdd>
      <SoundboardDialogEdit
        v-if="selectedSoundForEdit"
        :sound="selectedSoundForEdit"
        @update-sound="updateSound"
        @delete-sound="deleteSound"
        @cancel="selectedSoundForEdit = undefined"
      ></SoundboardDialogEdit>
    </div>

    <!-- <div>
      <DialogDemo></DialogDemo>
    </div> -->
  </div>
</template>
