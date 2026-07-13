import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  FaThLarge, FaCalendarCheck, FaFlask, FaBox, FaImages,
  FaCommentAlt, FaEnvelope, FaQuestionCircle, FaTags, FaCog,
  FaSignOutAlt, FaBars, FaTimes, FaFileMedical, FaExternalLinkAlt
} from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'

const ADMIN_LINKS = [
  { to: '/admin/dashboard',    label: 'Dashboard',     icon: FaThLarge,        group: 'main' },
  { to: '/admin/appointments', label: 'Appointments',  icon: FaCalendarCheck,  group: 'main' },
  { to: '/admin/reports',      label: 'Reports Upload',icon: FaFileMedical,    group: 'main' },
  { to: '/admin/tests',        label: 'Tests',         icon: FaFlask,          group: 'content' },
  { to: '/admin/packages',     label: 'Packages',      icon: FaBox,            group: 'content' },
  { to: '/admin/offers',       label: 'Sunday Camp',   icon: FaTags,           group: 'content' },
  { to: '/admin/gallery',      label: 'Gallery',       icon: FaImages,         group: 'manage' },
  { to: '/admin/testimonials', label: 'Reviews',       icon: FaCommentAlt,     group: 'manage' },
  { to: '/admin/messages',     label: 'Messages',      icon: FaEnvelope,       group: 'manage' },
  { to: '/admin/faqs',         label: 'FAQs',          icon: FaQuestionCircle, group: 'manage' },
  { to: '/admin/settings',     label: 'Settings',      icon: FaCog,            group: 'system' },
]

const GROUP_LABELS = {
  main: 'Core',
  content: 'Catalogue',
  manage: 'Manage',
  system: 'System',
}

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (!token && !loggedIn) {
      try { toast.error('Please log in.') } catch {}
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_logged_in')
    try { toast.success('Logged out.') } catch {}
    navigate('/admin/login')
  }

  // Group links
  const groups = ['main', 'content', 'manage', 'system']

  return (
    <div className="min-h-screen bg-[#F0F4F9] dark:bg-[#080E1A] text-slate-900 dark:text-slate-100 font-sans">

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[#0D1B2E] text-white px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center shadow-inner">
            <MdLocalHospital className="text-white text-base" />
          </div>
          <div>
            <p className="font-bold text-xs leading-none">Shri Samarth Krupa</p>
            <p className="text-[9px] text-slate-400 font-medium mt-0.5">Admin Portal</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(p => !p)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
        </button>
      </header>

      <div className="flex min-h-screen lg:min-h-0">

        {/* ── Overlay ── */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Sidebar ── */}
        <aside className={`
          fixed top-0 left-0 h-full w-[260px] z-40 flex flex-col
          bg-[#0D1B2E] border-r border-white/5
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>

          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <MdLocalHospital className="text-white text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white text-sm leading-tight truncate">Shri Samarth Krupa</p>
              <p className="text-[10px] text-slate-400 font-medium">Diagnostic Centre</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1">
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
            {groups.map(group => {
              const links = ADMIN_LINKS.filter(l => l.group === group)
              if (!links.length) return null
              return (
                <div key={group}>
                  <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    {GROUP_LABELS[group]}
                  </p>
                  <div className="space-y-0.5">
                    {links.map(link => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                            isActive
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-900/30'
                              : 'text-slate-400 hover:text-white hover:bg-white/8'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <link.icon className={`text-sm flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                            <span>{link.label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <Link to="/" target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/8 transition-all">
              <FaExternalLinkAlt className="text-xs text-slate-500 flex-shrink-0" />
              <span>View Website</span>
            </Link>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-all">
              <FaSignOutAlt className="text-sm flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
