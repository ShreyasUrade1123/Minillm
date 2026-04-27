import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullPage?: boolean
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
}

export function LoadingSpinner({
  className,
  size = 'md',
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-solid border-current border-r-transparent text-primary-500 motion-reduce:animate-[spin_1.5s_linear_infinite]',
        sizeClasses[size],
        className,
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )

  if (fullPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-bg)]">
        {spinner}
      </div>
    )
  }

  return spinner
}
