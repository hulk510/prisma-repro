import type { Config } from 'tailwindcss'

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(90deg, #3a8dff, #b000ff)',
      },
    },
  },
}
export default config
