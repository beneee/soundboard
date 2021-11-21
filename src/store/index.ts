import { createStore } from 'vuex'
import modules from './modules'

export const store = {
  modules,
  strict: true,
}

export default createStore(store)
