import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import FloatingButtons from '../common/FloatingButtons.jsx'
import ScrollToTop from '../common/ScrollToTop.jsx'
import { useScrollTop } from '../../hooks/useScrollTop.js'

export default function Layout() {
  useScrollTop()

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark relative overflow-hidden">
      {/* Global Ambient Glow Blobs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[60vh] right-1/4 w-[400px] h-[400px] rounded-full bg-rose-500/5 dark:bg-rose-500/3 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[180vh] left-1/3 w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[150px] pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-18">
          <Outlet />
        </main>
        <Footer />
        <FloatingButtons />
        <ScrollToTop />
      </div>
    </div>
  )
}
