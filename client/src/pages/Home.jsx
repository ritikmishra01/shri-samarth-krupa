import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaFlask, FaHeartbeat, FaHome, FaPhoneAlt, FaWhatsapp,
  FaCheckCircle, FaShieldAlt, FaMicroscope, FaUserMd,
  FaStar, FaClock, FaCalendarCheck, FaArrowRight, FaMapMarkerAlt
} from 'react-icons/fa'
import { MdOutlineLocalHospital, MdScience } from 'react-icons/md'

const TESTS = [
  { name: 'CBC (Complete Blood Count)', price: 200, sample: 'Blood', fasting: 'No', time: 'Same Day' },
  { name: 'Lipid Profile', price: 350, sample: 'Blood', fasting: 'Yes (12 hrs)', time: 'Same Day' },
  { name: 'Thyroid Profile (T3, T4, TSH)', price: 400, sample: 'Blood', fasting: 'No', time: 'Same Day' },
  { name: 'Liver Function Test', price: 500, sample: 'Blood', fasting: 'Yes (8 hrs)', time: 'Same Day' },
  { name: 'Kidney Function Test', price: 500, sample: 'Blood', fasting: 'No', time: 'Same Day' },
  { name: 'HbA1c', price: 400, sample: 'Blood', fasting: 'No', time: 'Same Day' },
  { name: 'Blood Sugar (Fasting)', price: 80, sample: 'Blood', fasting: 'Yes (8 hrs)', time: '2 hours' },
  { name: 'Iron Profile', price: 600, sample: 'Blood', fasting: 'No', time: 'Next Day' },
  { name: 'Vitamin B12', price: 700, sample: 'Blood', fasting: 'No', time: 'Same Day' },
  { name: 'Vitamin D', price: 900, sample: 'Blood', fasting: 'No', time: 'Next Day' },
  { name: 'Urine Examination', price: 100, sample: 'Urine', fasting: 'No', time: 'Same Day' },
  { name: 'Pregnancy Test', price: 150, sample: 'Urine', fasting: 'No', time: '30 mins' },
]

const PACKAGES = [
  {
    name: 'Fit India Package 1.1',
    price: 1300,
    tests: 7,
    features: ['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function', 'Kidney Function', 'Urine Examination', 'Blood Sugar'],
    popular: false
  },
  {
    name: 'Fit India Package 1.2',
    price: 1700,
    tests: 8,
    features: ['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function', 'Kidney Function', 'Urine Examination', 'Blood Sugar', 'HbA1c'],
    popular: false
  },
  {
    name: 'Fit India Package 1.3',
    price: 3000,
    tests: 11,
    features: ['Everything in Package 1.2', 'Iron Profile', 'Vitamin B12', 'Vitamin D'],
    popular: true
  }
]

