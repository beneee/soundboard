import { DBSchema, IDBPDatabase, openDB } from 'idb'
import { Sound } from '../types/Sound'

const DB_NAME = 'soundboard-3000-db'
const DB_VERSION = 1
const DB_CONFIG_STORE_NAME = 'soundboard-3000-config'
const DB_SOUNDS_STORE_NAME = 'soundboard-3000-sounds'
const CONFIG_KEY = 'soundboard-config'

interface PersistedConfig {
  soundIdList: string[]
}

interface SoundboardDB extends DBSchema {
  [DB_CONFIG_STORE_NAME]: {
    key: string
    value: PersistedConfig
  }
  [DB_SOUNDS_STORE_NAME]: {
    value: Sound
    key: string
    indexes: { title: string }
  }
}

let db: IDBPDatabase<SoundboardDB>

async function initDb() {
  db = await openDB<SoundboardDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // create object store for config
      db.createObjectStore(DB_CONFIG_STORE_NAME)

      // create object store for sounds
      const soundsStore = db.createObjectStore(DB_SOUNDS_STORE_NAME, {
        keyPath: 'id',
      })
      soundsStore.createIndex('title', 'title')
    },
  })
}

export async function storeSoundboardConfig(soundboardConfig: {
  soundList: Sound[]
}): Promise<void> {
  console.log('store soundboard config')
  console.log(soundboardConfig.soundList)
  if (!db) {
    await initDb()
  }

  // Store sounds
  const soundListTransaction = db.transaction(DB_SOUNDS_STORE_NAME, 'readwrite')
  await Promise.all([
    ...soundboardConfig.soundList.map((sound) =>
      soundListTransaction.store.put({ ...sound })
    ),
    soundListTransaction.done,
  ])

  console.log('after')

  // Store config
  const config: PersistedConfig = {
    soundIdList: soundboardConfig.soundList.map((sound) => sound.id),
  }
  await db.put(DB_CONFIG_STORE_NAME, config, CONFIG_KEY)
}

export async function loadSoundboardConfig(): Promise<{
  soundList: Sound[]
}> {
  if (!db) {
    await initDb()
  }

  // get config from db
  const persistedConfig = await db.get(DB_CONFIG_STORE_NAME, CONFIG_KEY)
  if (!persistedConfig?.soundIdList) {
    return { soundList: [] }
  }

  // get sounds from db
  const soundList: Sound[] = (
    await Promise.all(
      persistedConfig.soundIdList.map((soundId) =>
        db.get(DB_SOUNDS_STORE_NAME, soundId)
      )
    )
  ).filter((sound): sound is Sound => !!sound)
  return { soundList }
}
