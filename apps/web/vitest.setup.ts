import { server } from '@repo/mocks/msw/server'

import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
