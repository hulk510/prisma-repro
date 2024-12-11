import '@repo/ui/styles.css'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import './globals.css'

import { handlers } from '@repo/mocks/msw/handlers'
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize({}, handlers)

const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators,
  loaders: [mswLoader],
}

export default preview
