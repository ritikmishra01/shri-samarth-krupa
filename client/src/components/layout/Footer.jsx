import { Link } from 'react-router-dom'
import {
  FaPhoneAlt, FaEnvelope, FaWhatsapp, FaFacebookF,
  FaMapMarkerAlt, FaClock, FaHeart
} from 'react-icons/fa'
import { MdOutlineLocalHospital } from 'react-icons/md'

const QUICK_LINKS = [
  { to: '/',                label: 'Home' },
  { to: '/about',           label: 'About Us' },
  { to: '/services',        label: 'Our Services' },
  { to: '/packages',        label: 'Health Packages' },
  { to: '/home-collection', label: 'Home Collection' },
  { to: '/gallery',         label: 'Gallery' },
  { to: '/faq',             label: 'FAQs' },
  { to: '/contact',         label: 'Contact Us' },
]

const SERVICES_LINKS = [
  { to: '/services', label: 'Complete Blood Count' },
  { to: '/services', label: 'Thyroid Function Tests' },
  { to: '/services', label: 'Lipid Profile' },
  { to: '/services', label: 'Liver Function Tests' },
  { to: '/services', label: 'Kidney Function Tests' },
  { to: '/services', label: 'Blood Sugar Tests' },
  { to: '/services', label: 'Vitamin D3 & B12' },
  { to: '/services', label: 'HbA1c Test' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark dark:bg-[#080f1e] text-slate-300" aria-label="Footer">
      {/* Top border gradient */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand Column ─────────────────── */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
                <MdOutlineLocalHospital className="text-white text-xl" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Shree Samarth Krupa</p>
                <p className="text-xs text-primary-400 leading-tight">Diagnostic Centre</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Trusted pathology services in Kalyan West since 2016. Accurate testing, affordable pricing, and compassionate care for your family's health.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/918169686040"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
              >
                <FaWhatsapp className="text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
              >
                <FaFacebookF className="text-white text-sm" />
              </a>
            </div>
          </div>

          {/* ── Quick Links ──────────────────── */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-600 group-hover:bg-primary-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services Links ───────────────── */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Tests</h3>
            <ul className="space-y-2">
              {SERVICES_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-600 group-hover:bg-primary-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ─────────────────── */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>

            {/* Center 1 */}
            <div className="mb-4">
              <p className="text-primary-400 text-xs font-semibold mb-2 uppercase tracking-wider">Center 1 — Gauri Pada</p>
              <div className="space-y-1.5 text-sm text-slate-400">
                <div className="flex gap-2">
                  <FaMapMarkerAlt className="text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Sai Villa, Near Ayyappa Mandir, Gauri Pada Talao Road, Kalyan West</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaPhoneAlt className="text-primary-500 flex-shrink-0 text-xs" />
                  <div>
                    <a href="tel:8169686040" className="hover:text-primary-400 transition-colors block">8169686040</a>
                    <a href="tel:9004525820" className="hover:text-primary-400 transition-colors block">9004525820</a>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <FaEnvelope className="text-primary-500 flex-shrink-0 text-xs" />
                  <a href="mailto:shreesamarthkrupadiagnostic@gmail.com" className="hover:text-primary-400 transition-colors text-xs break-all">
                    shreesamarthkrupadiagnostic@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Center 2 */}
            <div className="mb-4">
              <p className="text-primary-400 text-xs font-semibold mb-2 uppercase tracking-wider">Center 2 — Kongaon</p>
              <div className="space-y-1.5 text-sm text-slate-400">
                <div className="flex gap-2">
                  <FaMapMarkerAlt className="text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Shop No.04, Mahadev Drushti Complex, Near Dharma Niwas, Kongaon, Kalyan West</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaPhoneAlt className="text-primary-500 flex-shrink-0 text-xs" />
                  <div>
                    <a href="tel:8169686040" className="hover:text-primary-400 transition-colors block">8169686040</a>
                    <a href="tel:8766645123" className="hover:text-primary-400 transition-colors block">8766645123</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex gap-2 items-start text-sm text-slate-400">
              <FaClock className="text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-xs font-medium">Working Hours</p>
                <p>Mon–Sat: 7:00 AM – 7:00 PM</p>
                <p>Sunday: 7:00 AM – 12:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {currentYear} Shree Samarth Krupa Diagnostic Centre. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <FaHeart className="text-red-500 mx-0.5" /> for Shree Samarth Krupa
          </p>
        </div>
      </div>
    </footer>
  )
}
