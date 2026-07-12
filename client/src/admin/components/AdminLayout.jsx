import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  FaThLarge, FaCalendarCheck, FaFlask, FaBox, FaImages,
  FaCommentAlt, FaEnvelope, FaQuestionCircle, FaTags, FaCog,
  FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'

const ADMIN_LINKS = [
  { to: '/admin/dashboard',    label: 'Dashboard',    icon: <FaThLarge /> },
  { to: '/admin/appointments', label: 'Appointments', icon: <FaCalendarCheck /> },
  { to: '/admin/tests',        label: 'Tests',        icon: <FaFlask /> },
  { to: '/admin/packages',     label: 'Packages',     icon: <FaBox /> },
  { to: '/admin/gallery',      label: 'Gallery',      icon: <FaImages /> },
  { to: '/admin/testimonials', label: 'Reviews',      icon: <FaCommentAlt /> },
  { to: '/admin/messages',     label: 'Messages',     icon: <FaEnvelope /> },
  { to: '/admin/faqs',         label: 'FAQs',         icon: <FaQuestionCircle /> },
  { to: '/admin/offers',       label: 'Sunday Camp',  icon: <FaTags /> },
  { to: '/admin/settings',     label: 'Settings',     icon: <FaCog /> }
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (!token && !loggedIn) {
      try { toast.error('Please log in to access Admin Panel.') } catch (e) {}
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_logged_in')
    try { toast.success('Logged out successfully.') } catch (e) {}
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-3 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-700 rounded-lg flex items-center justify-center">
            <MdLocalHospital className="text-white text-sm" />
          </div>
          <div>
            <p className="font-bold text-xs leading-none">Shri Samarth Krupa</p>
            <p className="text-[9px] text-slate-400">Admin Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      <div className="flex relative">

        {/* ── Mobile Overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 text-slate-300 z-40
          flex flex-col justify-between border-r border-slate-800
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:translate-x-0 lg:h-screen lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>

          {/* Sidebar Header */}
          <div>
            <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdLocalHospital className="text-white text-base" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs leading-none truncate">Shri Samarth Krupa</p>
                <p className="text-[10px] text-slate-400 font-semibold leading-normal">Admin Dashboard</p>
              </div>
              {/* Close button (mobile only) */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-auto lg:hidden w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="p-3 space-y-0.5">
              {ADMIN_LINKS.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-slate-800 hover:text-white ${
                      isActive ? 'bg-primary-700 text-white' : ''
                    }`
                  }
                >
                  <span className="text-sm flex-shrink-0">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-950">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-all mb-1"
            >
              <MdLocalHospital className="text-sm flex-shrink-0" />
              <span>View Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FaSignOutAlt className="text-sm flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
