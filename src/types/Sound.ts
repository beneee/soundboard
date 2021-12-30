import { ColorOptions } from './ColorOptions'

export interface Sound {
  id: string
  title: string
  dataUrl: string
  iconDataUrl?: string
  color?: ColorOptions
}
