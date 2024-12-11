import { LoginButton } from '@repo/ui/loginButton'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta = {
  title: 'Components/LoginButton',
  component: LoginButton,
} satisfies Meta<typeof LoginButton>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('button', { name: 'ログイン' }))
  },
}
