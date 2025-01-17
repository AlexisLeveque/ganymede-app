import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-6 w-full rounded-md bg-primary-800 px-2 py-0.5 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:px-3 sm:py-1 sm:text-sm',
        className,
      )}
      ref={ref}
      autoCorrect="off"
      autoCapitalize="off"
      autoComplete="off"
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
