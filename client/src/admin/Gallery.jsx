import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa'

export default function Gallery() {
  const [items, setItems] = useState([
    { id: 1, title: 'Hematology Analyzer', category: 'Laboratory', bg: 'from-blue-600 to-sky-700' },
    { id: 2, title: 'Centrifuge Equipment', category: 'Equipment', bg: 'from-indigo-600 to-purple-700' },
    { id: 3, title: 'Sanitized Waiting Lounge', category: 'Reception', bg: 'from-pink-600 to-rose-700' }
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Laboratory')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title) {
      toast.error('Title is required!')
      return
    }

    const gradients = ['from-teal-600 to-emerald-700', 'from-amber-600 to-orange-700', 'from-cyan-600 to-blue-700']
    const bg = gradients[Math.floor(Math.random() * gradients.length)]

    const newItem = {
      id: Date.now(),
      title,
      category,
      bg
    }

    setItems([...items, newItem])
    toast.success('Gallery item added.')
    setTitle('')
    setShowAdd(false)
  }

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id))
    toast.success('Gallery item deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Gallery Management</h1>
          <p className="text-xs text-slate-400">Add or remove clinical environment photographs.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
        >
          <FaPlus /> Add Image
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl space-y-4 max-w-md shadow-sm">
          <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Add Gallery Image</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Image Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-primary" placeholder="e.g. Lab Biochemistry Bench" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="input-primary">
              <option value="Laboratory">Laboratory</option>
              <option value="Equipment">Equipment</option>
              <option value="Staff">Staff</option>
              <option value="Reception">Reception</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">Save Image</button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className={`h-40 bg-gradient-to-tr ${item.bg} flex items-center justify-center text-white text-5xl relative`}>
              <FaImage className="opacity-80" />
              <span className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">{item.category}</span>
            </div>
            <div className="p-5 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm leading-tight truncate">{item.title}</h3>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                <FaTrash className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
