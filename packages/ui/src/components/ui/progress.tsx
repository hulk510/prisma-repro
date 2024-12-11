'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '#deps/lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'ui-relative ui-h-4 ui-w-full ui-overflow-hidden ui-rounded-full ui-bg-secondary',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='ui-h-full ui-w-full ui-flex-1 ui-bg-primary ui-transition-all'
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
