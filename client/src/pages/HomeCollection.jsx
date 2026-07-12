import { Link } from 'react-router-dom'
import { FaHome, FaCheckCircle, FaFlask, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa'

const AREAS = [
  'Kalyan West', 'Khadakpada', 'Bail Bazar', 'ST Bus Stand Area', 'Birla College Road',
  'Chikli Valley', 'Murbad Road', 'Gandhar Nagar', 'Vasant Valley', 'Syndicate'
]

export default function HomeCollection() {
  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Home Sample Collection</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Get medical laboratory testing done without leaving your home. Safe, painless, and completely hygienic.
        </p>
      </section>

      {/* Main Details */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-display">How Home Collection Works</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Our phlebotomist travels to your address in Kalyan to collect samples carefully. Simply book, set a date, and let us handle the rest.
            </p>

            <ul className="space-y-4">
              {[
                { title: '1. Book Online or Call', desc: 'Select tests/packages, date, preferred time slot, and address details.' },
                { title: '2. Professional Visit', desc: 'Certified phlebotomist arrives with sterile extraction kits at your doorstep.' },
                { title: '3. Painless Sample Draw', desc: 'Blood or urine samples collected under complete sanitary conditions.' },
                { title: '4. Digital PDF Reports', desc: 'Get accurate diagnostic reports on WhatsApp/Email within 4-6 hours.' }
              ].map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-sm">{idx + 1}</span>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-200">{step.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-700" />
              Service Areas Covered in Kalyan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We offer free home collections for all orders above ₹500 in these key regions:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {AREAS.map((a, idx) => (
                <span key={idx} className="bg-slate-50 dark:bg-slate-900 py-2.5 px-4 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-semibold border border-slate-100 dark:border-slate-800">
                  ✓ {a}
                </span>
              ))}
            </div>
            <div className="pt-4">
              <Link to="/book-appointment" className="w-full text-center py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold block text-sm transition-all shadow-glow">
                Schedule Home Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
