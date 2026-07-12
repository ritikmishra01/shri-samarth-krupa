import { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  FaThLarge, FaCalendarCheck, FaFlask, FaBox, FaImages,
  FaCommentAlt, FaEnvelope, FaQuestionCircle, FaTags, FaCog, FaSignOutAlt
} from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'

const ADMIN_LINKS = [
  { to: '/admin/dashboard',    label: 'Dashboard',    icon: <FaThLarge /> },
  { to: '/admin/appointments', label: 'Appointments', icon: <FaCalendarCheck /> },
  { to: '/admin/tests',        label: 'Tests CRUD',   icon: <FaFlask /> },
  { to: '/admin/packages',     label: 'Packages',     icon: <FaBox /> },
  { to: '/admin/gallery',      label: 'Gallery',      icon: <FaImages /> },
  { to: '/admin/testimonials', label: 'Reviews',      icon: <FaCommentAlt /> },
  { to: '/admin/messages',     label: 'Messages',     icon: <FaEnvelope /> },
  { to: '/admin/faqs',         label: 'FAQs Manage',  icon: <FaQuestionCircle /> },
  { to: '/admin/offers',       label: 'Sunday Camp',  icon: <FaTags /> },
  { to: '/admin/settings',     label: 'Settings',     icon: <FaCog /> }
]

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (!token && !loggedIn) {
      try { toast.error('Please log in to access Admin Panel.') } catch(e) {}
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    toast.success('Logged out successfully.')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex text-slate-800 dark:text-slate-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between flex-shrink-0 border-r border-slate-800">
        
        {/* Top Branding */}
        <div>
          <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              <MdLocalHospital className="text-white text-base" />
            </div>
            <div>
              <p className="font-bold text-xs leading-none">Shri Samarth Krupa</p>
              <p className="text-[10px] text-slate-400 font-semibold leading-normal">Admin Dashboard</p>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {ADMIN_LINKS.map(link => (
              <NavLink 
                key={link.to} 
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-slate-800 hover:text-white ${
                    isActive ? 'bg-primary-700 text-white active-link' : ''
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Outlet Wrapper */}
      <main className="flex-1 overflow-y-auto p-8 sm:p-10 lg:p-12">
        <Outlet />
      </main>

    </div>
  )
}
