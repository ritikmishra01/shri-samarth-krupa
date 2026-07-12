import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaFilter, FaFlask, FaVial, FaFileMedical, FaClock } from 'react-icons/fa'

const TESTS = [
  { name: 'CBC (Complete Blood Count)', price: 200, sample: 'Blood', fasting: 'No', time: 'Same Day', category: 'Haematology', desc: 'Checks hemoglobin, red cells, white cells and platelets.' },
  { name: 'Lipid Profile', price: 350, sample: 'Blood', fasting: 'Yes (12 hrs)', time: 'Same Day', category: 'Biochemistry', desc: 'Checks total cholesterol, HDL, LDL, and triglycerides.' },
  { name: 'Thyroid Profile (T3, T4, TSH)', price: 400, sample: 'Blood', fasting: 'No', time: 'Same Day', category: 'Thyroid', desc: 'Helps diagnose hyperthyroidism or hypothyroidism.' },
  { name: 'Liver Function Test (LFT)', price: 500, sample: 'Blood', fasting: 'Yes (8 hrs)', time: 'Same Day', category: 'Biochemistry', desc: 'Measures bilirubin, SGOT, SGPT, and albumin levels.' },
  { name: 'Kidney Function Test (KFT)', price: 500, sample: 'Blood', fasting: 'No', time: 'Same Day', category: 'Biochemistry', desc: 'Measures urea, creatinine, and uric acid.' },
  { name: 'HbA1c', price: 400, sample: 'Blood', fasting: 'No', time: 'Same Day', category: 'Biochemistry', desc: 'Measures average blood sugar levels over 3 months.' },
  { name: 'Blood Sugar (Fasting)', price: 80, sample: 'Blood', fasting: 'Yes (8 hrs)', time: '2 hours', category: 'Biochemistry', desc: 'Fasting blood glucose monitoring.' },
  { name: 'Iron Profile', price: 600, sample: 'Blood', fasting: 'No', time: 'Next Day', category: 'Biochemistry', desc: 'Checks total iron, ferritin, and iron binding capacity.' },
  { name: 'Vitamin B12', price: 700, sample: 'Blood', fasting: 'No', time: 'Same Day', category: 'Vitamins', desc: 'Helps diagnose anemia or nerve deficiencies.' },
  { name: 'Vitamin D (25-Hydroxy)', price: 900, sample: 'Blood', fasting: 'No', time: 'Next Day', category: 'Vitamins', desc: 'Checks total Vitamin D levels for bone safety.' },
  { name: 'Urine Routine Examination', price: 100, sample: 'Urine', fasting: 'No', time: 'Same Day', category: 'Urine', desc: 'Screening for kidney infection, UTI, or sugar leaks.' },
  { name: 'Pregnancy Test (Beta HCG)', price: 150, sample: 'Blood/Urine', fasting: 'No', time: '30 mins', category: 'Biochemistry', desc: 'Confirms pregnancy status with high sensitivity.' },
]

const CATEGORIES = ['All', 'Haematology', 'Biochemistry', 'Thyroid', 'Vitamins', 'Urine']

export default function Services() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTests = TESTS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Diagnostic & Pathology Tests</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Explore our wide range of diagnostic services. Search and filter tests to suit your prescription.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tests..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-primary-700"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="badge badge-blue text-[9px] uppercase font-extrabold tracking-wider">{test.category}</span>
                  <span className="badge badge-blue text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-500">{test.sample}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display leading-tight">{test.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{test.desc}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <FaFlask className="text-primary-700" />
                    <span>Fast: {test.fasting}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-primary-700" />
                    <span>{test.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4 mt-6">
                <p className="text-xl font-bold text-primary-700 dark:text-blue-400 font-display">₹{test.price}</p>
                <Link to="/book-appointment" className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold transition-all">
                  Book Test
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <p className="text-center text-slate-500 py-12">No tests matches your search. Please check your spelling or try another term.</p>
        )}
      </section>
    </div>
  )
}
