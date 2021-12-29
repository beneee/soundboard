import { ActionContext } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { loadSoundboardConfig, storeSoundboardConfig } from '../../db/soundsDb'
import { Sound } from '../../types/Sound'
import { SoundsState } from '../../types/state/SoundsState'
import { State } from '../../types/state/State'

const state: SoundsState = {
  soundMap: {},
  soundIdList: [],
}

const getters = {
  soundList: (state: SoundsState): Sound[] =>
    state.soundIdList.map((soundId) => state.soundMap[soundId]),
}

const mutations = {
  addSoundList: (state: SoundsState, additionalSoundList: Sound[]): void => {
    let newSoundIdList = [...state.soundIdList]
    let newSoundMap = { ...state.soundMap }
    additionalSoundList.forEach((additionalSound) => {
      // add id to list
      if (!newSoundIdList.includes(additionalSound.id)) {
        newSoundIdList = newSoundIdList.concat(additionalSound.id)
      }
      // add sound to map
      newSoundMap = {
        ...newSoundMap,
        [additionalSound.id]: additionalSound,
      }
    })
    state.soundIdList = newSoundIdList
    state.soundMap = newSoundMap
  },
  removeSound: (state: SoundsState, removeSoundId: string): void => {
    // remove id from id list
    const newSoundIdList = state.soundIdList.filter(
      (soundId) => soundId !== removeSoundId
    )
    state.soundIdList = newSoundIdList
    // remove sound from map
    const newSoundMap = { ...state.soundMap }
    delete newSoundMap[removeSoundId]
    state.soundMap = newSoundMap
  },
}

const actions = {
  loadSoundList: async ({
    commit,
  }: ActionContext<SoundsState, State>): Promise<void> => {
    const soundboardConfig = await loadSoundboardConfig()
    commit('addSoundList', soundboardConfig.soundList)
  },
  addSound: async (
    { commit, getters, state }: ActionContext<SoundsState, State>,
    // TODO: use another type with optional id!
    additionalSound: Sound
  ): Promise<void> => {
    const newSound = { ...additionalSound }
    if (!newSound.id) {
      newSound.id = uuidv4()
    }
    commit('addSoundList', [newSound])
    await storeSoundboardConfig({
      soundList: getters.soundList,
      // soundList: state.soundIdList.map((soundId) => state.soundMap[soundId]),
    })
  },
  removeSound: async (
    { commit, getters, state }: ActionContext<SoundsState, State>,
    removeSoundId: string
  ): Promise<void> => {
    commit('removeSound', removeSoundId)
    await storeSoundboardConfig({
      soundList: getters.soundList,
      // soundList: state.soundIdList.map((soundId) => state.soundMap[soundId]),
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
