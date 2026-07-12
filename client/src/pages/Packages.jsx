import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaStar, FaClock, FaHeartbeat } from 'react-icons/fa'

const CAMP_OFFERS = [
  { name: 'Thyroid Profile', original: 800, camp: 400 },
  { name: 'HbA1c (Sugar avg)', original: 700, camp: 400 },
  { name: 'Lipid Profile', original: 700, camp: 400 },
  { name: 'Vitamin B12', original: 1200, camp: 700 },
  { name: 'Vitamin D3', original: 1500, camp: 900 },
  { name: 'Blood Group', original: 150, camp: 80 }
]

const PACKAGES = [
  {
    name: 'Fit India Package 1.1',
    price: 1300,
    features: ['CBC (Complete Blood Count)', 'Lipid Profile (Cholesterol)', 'Thyroid Profile (T3,T4,TSH)', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Urine Routine Examination', 'Blood Sugar (Fasting)'],
    popular: false,
    desc: 'Recommended for basic health screening'
  },
  {
    name: 'Fit India Package 1.2',
    price: 1700,
    features: ['CBC (Complete Blood Count)', 'Lipid Profile (Cholesterol)', 'Thyroid Profile (T3,T4,TSH)', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Urine Routine Examination', 'Blood Sugar (Fasting)', 'HbA1c (Average Sugar)'],
    popular: false,
    desc: 'Recommended for diabetic monitoring'
  },
  {
    name: 'Fit India Package 1.3',
    price: 3000,
    features: ['Everything in Package 1.2', 'Iron Profile (Iron/TIBC)', 'Vitamin B12 level', 'Vitamin D (25-Hydroxy)'],
    popular: true,
    desc: 'Complete full body checkup for all ages'
  }
]

export default function Packages() {
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
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Health Screening Packages</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Choose from our carefully structured packages designed for complete preventative healthcare.
        </p>
      </section>

      {/* Packages Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`rounded-3xl p-8 relative flex flex-col justify-between transition-all ${
                pkg.popular 
                  ? 'bg-gradient-to-b from-primary-800 to-primary-900 text-white shadow-glow-lg scale-105 z-10' 
                  : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white shadow-sm'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 right-6 bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  ⭐ Most Popular
                </span>
              )}
              
              <div>
                <h3 className="text-xl font-bold font-display mb-1">{pkg.name}</h3>
                <p className={`text-xs ${pkg.popular ? 'text-slate-300' : 'text-slate-400'} mb-4`}>{pkg.desc}</p>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-extrabold font-display">₹{pkg.price}</span>
                  <span className={`text-xs ${pkg.popular ? 'text-slate-300' : 'text-slate-400'}`}>/ Person</span>
                </div>
                <hr className={`my-6 ${pkg.popular ? 'border-white/10' : 'border-slate-100 dark:border-slate-700'}`} />
                
                <ul className="space-y-3">
                  {pkg.features.map((f, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5 text-sm">
                      <FaCheckCircle className={`mt-1 flex-shrink-0 ${pkg.popular ? 'text-[#00B894]' : 'text-primary-700'}`} />
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

        {/* Camp Banner */}
        <div className="bg-gradient-to-tr from-[#0F4C81] to-[#1a64b0] text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left">
            <span className="bg-[#E63946] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">
              Sunday Camp Offers
            </span>
            <h2 className="text-2xl font-bold font-display">Discounted Sunday camp prices starting at just ₹80!</h2>
            <p className="text-slate-200 text-xs">Available every Sunday 7:00 AM - 2:00 PM. Book in advance to avoid long waiting lines.</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            {timeLeft && (
              <div className="text-center font-mono text-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Starts in:</p>
                <p className="text-lg font-bold text-[#00B894]">{timeLeft}</p>
              </div>
            )}
            <Link to="/book-appointment" className="px-6 py-3 bg-[#E63946] hover:bg-[#d52b38] rounded-xl font-bold text-sm text-center shadow-glow">
              Book Camp Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
