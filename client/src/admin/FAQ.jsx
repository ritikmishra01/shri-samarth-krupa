import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaTrash } from 'react-icons/fa'

export default function FAQ() {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'Is fasting required for all blood tests?', answer: 'No, only certain tests like fasting blood sugar, lipid profile require overnight fasting.', category: 'Preparation' },
    { id: 2, question: 'How long does it take to get reports?', answer: 'Most reports are processed same day within 4-6 hours.', category: 'Reports' }
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [category, setCategory] = useState('Preparation')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!question || !answer) {
      toast.error('Question and Answer are required!')
      return
    }

    const newFaq = {
      id: Date.now(),
      question,
      answer,
      category
    }

    setFaqs([...faqs, newFaq])
    toast.success('FAQ item added successfully!')
    setQuestion('')
    setAnswer('')
    setShowAdd(false)
  }

  const handleDelete = (id) => {
    setFaqs(faqs.filter(f => f.id !== id))
    toast.success('FAQ deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">FAQs Management</h1>
          <p className="text-xs text-slate-400">Manage patient informative accordions.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
        >
          <FaPlus /> Add FAQ
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl space-y-4 max-w-lg shadow-sm">
          <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Add FAQ</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Question *</label>
            <input type="text" value={question} onChange={e => setQuestion(e.target.value)} className="input-primary" placeholder="e.g. Can I drink water before fasting sugar test?" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Answer *</label>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} className="input-primary min-h-[80px]" placeholder="Yes, plain water is allowed but coffee, tea or juice are prohibited." />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="input-primary">
              <option value="Preparation">Preparation</option>
              <option value="Reports">Reports</option>
              <option value="Services">Services</option>
              <option value="Quality">Quality</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">Save FAQ</button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-4 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-start justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="badge badge-blue text-[9px] uppercase font-bold">{faq.category}</span>
              <h4 className="font-bold text-slate-800 dark:text-white font-display text-sm leading-tight pt-1">{faq.question}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{faq.answer}</p>
            </div>
            <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-700 flex-shrink-0">
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
