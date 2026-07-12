import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

export default function Tests() {
  const [tests, setTests] = useState([
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Haematology', price: 200, sample: 'Blood', fasting: 'No', time: 'Same Day' },
    { id: 2, name: 'Lipid Profile', category: 'Biochemistry', price: 350, sample: 'Blood', fasting: 'Yes (12 hrs)', time: 'Same Day' },
    { id: 3, name: 'Thyroid Profile (T3, T4, TSH)', category: 'Thyroid', price: 400, sample: 'Blood', fasting: 'No', time: 'Same Day' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Haematology')
  const [price, setPrice] = useState('')
  const [sample, setSample] = useState('Blood')
  const [fasting, setFasting] = useState('No')
  const [time, setTime] = useState('Same Day')

  const handleAddTest = (e) => {
    e.preventDefault()
    if (!name || !price) {
      toast.error('Test Name and Price are required!')
      return
    }

    const newTest = {
      id: Date.now(),
      name,
      category,
      price: parseFloat(price),
      sample,
      fasting,
      time
    }

    setTests([...tests, newTest])
    toast.success('New pathology test added to laboratory registry!')
    
    // Reset Form
    setName('')
    setPrice('')
    setShowAddForm(false)
  }

  const handleDelete = (id) => {
    setTests(tests.filter(t => t.id !== id))
    toast.success('Pathology test deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Pathology Tests Catalogue</h1>
          <p className="text-xs text-slate-400">View and update available diagnostics tests and pricing configurations.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
        >
          <FaPlus /> Add New Test
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTest} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl space-y-4 max-w-lg shadow-sm">
          <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Add New Diagnostics Test</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Test Name *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-primary" placeholder="e.g. Iron Profile" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Price (INR) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-primary" placeholder="e.g. 500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="input-primary">
                <option value="Haematology">Haematology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Thyroid">Thyroid</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Urine">Urine</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Sample Type</label>
              <select value={sample} onChange={e => setSample(e.target.value)} className="input-primary">
                <option value="Blood">Blood</option>
                <option value="Urine">Urine</option>
                <option value="Blood/Urine">Blood/Urine</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Fasting Needed</label>
              <select value={fasting} onChange={e => setFasting(e.target.value)} className="input-primary">
                <option value="No">No</option>
                <option value="Yes (8 hrs)">Yes (8 hrs)</option>
                <option value="Yes (12 hrs)">Yes (12 hrs)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Report Time</label>
              <input type="text" value={time} onChange={e => setTime(e.target.value)} className="input-primary" placeholder="e.g. Same Day" />
            </div>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">Save Test</button>
          </div>
        </form>
      )}

      {/* Tests Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="pb-3">Test Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Sample</th>
                <th className="pb-3">Fasting</th>
                <th className="pb-3">Report Time</th>
                <th className="pb-3">Price</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {tests.map((test, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 font-bold text-slate-800 dark:text-white">{test.name}</td>
                  <td className="py-3.5"><span className="badge badge-blue text-[9px]">{test.category}</span></td>
                  <td className="py-3.5 text-slate-500 font-semibold">{test.sample}</td>
                  <td className="py-3.5 text-slate-400 font-medium">{test.fasting}</td>
                  <td className="py-3.5 text-slate-400 font-medium">{test.time}</td>
                  <td className="py-3.5 font-bold text-slate-800 dark:text-white">₹{test.price}</td>
                  <td className="py-3.5 text-right space-x-2">
                    <button onClick={() => handleDelete(test.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-700" title="Delete Test">
                      <FaTrash />
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
