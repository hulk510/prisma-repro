// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./app/**/*.tsx'],
  presets: [sharedConfig],
  theme: {
    extend: {},
  },
}

export default config
