/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    testTimeout: 10000,
    include: ['__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      include: ['app/**/*.{ts,tsx}'],
    },
  },
})
