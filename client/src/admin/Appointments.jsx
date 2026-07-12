import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaSearch } from 'react-icons/fa'

const statusStyle = (s) =>
  s === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
  s === 'Confirmed'  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
  s === 'Cancelled'  ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                       'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    let list = []
    try {
      list = JSON.parse(localStorage.getItem('appointments') || '[]')
      if (!Array.isArray(list)) list = []
    } catch (e) { list = [] }
    setAppointments(list)
  }, [])

  const handleUpdateStatus = (id, status) => {
    const updated = appointments.map(item =>
      item.booking_id === id ? { ...item, status } : item
    )
    setAppointments(updated)
    localStorage.setItem('appointments', JSON.stringify(updated))
    toast.success(`Status updated to ${status}!`)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this appointment?')) return
    const filtered = appointments.filter(item => item.booking_id !== id)
    setAppointments(filtered)
    localStorage.setItem('appointments', JSON.stringify(filtered))
    toast.success('Appointment deleted.')
  }

  const filtered = appointments.filter(item =>
    !search ||
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.booking_id?.toLowerCase().includes(search.toLowerCase()) ||
    item.phone?.includes(search)
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-800 dark:text-white">Appointments</h1>
          <p className="text-xs text-slate-400 mt-0.5">{appointments.length} total bookings</p>
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, ID, phone..."
            className="w-full pl-8 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-10 text-center">
          <FaCalendarAlt className="text-4xl text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {search ? 'No matching appointments found' : 'No appointments yet'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {search ? 'Try a different search term' : 'Bookings from the public website will appear here'}
          </p>
        </div>
      )}

      {/* Mobile: Cards */}
      {filtered.length > 0 && (
        <div className="md:hidden space-y-3">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 space-y-3 shadow-sm">
              {/* Top row: ID + status */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded">
                  {item.booking_id}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* Patient info */}
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">{item.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.gender} · {item.age} yrs · 📞 {item.phone}</p>
              </div>

              {/* Test + collection */}
              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300 truncate">{item.tests}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${item.is_home_collection ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.is_home_collection ? '🏠 Home' : '🏥 Lab'}
                  </span>
                  <span className="text-slate-400">📅 {item.preferred_date} {item.preferred_time}</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">₹{item.total_price}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-700">
                {item.status === 'Pending' && (
                  <button onClick={() => handleUpdateStatus(item.booking_id, 'Confirmed')}
                    className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-all">
                    ✓ Confirm
                  </button>
                )}
                {item.status === 'Confirmed' && (
                  <button onClick={() => handleUpdateStatus(item.booking_id, 'Completed')}
                    className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
                    ✓ Complete
                  </button>
                )}
                {item.status !== 'Cancelled' && item.status !== 'Completed' && (
                  <button onClick={() => handleUpdateStatus(item.booking_id, 'Cancelled')}
                    className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all">
                    ✕ Cancel
                  </button>
                )}
                <button onClick={() => handleDelete(item.booking_id)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-500 hover:text-white transition-all">
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop: Table */}
      {filtered.length > 0 && (
        <div className="hidden md:block bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase bg-slate-50 dark:bg-slate-900/30">
                  <th className="px-5 py-3">Booking ID</th>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Tests</th>
                  <th className="px-5 py-3">Schedule</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                    <td className="px-5 py-3.5 font-bold text-slate-700 dark:text-slate-200 font-mono">{item.booking_id}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-slate-800 dark:text-white">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.gender}, {item.age} yrs · {item.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-600 dark:text-slate-300 max-w-[160px] truncate">{item.tests}</td>
                    <td className="px-5 py-3.5 text-slate-500">
                      <p>{item.preferred_date}</p>
                      <p className="text-[10px] text-slate-400">{item.preferred_time}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${item.is_home_collection ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {item.is_home_collection ? '🏠 Home' : '🏥 Lab'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-800 dark:text-white">₹{item.total_price}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${statusStyle(item.status)}`}>{item.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                      {item.status === 'Pending' && (
                        <button onClick={() => handleUpdateStatus(item.booking_id, 'Confirmed')}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all" title="Confirm">
                          <FaCheck />
                        </button>
                      )}
                      {item.status === 'Confirmed' && (
                        <button onClick={() => handleUpdateStatus(item.booking_id, 'Completed')}
                          className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all" title="Complete">
                          <FaCheck />
                        </button>
                      )}
                      {item.status !== 'Cancelled' && item.status !== 'Completed' && (
                        <button onClick={() => handleUpdateStatus(item.booking_id, 'Cancelled')}
                          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Cancel">
                          <FaTimes />
                        </button>
                      )}
                      <button onClick={() => handleDelete(item.booking_id)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
