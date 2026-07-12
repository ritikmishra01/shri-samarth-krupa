import { useState } from 'react'
import { FaChevronDown, FaSearch } from 'react-icons/fa'

const FAQS = [
  { q: 'Is fasting required for all blood tests?', a: 'No, only certain tests like fasting blood sugar, lipid profile, and liver function tests require 8-12 hours of overnight fasting. For other tests like CBC, Thyroid Profile, or Vitamins, you can eat normally before sample collection.', cat: 'Preparation' },
  { q: 'How long does it take to get my reports?', a: 'Most reports are processed and shared within 4 to 6 hours on the same day. Vitamin tests, iron profiles, and certain culture tests may take up to 24 to 48 hours.', cat: 'Reports' },
  { q: 'How do I request a home sample collection?', a: 'You can book a home sample collection directly through our Book Test page or by calling us at 8169686040. Our phlebotomist Mr. Shailesh Dubey will visit your home at your scheduled time.', cat: 'Services' },
  { q: 'How can I download my digital reports online?', a: 'Visit the Download Report page, enter the unique Patient ID (e.g. SKD-2026001) printed on your payment receipt, along with your registered mobile number, to view and download reports instantly.', cat: 'Reports' },
  { q: 'Is the home sample collection service free?', a: 'Home sample collection is completely free across Kalyan West for all total bookings above ₹500. For values below ₹500, a nominal visit fee of ₹50 is applicable.', cat: 'Services' },
  { q: 'What quality certifications does the lab have?', a: 'Shri Samarth Krupa Diagnostic Centre operates under strict clinical hygiene rules and uses premium, calibrated equipment. All test reports undergo evaluation before signoff.', cat: 'Quality' }
]

export default function FAQ() {
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx)
  }

  const filteredFAQs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(search.toLowerCase()) || 
    faq.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Frequently Asked Questions</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Need details about test preparation, report delivery times, or home visit bookings? Find answers here.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search questions or terms..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-primary-700"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-800 dark:text-white font-display text-sm sm:text-base gap-4"
              >
                <span>{faq.q}</span>
                <FaChevronDown className={`text-xs text-primary-700 transition-transform ${activeIndex === idx ? 'rotate-180' : ''}`} />
              </button>

              {activeIndex === idx && (
                <div className="px-6 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-50 dark:border-slate-700">
                  <p>{faq.a}</p>
                  <span className="badge badge-blue text-[8px] mt-3 inline-block">{faq.cat}</span>
                </div>
              )}
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <p className="text-center text-slate-500 py-12">No questions found matching your search. Please check your query or contact us directly.</p>
          )}
        </div>
      </section>
    </div>
  )
}
