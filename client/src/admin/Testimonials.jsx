import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrash, FaCheck, FaTimes, FaStar } from 'react-icons/fa'

export default function Testimonials() {
  const [list, setList] = useState([
    { id: 1, name: 'Priya Sharma', rating: 5, review: 'Excellent service! Mr. Shailesh is extremely gentle and professional. Got reports same day.', status: 'Approved' },
    { id: 2, name: 'Rajesh Patil', rating: 5, review: 'We requested home collection for my parents. Very convenient and hygienic.', status: 'Approved' },
    { id: 3, name: 'Ankita Verma', rating: 4, review: 'Prompt sample collection. Painless extraction.', status: 'Pending' }
  ])

  const handleUpdateStatus = (id, status) => {
    const updated = list.map(item => {
      if (item.id === id) {
        return { ...item, status }
      }
      return item
    })
    setList(updated)
    toast.success(`Review ${status.toLowerCase()}!`)
  }

  const handleDelete = (id) => {
    setList(list.filter(item => item.id !== id))
    toast.success('Review deleted.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Patient Reviews Moderation</h1>
        <p className="text-xs text-slate-400">Approve, reject, or delete patient reviews before public rendering.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="pb-3">Reviewer</th>
                <th className="pb-3">Stars</th>
                <th className="pb-3">Review Detail</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {list.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="py-4 font-bold text-slate-800 dark:text-white">{item.name}</td>
                  <td className="py-4">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 max-w-sm truncate">"{item.review}"</td>
                  <td className="py-4 font-semibold">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                      item.status === 'Approved' ? 'bg-[#00B894]/15 text-[#00B894]' :
                      item.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                    {item.status !== 'Approved' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'Approved')} className="p-1.5 bg-[#00B894]/10 text-[#00B894] hover:bg-[#00B894] hover:text-white rounded-lg transition-all" title="Approve">
                        <FaCheck />
                      </button>
                    )}
                    {item.status !== 'Rejected' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'Rejected')} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Reject">
                        <FaTimes />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Delete">
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
