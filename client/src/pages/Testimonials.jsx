import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaStar, FaQuoteLeft, FaPlus } from 'react-icons/fa'

const INITIAL_TESTIMONIALS = [
  { name: 'Priya Sharma', rating: 5, review: 'Excellent service! Mr. Shailesh is extremely gentle and professional. Got my reports on WhatsApp the very same evening.', date: '2026-07-01' },
  { name: 'Rajesh Patil', rating: 5, review: 'We requested home collection for my aged parents. The service was punctual and very hygienic. Highly recommended!', date: '2026-06-28' },
  { name: 'Sunita Desai', rating: 5, review: 'Mr. Shailesh Dubey has excellent hand stability. Hardly felt any pain during sample collection. Prices are also very reasonable.', date: '2026-06-25' },
  { name: 'Amit Kumar', rating: 5, review: 'Best diagnostic centre in Kalyan. Accurate reports, friendly staff and affordable pricing. Highly satisfied.', date: '2026-06-20' },
  { name: 'Meera Joshi', rating: 5, review: 'Sunday health camp was amazing! Got all tests done at special prices. Very happy with service.', date: '2026-06-18' },
  { name: 'Vikram Singh', rating: 5, review: 'Home collection was very convenient. Professional staff, hygienic process. Digital reports are great!', date: '2026-06-15' }
]

export default function Testimonials() {
  const [list, setList] = useState(INITIAL_TESTIMONIALS)
  const [showAddForm, setShowAddForm] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    const newTestimonial = {
      name: data.name,
      rating: parseInt(data.rating),
      review: data.review,
      date: new Date().toISOString().split('T')[0]
    }
    
    setList([newTestimonial, ...list])
    toast.success('Thank you for sharing your experience! It will display after clinical evaluation.')
    reset()
    setShowAddForm(false)
  }

  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Patient Testimonials</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Read direct feedback shared by patients who trust Shri Samarth Krupa Diagnostic Centre for their pathology reviews.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-display">Patient Reviews ({list.length})</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
          >
            <FaPlus /> Write a Review
          </button>
        </div>

        {/* Add Review Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl space-y-4 max-w-md mx-auto shadow-glow">
            <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Share Your Review</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Name *</label>
              <input 
                type="text" 
                {...register('name', { required: 'Name is required' })}
                className="input-primary" 
                placeholder="e.g. Priya Sharma"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Rating *</label>
              <select {...register('rating')} className="input-primary">
                <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                <option value="4">⭐⭐⭐⭐ (Good)</option>
                <option value="3">⭐⭐⭐ (Average)</option>
                <option value="2">⭐⭐ (Fair)</option>
                <option value="1">⭐ (Poor)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Your Review *</label>
              <textarea 
                {...register('review', { required: 'Review details are required' })}
                className="input-primary min-h-[80px]" 
                placeholder="How was your sample collection experience?"
              />
              {errors.review && <p className="text-red-500 text-xs">{errors.review.message}</p>}
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{t.date}</span>
                </div>
                <div className="relative">
                  <FaQuoteLeft className="text-slate-100 dark:text-slate-700/50 text-4xl absolute -top-2 -left-2 z-0" />
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm relative z-10 pl-4">"{t.review}"</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-50 dark:border-slate-700 mt-8">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">Verified Reviewer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
