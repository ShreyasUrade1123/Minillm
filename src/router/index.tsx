import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/components/layout/RootLayout'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/features/home/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

/**
 * Application router.
 * Add new routes here as features are developed.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
