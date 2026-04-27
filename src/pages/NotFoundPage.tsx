import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-neutral-200 dark:text-neutral-800">404</h1>
      <p className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
        Page not found
      </p>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-10">
        <Link to="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  )
}
