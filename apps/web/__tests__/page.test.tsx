import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Page from '../app/page'

// MEMO: とりあえずモックにしておく
vi.mock('@repo/auth', () => ({
  auth: vi.fn().mockResolvedValue(null),
}))

test('Initial Page Test', async () => {
  const page = await Page()
  render(page)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Apps' }),
  ).toBeInTheDocument()
})

test('Initial MSW Test', async () => {
  const res = await fetch('/')
  const data = await res.json()
  expect(data).toEqual({
    message: 'Hello, World!',
  })
})
