import { Button } from '@repo/ui/ui/button'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click me',
  },
}
