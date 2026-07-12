import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaTrash, FaCheck, FaTimes, FaCalendarAlt } from 'react-icons/fa'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    let list = []
    try {
      list = JSON.parse(localStorage.getItem('appointments') || '[]')
      if (!Array.isArray(list)) list = []
    } catch (e) {
      list = []
    }
    setAppointments(list)
  }, [])

  const handleUpdateStatus = (id, status) => {
    const updated = appointments.map(item => {
      if (item.booking_id === id) {
        return { ...item, status }
      }
      return item
    })
    setAppointments(updated)
    localStorage.setItem('appointments', JSON.stringify(updated))
    toast.success(`Booking status updated to ${status}!`)
  }

  const handleDelete = (id) => {
    const filtered = appointments.filter(item => item.booking_id !== id)
    setAppointments(filtered)
    localStorage.setItem('appointments', JSON.stringify(filtered))
    toast.success('Appointment deleted.')
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Appointments Management</h1>
        <p className="text-xs text-slate-400">Manage, confirm, reschedule, or cancel patient appointments.</p>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Patient Details</th>
                <th className="pb-3">Tests/Packages</th>
                <th className="pb-3">Schedule</th>
                <th className="pb-3">Collection</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400 font-semibold">
                    No appointments booked yet. Book one on the public website to see it here!
                  </td>
                </tr>
              ) : (
                appointments.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                    <td className="py-4 font-bold text-slate-700 dark:text-slate-200 font-mono">{item.booking_id}</td>
                    <td className="py-4">
                      <p className="font-bold text-slate-800 dark:text-white">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.gender}, {item.age} yrs · {item.phone}</p>
                    </td>
                    <td className="py-4 font-semibold text-slate-600 dark:text-slate-300 max-w-xs truncate">{item.tests}</td>
                    <td className="py-4 text-slate-500">
                      <p className="font-medium">{item.preferred_date}</p>
                      <p className="text-[10px] text-slate-400">{item.preferred_time}</p>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.is_home_collection ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.is_home_collection ? '🏠 Home' : '🏥 Lab'}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-800 dark:text-white">₹{item.total_price}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        item.status === 'Completed' ? 'bg-[#00B894]/15 text-[#00B894]' :
                        item.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                      {item.status === 'Pending' && (
                        <button 
                          onClick={() => handleUpdateStatus(item.booking_id, 'Confirmed')}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                          title="Confirm Booking"
                        >
                          <FaCheck />
                        </button>
                      )}
                      {item.status === 'Confirmed' && (
                        <button 
                          onClick={() => handleUpdateStatus(item.booking_id, 'Completed')}
                          className="p-1.5 bg-[#00B894]/10 text-[#00B894] hover:bg-[#00B894] hover:text-white rounded-lg transition-all"
                          title="Mark Completed"
                        >
                          <FaCheck />
                        </button>
                      )}
                      {item.status !== 'Cancelled' && item.status !== 'Completed' && (
                        <button 
                          onClick={() => handleUpdateStatus(item.booking_id, 'Cancelled')}
                          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                          title="Cancel Appointment"
                        >
                          <FaTimes />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(item.booking_id)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        title="Delete Record"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
