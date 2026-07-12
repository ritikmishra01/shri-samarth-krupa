import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaFlask, FaHeartbeat, FaHome, FaPhoneAlt, FaWhatsapp,
  FaCheckCircle, FaChevronDown, FaShieldAlt, FaMicroscope,
  FaUserMd, FaStar, FaBlog, FaClock, FaCalendarCheck
} from 'react-icons/fa'
import { MdOutlineLocalHospital } from 'react-icons/md'
import useCountUp from '../hooks/useCountUp'

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
  { name: 'Pregnancy Test', price: 150, sample: 'Urine/Blood', fasting: 'No', time: '30 mins' },
]

const PACKAGES = [
  {
    name: 'Fit India Package 1.1',
    price: 1300,
    features: ['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function', 'Kidney Function', 'Urine Examination', 'Blood Sugar'],
    popular: false
  },
  {
    name: 'Fit India Package 1.2',
    price: 1700,
    features: ['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function', 'Kidney Function', 'Urine Examination', 'Blood Sugar', 'HbA1c'],
    popular: false
  },
  {
    name: 'Fit India Package 1.3',
    price: 3000,
    features: ['Everything in Package 1.2', 'Iron Profile', 'Vitamin B12', 'Vitamin D'],
    popular: true
  }
]

export default function Home() {
  // Countdown for Sunday camp
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const nextSunday = new Date()
      nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7)
      nextSunday.setHours(8, 0, 0, 0)
      if (now > nextSunday) {
        nextSunday.setDate(nextSunday.getDate() + 7)
      }
      const difference = nextSunday - now
      let timeLeft = ''
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }
      setTimeLeft(timeLeft)
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <span className="badge badge-blue bg-white/20 text-white border border-white/30 text-xs">
              ★ Kalyan's Most Trusted Pathology Centre
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-display">
              Accurate Diagnostics.<br/>Trusted Care. Healthy Life.
            </h1>
            <p className="text-lg text-slate-200 max-w-xl mx-auto lg:mx-0">
              Professional Pathology & Diagnostic Services with 8+ Years of Trusted Experience. Get reports directly on your phone with AI-powered health analysis.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/book-appointment" className="px-6 py-3 btn-primary text-sm shadow-glow">
                Book Test Online
              </Link>
              <Link to="/download-report" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full font-semibold text-sm transition-all">
                Download Report
              </Link>
              <a href="tel:8169686040" className="px-6 py-3 bg-[#00B894] hover:bg-[#00a381] rounded-full font-semibold text-sm flex items-center gap-2 transition-all">
                <FaPhoneAlt /> Call Now
              </a>
              <a href="https://wa.me/918169686040" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] rounded-full font-semibold text-sm flex items-center gap-2 transition-all">
                <FaWhatsapp className="text-base" /> WhatsApp
              </a>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-lg mx-auto lg:mx-0">
              {[
                { text: 'Home Collection', emoji: '🏠' },
                { text: 'Digital Reports', emoji: '📱' },
                { text: 'Accurate Testing', emoji: '✅' },
                { text: 'Fast Delivery', emoji: '⚡' }
              ].map((b, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <span className="text-xl block mb-1">{b.emoji}</span>
                  <span className="text-xs font-semibold text-slate-300">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SVG Illustration Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 max-w-md lg:max-w-xl w-full"
          >
            <div className="relative aspect-square w-full glass rounded-3xl p-8 flex items-center justify-center border border-white/10 shadow-glow overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-700/20 to-[#E63946]/10 opacity-30 animate-pulse-slow" />
              {/* Animated circles/floating blobs */}
              <div className="absolute w-44 h-44 rounded-full bg-primary-500/20 blur-2xl top-10 left-10 animate-float" />
              <div className="absolute w-48 h-48 rounded-full bg-[#E63946]/10 blur-2xl bottom-10 right-10 animate-float" style={{ animationDelay: '2s' }} />

              <div className="z-10 text-center space-y-6">
                <FaFlask className="text-8xl text-white mx-auto animate-bounce-slow text-primary-300" />
                <div className="space-y-2">
                  <p className="text-2xl font-bold font-display text-white">Shri Samarth Krupa</p>
                  <p className="text-slate-300 text-sm">Owner & Phlebotomist: Mr. Shailesh Dubey</p>
                  <p className="text-xs text-[#00B894] font-semibold bg-[#00B894]/20 py-1 px-3 rounded-full inline-block">ISO 9001:2015 Certified Lab</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: 8, label: 'Years Experience', suffix: '+' },
              { val: 5000, label: 'Happy Patients', suffix: '+' },
              { val: 100, label: 'Diagnostic Tests', suffix: '+' },
              { val: 99, label: 'Accurate Reports', suffix: '%' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-4xl sm:text-5xl font-extrabold text-blue-400 font-display">
                  {stat.val}{stat.suffix}
                </p>
                <p className="text-sm text-slate-400 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#00B894] mt-6 font-semibold uppercase tracking-wider">
            ✓ Home sample collection available across all areas of Kalyan
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white section-heading font-display">
              Why Choose Us
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We combine years of professional practice with state-of-the-art care to give you the most accurate results possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {[
              { title: 'Experienced Phlebotomist', desc: 'Blood drawn carefully by founder Mr. Shailesh Dubey with 8+ years experience.', icon: <FaUserMd /> },
              { title: 'Safe Blood Collection', desc: 'Strict protocols using sterile tools to ensure painless & risk-free collections.', icon: <FaHeartbeat /> },
              { title: 'Hygienic Process', desc: 'Completely sanitized lab space and equipment matching medical standards.', icon: <FaShieldAlt /> },
              { title: 'Affordable Packages', desc: 'Up to 50% discount on comprehensive packages compared to corporate labs.', icon: <FaFlask /> },
              { title: 'Fast Digital Reports', desc: 'Receive your pathology report within 4-6 hours directly on your smartphone.', icon: <FaClock /> },
              { title: 'Home Sample Collection', desc: 'Convenient sample collection from the comfort of your house in Kalyan West.', icon: <FaHome /> },
              { title: 'AI Health Report Analysis', desc: 'A custom summary that explains your parameters in simple words.', icon: <FaMicroscope /> },
              { title: 'Professional Staff', desc: 'Caring clinical assistants to guide you from registration to reports.', icon: <MdOutlineLocalHospital /> }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 interactive-hover-card text-left transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tests */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white section-heading font-display">
              Popular Diagnostic Tests
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Choose from our wide range of tests. Same-day accurate reports guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTS.map((test, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm interactive-hover-card flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="badge badge-blue text-[10px] uppercase font-bold tracking-wider">
                    {test.sample} Test
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-display leading-snug">
                    {test.name}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2">
                    <p>Fasting Required: <span className="font-semibold text-slate-700 dark:text-slate-200">{test.fasting}</span></p>
                    <p>Report Delivery: <span className="font-semibold text-slate-700 dark:text-slate-200">{test.time}</span></p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 mt-4">
                  <p className="text-xl font-bold text-primary-700 dark:text-blue-400 font-display">₹{test.price}</p>
                  <Link to="/book-appointment" className="px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-primary-700 hover:text-white transition-all">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary-700 dark:text-blue-400 font-bold hover:underline">
              View All 100+ Tests Available →
            </Link>
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white section-heading font-display">
              Affordable Health Packages
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Get complete peace of mind with our curated annual checkups and full body diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`rounded-3xl p-8 relative flex flex-col justify-between transition-all ${
                  pkg.popular 
                    ? 'bg-gradient-to-b from-primary-800 to-primary-900 text-white shadow-glow-lg scale-105 z-10' 
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white shadow-sm interactive-hover-card'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-6 bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    ⭐ Most Popular
                  </span>
                )}
                
                <div>
                  <h3 className="text-xl font-bold font-display mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-3xl font-extrabold font-display">₹{pkg.price}</span>
                    <span className={`text-xs ${pkg.popular ? 'text-slate-300' : 'text-slate-400'}`}>/ Person</span>
                  </div>
                  <hr className={`my-6 ${pkg.popular ? 'border-white/10' : 'border-slate-100 dark:border-slate-700'}`} />
                  
                  <ul className="space-y-3.5">
                    {pkg.features.map((f, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-sm">
                        <FaCheckCircle className={`mt-1 flex-shrink-0 ${pkg.popular ? 'text-[#00B894]' : 'text-primary-600 dark:text-blue-400'}`} />
                        <span className={pkg.popular ? 'text-slate-100' : 'text-slate-600 dark:text-slate-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link 
                    to="/book-appointment" 
                    className={`w-full py-3 rounded-xl font-bold text-center block text-sm transition-all ${
                      pkg.popular 
                        ? 'bg-white hover:bg-slate-100 text-primary-800 shadow-glow' 
                        : 'bg-primary-700 hover:bg-primary-800 text-white'
                    }`}
                  >
                    Book Package Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sunday Health Camp */}
      <section className="py-20 bg-gradient-to-tr from-[#0F4C81] to-[#1e3d60] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-center" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <span className="bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block animate-pulse-slow">
              🔥 Special Sunday Camp
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
              Get Diagnosed This Sunday!<br/>Health Camp Prices at Half Cost.
            </h2>
            <p className="text-slate-300">
              Shri Samarth Krupa runs a weekly camp every Sunday (7:00 AM - 2:00 PM). Enjoy massive discounts on all major diagnostic test configurations.
            </p>

            {timeLeft && (
              <div className="bg-white/10 rounded-2xl p-4 inline-block border border-white/20">
                <p className="text-xs text-slate-300 uppercase font-bold tracking-wider mb-1">Time Remaining till Camp:</p>
                <p className="text-2xl font-mono font-extrabold text-[#00B894]">{timeLeft}</p>
              </div>
            )}

            <div>
              <Link to="/book-appointment" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E63946] hover:bg-[#d52b38] rounded-full font-bold transition-all shadow-glow-red">
                <FaCalendarCheck /> Book Sunday Camp Appointment
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {[
              { name: 'Thyroid Profile', orig: 800, camp: 400 },
              { name: 'HbA1c (Sugar avg)', orig: 700, camp: 400 },
              { name: 'Lipid Profile', orig: 700, camp: 400 },
              { name: 'Vitamin B12', orig: 1200, camp: 700 },
              { name: 'Vitamin D3', orig: 1500, camp: 900 },
              { name: 'Blood Group', orig: 150, camp: 80 }
            ].map((camp, idx) => (
              <div key={idx} className="bg-white/5 border border-white/15 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                <p className="text-sm font-semibold text-slate-200">{camp.name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xs line-through text-slate-400">₹{camp.orig}</span>
                  <span className="text-lg font-bold text-[#00B894]">₹{camp.camp}</span>
                </div>
                <span className="text-[9px] bg-[#00B894]/20 text-[#00B894] font-bold px-1.5 py-0.5 rounded mt-2 inline-block">
                  Save {Math.round(((camp.orig - camp.camp) / camp.orig) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Collection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white section-heading-left font-display">
              Can't Visit the Lab?<br/>We Come to You!
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Get professional home collection services across Kalyan. Our phlebotomist maintains complete sanitation and handles collections safely at your convenience.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'Free Home Visit', desc: 'No extra collection fees for packages and booking orders above ₹500.' },
                { title: 'Safe & Hygienic Collection', desc: 'Completely sterile, single-use vacuum tube needles used for every patient.' },
                { title: 'Expert Phlebotomist Visit', desc: 'Handled directly by expert practitioners for minimal puncture irritation.' }
              ].map((benefit, idx) => (
                <li key={idx} className="flex gap-3">
                  <FaCheckCircle className="text-[#00B894] mt-1 text-lg flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-200">{benefit.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link to="/book-appointment" className="px-6 py-3 btn-primary text-sm inline-block">
                Book Home Visit Now
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-md lg:max-w-xl w-full">
            <div className="aspect-video w-full bg-primary-100 dark:bg-slate-800 rounded-3xl p-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700/5 to-slate-100 dark:to-slate-800" />
              <div className="z-10 text-center space-y-4">
                <FaHome className="text-7xl text-primary-700 dark:text-blue-400 mx-auto" />
                <p className="text-xl font-bold text-slate-800 dark:text-white font-display">Home Sample Collection</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Available in Kalyan West, Kalyan East, Khadakpada, Bail Bazar, Birla College Road, Kalyan Station Areas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white section-heading font-display">
              Google-Style Reviews
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Read feedback directly from patients who choose us for diagnostic testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {[
              { name: 'Priya Sharma', rating: 5, review: 'Excellent service! Mr. Shailesh is extremely gentle and professional. Got my reports on WhatsApp the very same evening.' },
              { name: 'Rajesh Patil', rating: 5, review: 'We requested home collection for my aged parents. The service was punctual and very hygienic. Highly recommended!' },
              { name: 'Sunita Desai', rating: 5, review: 'Mr. Shailesh Dubey has excellent hand stability. Hardly felt any pain during sample collection. Prices are also very reasonable.' }
            ].map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-card transition-all flex flex-col justify-between border border-slate-100 dark:border-slate-700">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm">"{t.review}"</p>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-700 mt-6">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Blog Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white section-heading font-display">
              Health Blog & Articles
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Read up-to-date recommendations written by clinical practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Diabetes Awareness: Fasting vs Post-Prandial Sugar Tests', category: 'Diabetes', desc: 'Learn why measuring both fasting and post-meal sugar levels offers accurate insight into management.' },
              { title: 'Cholesterol Guide: Maintaining Healthy Lipid Profile Values', category: 'Heart Health', desc: 'Understanding LDL, HDL, and triglyceride levels and how simple diet shifts improve heart markers.' },
              { title: 'Vitamin D Deficiency: The Importance of Calcium Absorption', category: 'Nutrition', desc: 'Why low Vitamin D levels could lead to chronic body ache and why active testing is necessary.' }
            ].map((blog, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-card transition-all flex flex-col justify-between">
                <div className="p-6 space-y-4">
                  <span className="badge badge-blue text-[10px]">{blog.category}</span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {blog.desc}
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Read time: 4 mins</span>
                  <Link to="/faq" className="text-xs text-primary-700 dark:text-blue-400 font-bold hover:underline">
                    Read Article →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
