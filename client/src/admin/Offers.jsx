import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa'

export default function Offers() {
  const [campActive, setCampActive] = useState(true)
  const [offers, setOffers] = useState([
    { id: 1, test_name: 'Thyroid Profile', original: 800, camp: 400 },
    { id: 2, test_name: 'HbA1c (Sugar avg)', original: 700, camp: 400 },
    { id: 3, test_name: 'Lipid Profile', original: 700, camp: 400 }
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [original, setOriginal] = useState('')
  const [camp, setCamp] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name || !original || !camp) {
      toast.error('All details are required!')
      return
    }

    const newOffer = {
      id: Date.now(),
      test_name: name,
      original: parseFloat(original),
      camp: parseFloat(camp)
    }

    setOffers([...offers, newOffer])
    toast.success('Camp offer added.')
    setName('')
    setOriginal('')
    setCamp('')
    setShowAdd(false)
  }

  const handleDelete = (id) => {
    setOffers(offers.filter(o => o.id !== id))
    toast.success('Offer deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Sunday Health Camp Management</h1>
          <p className="text-xs text-slate-400">Configure prices and enable/disable Sunday campaign discounts.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
        >
          <FaPlus /> Add Offer
        </button>
      </div>

      {/* Campaign Toggle Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-3xl flex items-center justify-between shadow-sm">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Sunday Health Camp Status</h3>
          <p className="text-xs text-slate-400">Toggle whether camp promotion banner is displayed publicly on the home page.</p>
        </div>

        <button 
          onClick={() => {
            setCampActive(!campActive)
            toast.success(`Sunday health camp status turned ${!campActive ? 'ON' : 'OFF'}!`)
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            campActive ? 'bg-[#00B894] text-white shadow-glow-green' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200'
          }`}
        >
          {campActive ? (
            <>
              <FaToggleOn className="text-lg" />
              <span>Campaign Active</span>
            </>
          ) : (
            <>
              <FaToggleOff className="text-lg" />
              <span>Campaign Disabled</span>
            </>
          )}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl space-y-4 max-w-lg shadow-sm">
          <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Add Sunday Camp Offer</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Test Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-primary" placeholder="e.g. Vitamin B12" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Original Price *</label>
              <input type="number" value={original} onChange={e => setOriginal(e.target.value)} className="input-primary" placeholder="1200" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Camp Discounted Price *</label>
              <input type="number" value={camp} onChange={e => setCamp(e.target.value)} className="input-primary" placeholder="700" />
            </div>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">Save Offer</button>
          </div>
        </form>
      )}

      {/* Offers Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="pb-3">Pathology Test</th>
                <th className="pb-3">Original Price</th>
                <th className="pb-3">Sunday Camp Price</th>
                <th className="pb-3">Discount Margin</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {offers.map((offer, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 font-bold text-slate-800 dark:text-white">{offer.test_name}</td>
                  <td className="py-3.5 text-slate-400 line-through font-semibold">₹{offer.original}</td>
                  <td className="py-3.5 text-primary-700 dark:text-blue-400 font-bold text-sm">₹{offer.camp}</td>
                  <td className="py-3.5">
                    <span className="badge badge-green text-[10px] uppercase font-bold">
                      Save {Math.round(((offer.original - offer.camp) / offer.original) * 100)}%
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button onClick={() => handleDelete(offer.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
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
