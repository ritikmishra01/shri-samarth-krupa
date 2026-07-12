import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa'

export default function Packages() {
  const [packages, setPackages] = useState([
    { id: 1, name: 'Fit India Package 1.1', price: 1300, tests: 'CBC, Lipid Profile, Thyroid Profile, Liver Function, Kidney Function, Urine Examination, Blood Sugar', popular: false },
    { id: 2, name: 'Fit India Package 1.2', price: 1700, tests: 'CBC, Lipid Profile, Thyroid Profile, Liver Function, Kidney Function, Urine Examination, Blood Sugar, HbA1c', popular: false },
    { id: 3, name: 'Fit India Package 1.3', price: 3000, tests: 'Everything in Package 1.2 + Iron Profile + Vitamin B12 + Vitamin D', popular: true }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [testsText, setTestsText] = useState('')
  const [popular, setPopular] = useState(false)

  const handleAddPackage = (e) => {
    e.preventDefault()
    if (!name || !price) {
      toast.error('Package Name and Price are required!')
      return
    }

    const newPkg = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      tests: testsText,
      popular
    }

    setPackages([...packages, newPkg])
    toast.success('Package added successfully!')
    setName('')
    setPrice('')
    setTestsText('')
    setPopular(false)
    setShowAddForm(false)
  }

  const handleDelete = (id) => {
    setPackages(packages.filter(p => p.id !== id))
    toast.success('Package deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Health Packages Management</h1>
          <p className="text-xs text-slate-400">Add, edit, or delete bundle test packages.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
        >
          <FaPlus /> Add Package
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddPackage} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl space-y-4 max-w-lg shadow-sm">
          <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Add Health Package</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Package Name *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-primary" placeholder="e.g. Fit India 1.4" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Price (INR) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-primary" placeholder="e.g. 2500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Included Tests (comma separated list) *</label>
            <textarea value={testsText} onChange={e => setTestsText(e.target.value)} className="input-primary min-h-[80px]" placeholder="CBC, Lipid, Thyroid, HbA1c, Liver, Kidney" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={popular} onChange={e => setPopular(e.target.checked)} id="popular" className="rounded border-slate-300 text-primary-700 focus:ring-primary-700" />
            <label htmlFor="popular" className="text-xs font-bold text-slate-500 cursor-pointer">Mark as Most Popular</label>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">Save Package</button>
          </div>
        </form>
      )}

      {/* Packages List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative">
            {pkg.popular && (
              <span className="absolute top-4 right-4 bg-[#E63946] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">Popular</span>
            )}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-800 dark:text-white font-display leading-tight">{pkg.name}</h3>
              <p className="text-xl font-extrabold text-primary-700 dark:text-blue-400 font-display">₹{pkg.price}</p>
              <hr className="border-slate-100 dark:border-slate-700 my-3" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{pkg.tests}</p>
            </div>

            <div className="pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Package ID: #{pkg.id.toString().substr(-4)}</span>
              <button onClick={() => handleDelete(pkg.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                <FaTrash className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
