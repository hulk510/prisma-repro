import { MSWTest } from '@repo/ui/mswTest'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/MSWTest',
  component: MSWTest,
} satisfies Meta<typeof MSWTest>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
