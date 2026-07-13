import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaSun } from 'react-icons/fa'

const STORAGE_KEY_ACTIVE = 'sunday_camp_active'
const STORAGE_KEY_OFFERS = 'sunday_camp_offers'

const DEFAULT_OFFERS = [
  { id: 1, test_name: 'Thyroid Profile', original: 800, camp: 400 },
  { id: 2, test_name: 'HbA1c (Sugar avg)', original: 700, camp: 400 },
  { id: 3, test_name: 'Lipid Profile', original: 700, camp: 400 },
  { id: 4, test_name: 'Vitamin B12', original: 1200, camp: 700 },
  { id: 5, test_name: 'Vitamin D3', original: 1500, camp: 900 },
  { id: 6, test_name: 'Blood Group', original: 150, camp: 80 },
]

export default function Offers() {
  const [campActive, setCampActive] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_ACTIVE)
    return stored === null ? true : stored === 'true'
  })

  const [offers, setOffers] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_OFFERS))
      return Array.isArray(stored) && stored.length > 0 ? stored : DEFAULT_OFFERS
    } catch { return DEFAULT_OFFERS }
  })

  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [original, setOriginal] = useState('')
  const [camp, setCamp] = useState('')

  // Persist offers to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OFFERS, JSON.stringify(offers))
  }, [offers])

  const handleToggle = () => {
    const next = !campActive
    setCampActive(next)
    localStorage.setItem(STORAGE_KEY_ACTIVE, String(next))
    toast.success(`Sunday Health Camp ${next ? '✅ Enabled' : '❌ Disabled'} on main website!`)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name || !original || !camp) { toast.error('All fields are required!'); return }
    const newOffer = { id: Date.now(), test_name: name, original: parseFloat(original), camp: parseFloat(camp) }
    setOffers(prev => [...prev, newOffer])
    toast.success('Camp offer added.')
    setName(''); setOriginal(''); setCamp(''); setShowAdd(false)
  }

  const handleDelete = (id) => {
    setOffers(prev => prev.filter(o => o.id !== id))
    toast.success('Offer deleted.')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Sunday Health Camp</h1>
          <p className="text-xs text-slate-400 mt-0.5">Toggle visibility on the main website and manage camp prices.</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all"
        >
          <FaPlus /> Add Offer
        </button>
      </div>

      {/* Status Toggle Banner */}
      <div className={`rounded-2xl p-5 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
        campActive
          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${campActive ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-600 text-slate-500'}`}>
            <FaSun />
          </div>
          <div>
            <h3 className={`font-bold text-sm ${campActive ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}`}>
              Sunday Health Camp is {campActive ? '✅ ACTIVE' : '❌ DISABLED'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {campActive
                ? 'The Sunday camp section is currently visible on the main website homepage.'
                : 'The Sunday camp section is hidden from the public homepage.'}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
            campActive
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-slate-500 hover:bg-slate-600 text-white'
          }`}
        >
          {campActive ? <><FaToggleOn className="text-lg" /> Turn OFF</> : <><FaToggleOff className="text-lg" /> Turn ON</>}
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-2xl space-y-4 max-w-lg shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-white text-sm">Add Camp Offer</h3>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Test Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              placeholder="e.g. Vitamin B12" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Original Price (₹) *</label>
              <input type="number" value={original} onChange={e => setOriginal(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                placeholder="1200" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Camp Price (₹) *</label>
              <input type="number" value={camp} onChange={e => setCamp(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                placeholder="700" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowAdd(false)}
              className="flex-1 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-xs">
              Save Offer
            </button>
          </div>
        </form>
      )}

      {/* Offers Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700">
          {offers.map((offer) => (
            <div key={offer.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800 dark:text-white text-sm">{offer.test_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs line-through text-slate-400">₹{offer.original}</span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">₹{offer.camp}</span>
                  <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded-full">
                    Save {Math.round(((offer.original - offer.camp) / offer.original) * 100)}%
                  </span>
                </div>
              </div>
              <button onClick={() => handleDelete(offer.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-700">
                {['Test Name', 'Original Price', 'Camp Price', 'Savings', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/20">
                  <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white">{offer.test_name}</td>
                  <td className="px-5 py-3.5 text-slate-400 line-through">₹{offer.original}</td>
                  <td className="px-5 py-3.5 font-bold text-primary-600 dark:text-primary-400">₹{offer.camp}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                      Save {Math.round(((offer.original - offer.camp) / offer.original) * 100)}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => handleDelete(offer.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                      <FaTrash className="text-xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
