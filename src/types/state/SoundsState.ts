import { Sound } from '../Sound'

export interface SoundsState {
  soundMap: { [soundId: string]: Sound }
  soundIdList: string[]
}
