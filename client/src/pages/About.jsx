import { motion } from 'framer-motion'
import { FaUserMd, FaShieldAlt, FaAward, FaBuilding, FaUsers } from 'react-icons/fa'

export default function About() {
  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">About Our Diagnostic Centre</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Shri Samarth Krupa Diagnostic Centre is a premium clinical laboratory committed to accurate pathology testing.
        </p>
      </section>

      {/* Profile & History */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Avatar placeholder */}
          <div className="flex-shrink-0 w-64 h-64 bg-gradient-to-tr from-primary-700 to-primary-800 rounded-3xl flex items-center justify-center shadow-glow text-white text-7xl font-bold">
            SD
          </div>

          <div className="space-y-6">
            <span className="badge badge-blue">Owner & Senior Phlebotomist</span>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-display">Mr. Shailesh Dubey</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Founder Mr. Shailesh Dubey created Shri Samarth Krupa Diagnostic Centre with a vision to provide Kalyan West with premium, affordable, and accurate laboratory diagnostic services.
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              With 8+ years of field experience in professional clinical blood draw, he has developed specialized pain-free extraction routines, earning trust among patients ranging from kids to senior citizens.
            </p>
            <div className="flex flex-wrap gap-3">
              {['8+ Years Experience', 'Certified Phlebotomist', 'Safe Extraction Expert', 'ISO Compliance Manager'].map((badge, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 px-4 rounded-xl">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 rounded-xl flex items-center justify-center text-2xl">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              To supply premium diagnostics services with high reliability, minimal patient wait, and maximum accessibility directly to homes across Kalyan West.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 rounded-xl flex items-center justify-center text-2xl">
              <FaAward />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">Our Vision</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              To remain Kalyan's premier independent diagnostic partner, continuously adapting digital health tools, AI reporting metrics, and painless phlebotomy mechanisms.
            </p>
          </div>
        </div>

        {/* Lab Info */}
        <div className="space-y-6 text-center max-w-3xl mx-auto pt-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-display">Modern Technology & Quality Control</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            We use calibrated chemistry analyzers, high-speed centrifuges, and premium reagents. Every test run undergoes quality control reviews before the final report is signed and pushed to the patient.
          </p>
        </div>
      </section>
    </div>
  )
}
