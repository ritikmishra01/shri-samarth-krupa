import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaSearch, FaSync } from 'react-icons/fa'
import { apiService } from '../services/api'

const statusStyle = (s) => {
  const v = s?.toLowerCase()
  return v === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
         v === 'confirmed' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
         v === 'cancelled' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                             'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  const loadAppointments = async () => {
    setLoading(true)
    try {
      // Try real API
      const res = await apiService.appointments.getAll()
      const data = res.data?.data || []
      // Normalize API fields to match display fields
      const normalized = data.map(a => ({
        booking_id: `SKD-${String(a.id).padStart(7, '0')}`,
        id: a.id,
        name: a.patient_name,
        phone: a.mobile,
        gender: a.gender || '-',
        age: a.age || '-',
        tests: a.test_name || a.package_name || '-',
        preferred_date: a.preferred_date,
        preferred_time: a.preferred_time || '-',
        is_home_collection: a.home_collection === 1 || a.home_collection === true,
        total_price: a.total_price || '-',
        status: a.status?.charAt(0).toUpperCase() + a.status?.slice(1) || 'Pending',
      }))
      setAppointments(normalized)
      setIsLive(true)
    } catch {
      // Fallback: localStorage
      try {
        const list = JSON.parse(localStorage.getItem('appointments') || '[]')
        setAppointments(Array.isArray(list) ? list : [])
      } catch { setAppointments([]) }
      setIsLive(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAppointments() }, [])

  const handleUpdateStatus = async (item, status) => {
    if (isLive && item.id) {
      try {
        await apiService.appointments.update(item.id, { ...item, status: status.toLowerCase() })
        toast.success(`Status updated to ${status}!`)
        loadAppointments()
        return
      } catch {}
    }
    // localStorage fallback
    const updated = appointments.map(a =>
      a.booking_id === item.booking_id ? { ...a, status } : a
    )
    setAppointments(updated)
    localStorage.setItem('appointments', JSON.stringify(updated))
    toast.success(`Status updated to ${status}!`)
  }

  const handleDelete = async (item) => {
    if (!window.confirm('Delete this appointment?')) return
    if (isLive && item.id) {
      try {
        await apiService.appointments.delete(item.id)
        toast.success('Appointment deleted.')
        loadAppointments()
        return
      } catch {}
    }
    const filtered = appointments.filter(a => a.booking_id !== item.booking_id)
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
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-slate-400">{appointments.length} total bookings</p>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {isLive ? '🟢 Live MySQL' : '🟡 Demo Mode'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadAppointments} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all" title="Refresh">
            <FaSync className={`text-xs ${loading ? 'animate-spin' : ''}`} />
          </button>
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
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading appointments from MySQL...</p>
        </div>
      )}

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
                  <button onClick={() => handleUpdateStatus(item, 'Confirmed')}
                    className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-all">
                    ✓ Confirm
                  </button>
                )}
                {item.status === 'Confirmed' && (
                  <button onClick={() => handleUpdateStatus(item, 'Completed')}
                    className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
                    ✓ Complete
                  </button>
                )}
                {item.status !== 'Cancelled' && item.status !== 'Completed' && (
                  <button onClick={() => handleUpdateStatus(item, 'Cancelled')}
                    className="flex-1 py-1.5 text-[11px] font-bold rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all">
                    ✕ Cancel
                  </button>
                )}
                <button onClick={() => handleDelete(item)}
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
                        <button onClick={() => handleUpdateStatus(item, 'Confirmed')}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all" title="Confirm">
                          <FaCheck />
                        </button>
                      )}
                      {item.status === 'Confirmed' && (
                        <button onClick={() => handleUpdateStatus(item, 'Completed')}
                          className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all" title="Complete">
                          <FaCheck />
                        </button>
                      )}
                      {item.status !== 'Cancelled' && item.status !== 'Completed' && (
                        <button onClick={() => handleUpdateStatus(item, 'Cancelled')}
                          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Cancel">
                          <FaTimes />
                        </button>
                      )}
                      <button onClick={() => handleDelete(item)}
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
