import { RouterProvider } from 'react-router-dom'

import { useThemeInit } from '@/hooks/useThemeInit'
import { router } from '@/router'

export default function App() {
  // Initialize theme from localStorage on mount
  useThemeInit()

  return <RouterProvider router={router} />
}
