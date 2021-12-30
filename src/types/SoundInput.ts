import { ColorOptions } from './ColorOptions'

export interface SoundInput {
  id?: string
  title: string
  dataUrl: string
  iconDataUrl?: string
  color?: ColorOptions
}
