import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E4]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
