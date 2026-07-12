import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import {
  FaSun, FaMoon, FaBars, FaTimes, FaPhoneAlt, FaDownload,
  FaFlask, FaWhatsapp
} from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'

const NAV_LINKS = [
  { to: '/',                label: 'Home'            },
  { to: '/about',           label: 'About'           },
  { to: '/services',        label: 'Tests'           },
  { to: '/packages',        label: 'Packages'        },
  { to: '/book-appointment',label: 'Book Test'       },
  { to: '/download-report', label: 'Download Report' },
  { to: '/gallery',         label: 'Gallery'         },
  { to: '/faq',             label: 'FAQ'             },
  { to: '/contact',         label: 'Contact'         },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const location = useLocation()

  useEffect(() => { setIsOpen(false) }, [location.pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navClass = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${scrolled
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/10'
      : 'bg-transparent'
    }
  `

  const linkBase = 'relative text-xs font-medium transition-colors duration-200 py-1 group whitespace-nowrap'
  const linkActive = 'text-primary-700 dark:text-blue-400'
  const linkInactive = 'text-slate-700 dark:text-slate-300 hover:text-primary-700 dark:hover:text-blue-400'

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Shri Samarth Krupa Home">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-glow flex-shrink-0">
              <MdLocalHospital className="text-white text-lg" />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-primary-700 dark:text-blue-400 text-sm leading-tight font-display">
                Shri Samarth Krupa
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                Diagnostic Centre · Kalyan
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${linkBase} px-2.5 ${isActive ? linkActive : linkInactive}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span className={`
                      absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                      bg-gradient-to-r from-primary-600 to-[#E63946]
                      transition-transform duration-300
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaSun className="text-yellow-400 text-sm" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaMoon className="text-slate-600 text-sm" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918169686040"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden md:flex w-8 h-8 rounded-xl items-center justify-center bg-[#25D366] hover:bg-[#1ea854] text-white transition-all hover:shadow-lg"
            >
              <FaWhatsapp className="text-sm" />
            </a>

            {/* Book Test */}
            <Link
              to="/book-appointment"
              id="nav-book-btn"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-full text-xs font-semibold hover:shadow-glow transition-all hover:-translate-y-0.5 font-display"
            >
              <FaFlask className="text-xs" />
              Book Test
            </Link>

            {/* Download Report */}
            <Link
              to="/download-report"
              id="nav-report-btn"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 border border-primary-700 text-primary-700 dark:text-blue-400 dark:border-blue-400 rounded-full text-xs font-semibold hover:bg-primary-50 dark:hover:bg-slate-800 transition-all font-display"
            >
              <FaDownload className="text-xs" />
              Report
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(v => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              className="xl:hidden w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                    <FaTimes />
                  </motion.span>
                ) : (
                  <motion.span key="bars" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.2 }}>
                    <FaBars />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col xl:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-primary-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <MdLocalHospital className="text-white" />
                  </div>
                  <span className="font-bold text-white text-sm font-display">SKD Diagnostic</span>
                </div>
                <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white">
                  <FaTimes />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-blue-400 border-l-4 border-primary-700'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <Link
                  to="/book-appointment"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-xl font-semibold text-sm font-display"
                >
                  <FaFlask /> Book Test Online
                </Link>
                <a
                  href="tel:8169686040"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary-700 text-primary-700 dark:text-blue-400 rounded-xl font-semibold text-sm font-display"
                >
                  <FaPhoneAlt /> Call: 8169686040
                </a>
                <a
                  href="https://wa.me/918169686040"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white rounded-xl font-semibold text-sm font-display"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
                <div className="text-center pt-2">
                  <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-600">Admin Login</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