const WHY_US = [
  { title: 'Experienced Phlebotomist', desc: '8+ years expert blood draw by Mr. Shailesh Dubey.', icon: FaUserMd, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
  { title: 'Safe Blood Collection', desc: 'Sterile single-use equipment, painless process.', icon: FaHeartbeat, color: 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400' },
  { title: 'Hygienic Lab', desc: 'ISO-standard sanitation and equipment protocols.', icon: FaShieldAlt, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
  { title: 'Affordable Packages', desc: 'Up to 50% cheaper than corporate diagnostic labs.', icon: FaFlask, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
  { title: 'Fast Digital Reports', desc: 'Reports on your phone within 4–6 hours.', icon: FaClock, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
  { title: 'Home Collection', desc: 'Trained phlebotomist visits your home in Kalyan.', icon: FaHome, color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' },
  { title: 'AI Report Analysis', desc: 'Simple AI explanation of your test results.', icon: MdScience, color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
  { title: 'Professional Staff', desc: 'Caring clinical team from booking to reports.', icon: MdOutlineLocalHospital, color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', rating: 5, review: 'Excellent service! Mr. Shailesh is extremely gentle and professional. Got reports on WhatsApp the same evening.' },
  { name: 'Rajesh Patil', rating: 5, review: 'Requested home collection for my aged parents. Service was punctual and very hygienic. Highly recommended!' },
  { name: 'Sunita Desai', rating: 5, review: 'Mr. Shailesh Dubey has excellent technique. Hardly felt any pain. Prices are also very reasonable.' },
]

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const [campActive, setCampActive] = useState(true)
  const [campOffers, setCampOffers] = useState([])

  // Read Sunday camp state from localStorage (set by admin)
  useEffect(() => {
    const stored = localStorage.getItem('sunday_camp_active')
    setCampActive(stored === null ? true : stored === 'true')

    try {
      const offers = JSON.parse(localStorage.getItem('sunday_camp_offers') || '[]')
      if (Array.isArray(offers) && offers.length > 0) setCampOffers(offers)
      else setCampOffers([
        { id: 1, test_name: 'Thyroid Profile', original: 800, camp: 400 },
        { id: 2, test_name: 'HbA1c (Sugar avg)', original: 700, camp: 400 },
        { id: 3, test_name: 'Lipid Profile', original: 700, camp: 400 },
        { id: 4, test_name: 'Vitamin B12', original: 1200, camp: 700 },
        { id: 5, test_name: 'Vitamin D3', original: 1500, camp: 900 },
        { id: 6, test_name: 'Blood Group', original: 150, camp: 80 },
      ])
    } catch {
      setCampOffers([])
    }
  }, [])

  // Countdown to next Sunday
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const next = new Date()
      next.setDate(now.getDate() + (7 - now.getDay()) % 7 || 7)
      next.setHours(8, 0, 0, 0)
      if (now > next) next.setDate(next.getDate() + 7)
      const diff = next - now
      if (diff <= 0) return
      setTimeLeft({
        d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left */}
            <motion.div {...fadeUp} className="flex-1 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Kalyan's Most Trusted Pathology Centre
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight font-display">
                Accurate Diagnostics.<br />
                <span className="text-blue-200">Trusted Care.</span> Healthy Life.
              </h1>

              <p className="text-slate-200 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Professional Pathology & Diagnostic Services with 8+ Years of Experience in Kalyan West. Fast digital reports delivered directly to your phone.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link to="/book-appointment"
                  className="px-5 py-2.5 bg-white text-primary-800 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2">
                  <FaCalendarCheck /> Book Test
                </Link>
                <Link to="/download-report"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm">
                  Download Report
                </Link>
                <a href="tel:8169686040"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all">
                  <FaPhoneAlt className="text-xs" /> Call Now
                </a>
                <a href="https://wa.me/918169686040" target="_blank" rel="noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] rounded-xl font-semibold text-sm flex items-center gap-2 transition-all">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                {['🏠 Home Collection', '📱 Digital Reports', '✅ 99% Accuracy', '⚡ Same Day'].map(b => (
                  <span key={b} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium border border-white/10">
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-sm lg:max-w-md"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-5 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaFlask className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Shri Samarth Krupa</p>
                    <p className="text-xs text-slate-300">Diagnostic Centre</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Owner & Phlebotomist', val: 'Mr. Shailesh Dubey' },
                    { label: 'Experience', val: '8+ Years Expert' },
                    { label: 'Location', val: 'Kalyan West, Maharashtra' },
                    { label: 'Hours', val: 'Mon–Sat 7AM–9PM | Sun 7AM–2PM' },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="text-xs text-slate-300">{r.label}</span>
                      <span className="text-xs font-semibold text-white text-right max-w-[55%]">{r.val}</span>
                    </div>
                  ))}
                </div>
                <a href="tel:8169686040"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all">
                  <FaPhoneAlt className="text-xs" /> 81 6968 6040 — Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '8+', label: 'Years Experience' },
              { val: '5000+', label: 'Happy Patients' },
              { val: '100+', label: 'Diagnostic Tests' },
              { val: '99%', label: 'Report Accuracy' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-display">{s.val}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-emerald-400 font-semibold mt-6 flex items-center justify-center gap-1.5">
            <FaMapMarkerAlt /> Home collection available across Kalyan West, Ambivali, Titwala & nearby areas
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-blue-400 mb-2">Our Advantages</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">Why Patients Choose Us</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY_US.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${f.color}`}>
                  <f.icon />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{f.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TESTS ── */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-blue-400 mb-2">Diagnostics</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">Popular Tests</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Same-day accurate results on all standard tests</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TESTS.map((test, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    {test.sample}
                  </span>
                  <span className="text-lg font-extrabold text-primary-700 dark:text-blue-400">₹{test.price}</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm flex-1 leading-snug">{test.name}</h3>
                <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400">
                  <span>Fasting: <strong className="text-slate-600 dark:text-slate-300">{test.fasting}</strong></span>
                  <span>•</span>
                  <span>Report: <strong className="text-slate-600 dark:text-slate-300">{test.time}</strong></span>
                </div>
                <Link to="/book-appointment"
                  className="mt-3 w-full text-center py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-blue-400 text-xs font-bold hover:bg-primary-700 hover:text-white transition-all">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary-700 dark:text-blue-400 text-sm font-bold hover:underline">
              View All 100+ Tests <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-blue-400 mb-2">Best Value</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">Health Packages</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Save up to 60% with our curated full-body checkup packages</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 relative flex flex-col ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-primary-700 to-primary-900 text-white shadow-2xl ring-2 ring-primary-400/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white shadow-sm'
                }`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-xs font-extrabold whitespace-nowrap shadow-md">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">{pkg.tests} Tests Included</p>
                  <h3 className="text-lg font-extrabold font-display">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mt-3 mb-5">
                    <span className="text-4xl font-extrabold">₹{pkg.price.toLocaleString()}</span>
                    <span className={`text-xs ${pkg.popular ? 'text-slate-300' : 'text-slate-400'}`}>/ person</span>
                  </div>
                  <hr className={`mb-5 ${pkg.popular ? 'border-white/15' : 'border-slate-100 dark:border-slate-700'}`} />
                  <ul className="space-y-2.5">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm">
                        <FaCheckCircle className={`mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-emerald-400' : 'text-primary-600 dark:text-blue-400'}`} />
                        <span className={pkg.popular ? 'text-slate-100' : 'text-slate-600 dark:text-slate-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 mt-auto">
                  <Link to="/book-appointment"
                    className={`w-full py-3 rounded-xl font-bold text-sm text-center block transition-all ${
                      pkg.popular
                        ? 'bg-white hover:bg-slate-100 text-primary-800'
                        : 'bg-primary-700 hover:bg-primary-800 text-white'
                    }`}>
                    Book This Package
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUNDAY CAMP (conditional on admin toggle) ── */}
      {campActive && (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0F4C81] to-[#0a2e50] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 20%, #e63946 0%, transparent 50%)' }} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
              {/* Left */}
              <div className="flex-1 space-y-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-400/30 rounded-full text-xs font-bold text-red-300 uppercase tracking-wider">
                  🔥 Special Offer · Every Sunday
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Sunday Health Camp<br />
                  <span className="text-blue-200">Half Price Diagnostics!</span>
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                  Every Sunday 7:00 AM – 2:00 PM. Get major diagnostic tests at half the regular price. Walk in or book online.
                </p>

                {/* Countdown */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 inline-block">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">Next Camp Starts In:</p>
                  <div className="flex items-center gap-2">
                    {[{ v: timeLeft.d, l: 'Days' }, { v: timeLeft.h, l: 'Hours' }, { v: timeLeft.m, l: 'Mins' }, { v: timeLeft.s, l: 'Secs' }].map((t, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-2xl font-mono font-extrabold text-emerald-400 w-10 text-center">{t.v}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{t.l}</span>
                        {i < 3 && <span className="text-slate-400 text-lg font-bold absolute -mr-2">:</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-sm transition-all shadow-lg">
                  <FaCalendarCheck /> Book Sunday Camp
                </Link>
              </div>

              {/* Right — offer cards */}
              <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {campOffers.slice(0, 6).map((offer, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center hover:bg-white/15 transition-all">
                    <p className="text-xs font-semibold text-slate-200 leading-tight">{offer.test_name}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-[11px] line-through text-slate-400">₹{offer.original}</span>
                      <span className="text-lg font-extrabold text-emerald-400">₹{offer.camp}</span>
                    </div>
                    <span className="text-[9px] bg-emerald-400/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
                      Save {Math.round(((offer.original - offer.camp) / offer.original) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── HOME COLLECTION ── */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div {...fadeUp} className="flex-1 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-blue-400">Home Collection</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
                Can't Visit the Lab?<br /> We Come to You!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Our trained phlebotomist visits your home across Kalyan. Complete sanitation, sterile equipment, and professional care at your doorstep.
              </p>
              <ul className="space-y-3">
                {[
                  { title: 'Free Home Visit', desc: 'No extra collection charges on bookings above ₹500.' },
                  { title: 'Safe & Hygienic', desc: 'Single-use sterile vacuum tube needles for every patient.' },
                  { title: 'Expert Phlebotomist', desc: 'Minimal puncture irritation from our 8+ year expert.' },
                ].map((b, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0 text-lg" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{b.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/home-collection"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-sm transition-all">
                Book Home Collection <FaArrowRight className="text-xs" />
              </Link>
            </motion.div>

            <motion.div {...fadeUp} className="flex-1 w-full max-w-md">
              <div className="bg-gradient-to-br from-primary-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 text-center border border-blue-100 dark:border-slate-600 shadow-sm">
                <FaHome className="text-6xl text-primary-600 dark:text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-extrabold text-slate-800 dark:text-white">Doorstep Sample Collection</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
                  Serving Kalyan West, Kalyan East, Khadakpada, Bail Bazar, Birla College Road & nearby areas.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  {['Kalyan West', 'Kalyan East', 'Ambivali', 'Titwala', 'Shahad', 'Vithalwadi'].map(a => (
                    <span key={a} className="px-2 py-1.5 bg-white dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
                      <FaMapMarkerAlt className="text-primary-500 text-[9px]" /> {a}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-blue-400 mb-2">Patients Speak</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">What Our Patients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <FaStar key={j} className="text-amber-400 text-sm" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</p>
                    <p className="text-[10px] text-slate-400">Verified Patient · Kalyan</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 hero-gradient text-white">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Book Your Diagnostic Test?</h2>
          <p className="text-slate-300 text-sm">Fast, affordable, and accurate. Get your reports same day.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/book-appointment"
              className="px-6 py-3 bg-white text-primary-800 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2">
              <FaCalendarCheck /> Book Now
            </Link>
            <a href="https://wa.me/918169686040" target="_blank" rel="noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
            <a href="tel:8169686040"
              className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl text-sm flex items-center gap-2 transition-all">
              <FaPhoneAlt className="text-xs" /> 81 6968 6040
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
