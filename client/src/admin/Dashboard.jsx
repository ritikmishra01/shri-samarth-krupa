import { useState, useEffect } from 'react'
import { FaUserPlus, FaCalendarCheck, FaClock, FaCheckCircle, FaRupeeSign, FaHourglassHalf } from 'react-icons/fa'

export default function Dashboard() {
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    completed: 0,
    home_collection: 0,
    revenue: 0,
    total_patients: 0
  })

  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    // Read from localStorage actual bookings
    let list = []
    try {
      list = JSON.parse(localStorage.getItem('appointments') || '[]')
      if (!Array.isArray(list)) list = []
    } catch (e) {
      list = []
    }
    
    const todayCount = list.length
    const pendingCount = list.filter(item => item.status === 'Pending').length
    const completedCount = list.filter(item => item.status === 'Completed').length
    const homeCount = list.filter(item => item.is_home_collection === 1 || item.is_home_collection === true).length
    
    // Revenue sum of Confirmed and Completed bookings
    const revenueSum = list
      .filter(item => item.status === 'Confirmed' || item.status === 'Completed')
      .reduce((sum, item) => sum + (Number(item.total_price) || 0), 0)
      
    // Count unique patients by phone number
    const uniquePatientsCount = new Set(list.map(item => item.phone)).size

    setStats({
      today: todayCount,
      pending: pendingCount,
      completed: completedCount,
      home_collection: homeCount,
      revenue: revenueSum,
      total_patients: uniquePatientsCount
    })

    const parsed = list.map(item => ({
      id: item.booking_id,
      name: item.name,
      test: item.tests,
      date: item.preferred_date,
      status: item.status,
      type: item.is_home_collection ? 'Home' : 'Lab'
    }))
    setRecentBookings(parsed.reverse().slice(0, 5))
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Admin Dashboard</h1>
        <p className="text-xs text-slate-400">Welcome back, Mr. Shailesh Dubey. Here is today's overview.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Bookings", val: stats.today, icon: <FaCalendarCheck />, color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Pending Reports', val: stats.pending, icon: <FaHourglassHalf />, color: 'bg-amber-500/10 text-amber-500' },
          { label: 'Completed Reports', val: stats.completed, icon: <FaCheckCircle />, color: 'bg-emerald-500/10 text-emerald-500' },
          { label: 'Today Revenue', val: `₹${stats.revenue}`, icon: <FaRupeeSign />, color: 'bg-rose-500/10 text-rose-500' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400">{item.label}</p>
              <p className="text-2xl font-extrabold font-display text-slate-800 dark:text-white">{item.val}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Mock Chart: Popular Tests */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Most Popular Pathology Tests</h3>
          
          <div className="space-y-4 pt-2">
            {[
              { name: 'Complete Blood Count (CBC)', pct: '85%', count: 120, color: 'bg-blue-600' },
              { name: 'Thyroid Profile', pct: '68%', count: 95, color: 'bg-indigo-600' },
              { name: 'Lipid Profile', pct: '55%', count: 80, color: 'bg-emerald-600' },
              { name: 'HbA1c', pct: '40%', count: 58, color: 'bg-amber-600' }
            ].map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>{p.name}</span>
                  <span>{p.count} tests ({p.pct})</span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: p.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Chart: Weekly Bookings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Weekly Booking Load (Active Daily Count)</h3>
          
          <div className="h-48 flex items-end justify-between gap-2 pt-6">
            {[
              { day: 'Mon', count: 8, pct: '30%' },
              { day: 'Tue', count: 12, pct: '50%' },
              { day: 'Wed', count: 6, pct: '25%' },
              { day: 'Thu', count: 15, pct: '60%' },
              { day: 'Fri', count: 10, pct: '40%' },
              { day: 'Sat', count: 18, pct: '75%' },
              { day: 'Sun', count: 24, pct: '100%' }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold">{d.count}</span>
                <div className="w-full bg-primary-100 dark:bg-slate-700 rounded-lg overflow-hidden h-28 relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-primary-700 rounded-lg" style={{ height: d.pct }} />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-4 overflow-hidden">
        <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Recent Test Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Pathology Test</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 font-semibold">
                    No recent test bookings.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                    <td className="py-3.5 font-bold text-slate-700 dark:text-slate-200 font-mono">{b.id}</td>
                    <td className="py-3.5 font-semibold text-slate-800 dark:text-white">{b.name}</td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">{b.test}</td>
                    <td className="py-3.5 text-slate-400 font-medium">{b.date}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        b.type === 'Home' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      }`}>
                        {b.type} Collection
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        b.status === 'Completed' ? 'bg-[#00B894]/15 text-[#00B894]' :
                        b.status === 'Confirmed' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {b.status}
                      </span>
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
