import { useState } from 'react'
import { FaHeartbeat, FaFlask, FaUserMd, FaHospital } from 'react-icons/fa'

const GALLERY_ITEMS = [
  { category: 'Laboratory', title: 'Clinical Hematology Analyzer', desc: 'Fully calibrated state-of-the-art automated blood screening equipment.', icon: <FaFlask />, bg: 'from-blue-600 to-sky-700' },
  { category: 'Equipment', title: 'High Speed Centrifuge', desc: 'Used for separating plasma components under high sanitization guidelines.', icon: <FaFlask />, bg: 'from-indigo-600 to-purple-700' },
  { category: 'Reception', title: 'Patient Waiting Area', desc: 'Clean, sanitized waiting lounge designed to provide comfort.', icon: <FaHospital />, bg: 'from-rose-600 to-pink-700' },
  { category: 'Staff', title: 'Blood Extraction Process', desc: 'founder Mr. Shailesh Dubey executing painless sample collection.', icon: <FaUserMd />, bg: 'from-emerald-600 to-teal-700' },
  { category: 'Laboratory', title: 'Biochemistry Testing Kits', desc: 'Certified reagents used for blood sugar, kidney, and liver analysis.', icon: <FaHeartbeat />, bg: 'from-amber-600 to-orange-700' },
  { category: 'Staff', title: 'Diagnostic Documentation', desc: 'Entering and verifying pathology results into our digital report servers.', icon: <FaUserMd />, bg: 'from-cyan-600 to-blue-700' }
]

const CATEGORIES = ['All', 'Laboratory', 'Equipment', 'Staff', 'Reception']

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState('All')

  const filteredItems = GALLERY_ITEMS.filter(item => selectedCat === 'All' || item.category === selectedCat)

  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Lab Gallery</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Take a look inside our clean room setup, state-of-the-art biochemistry equipment, and patient registration lounge.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedCat === cat 
                  ? 'bg-primary-700 text-white shadow-glow' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-1.5 transition-all">
              {/* Premium color banner representing image placeholder */}
              <div className={`h-48 bg-gradient-to-tr ${item.bg} flex items-center justify-center text-white relative`}>
                <div className="text-5xl text-white/80 animate-float">{item.icon}</div>
                <span className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                  {item.category}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display leading-tight">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
