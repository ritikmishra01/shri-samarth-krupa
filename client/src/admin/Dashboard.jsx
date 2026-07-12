import { useState, useEffect } from 'react'
import { FaCalendarCheck, FaCheckCircle, FaRupeeSign, FaHourglassHalf } from 'react-icons/fa'

export default function Dashboard() {
  const [stats, setStats] = useState({
    today: 0, pending: 0, completed: 0,
    home_collection: 0, revenue: 0, total_patients: 0
  })
  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    let list = []
    try {
      list = JSON.parse(localStorage.getItem('appointments') || '[]')
      if (!Array.isArray(list)) list = []
    } catch (e) { list = [] }

    const todayCount = list.length
    const pendingCount = list.filter(item => item.status === 'Pending').length
    const completedCount = list.filter(item => item.status === 'Completed').length
    const homeCount = list.filter(item => item.is_home_collection === 1 || item.is_home_collection === true).length
    const revenueSum = list
      .filter(item => item.status === 'Confirmed' || item.status === 'Completed')
      .reduce((sum, item) => sum + (Number(item.total_price) || 0), 0)
    const uniquePatientsCount = new Set(list.map(item => item.phone)).size

    setStats({ today: todayCount, pending: pendingCount, completed: completedCount, home_collection: homeCount, revenue: revenueSum, total_patients: uniquePatientsCount })
    const parsed = list.map(item => ({
      id: item.booking_id, name: item.name, test: item.tests,
      date: item.preferred_date, status: item.status,
      type: item.is_home_collection ? 'Home' : 'Lab'
    }))
    setRecentBookings(parsed.reverse().slice(0, 5))
  }, [])

  const statCards = [
    { label: "Today's Bookings", val: stats.today,          icon: <FaCalendarCheck />, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Pending Reports',  val: stats.pending,        icon: <FaHourglassHalf />, color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Completed',        val: stats.completed,      icon: <FaCheckCircle />,   color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Revenue',          val: `₹${stats.revenue}`,  icon: <FaRupeeSign />,     color: 'bg-rose-500/10 text-rose-500' },
  ]

  const statusStyle = (s) =>
    s === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
    s === 'Confirmed' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
    'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-800 dark:text-white">Admin Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, Mr. Shailesh Dubey. Here's today's overview.</p>
      </div>

      {/* Stats Cards — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
        {statCards.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 leading-tight">{item.label}</p>
              <p className="text-xl sm:text-2xl font-extrabold font-display text-slate-800 dark:text-white truncate">{item.val}</p>
            </div>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Popular Tests */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Most Popular Tests</h3>
          <div className="space-y-3">
            {[
              { name: 'CBC (Complete Blood Count)', pct: '85%', count: 120, color: 'bg-blue-600' },
              { name: 'Thyroid Profile',            pct: '68%', count: 95,  color: 'bg-indigo-600' },
              { name: 'Lipid Profile',              pct: '55%', count: 80,  color: 'bg-emerald-600' },
              { name: 'HbA1c',                      pct: '40%', count: 58,  color: 'bg-amber-600' },
            ].map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 gap-2">
                  <span className="truncate">{p.name}</span>
                  <span className="flex-shrink-0 text-slate-400">{p.count}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: p.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Weekly Bookings</h3>
          <div className="h-40 flex items-end justify-between gap-1 sm:gap-2">
            {[
              { day: 'Mon', count: 8,  pct: '30%' },
              { day: 'Tue', count: 12, pct: '50%' },
              { day: 'Wed', count: 6,  pct: '25%' },
              { day: 'Thu', count: 15, pct: '60%' },
              { day: 'Fri', count: 10, pct: '40%' },
              { day: 'Sat', count: 18, pct: '75%' },
              { day: 'Sun', count: 24, pct: '100%' },
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-slate-400 font-bold">{d.count}</span>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden h-24 relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-primary-700 rounded-md transition-all" style={{ height: d.pct }} />
                </div>
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings — Table on md+, Cards on mobile */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">Recent Bookings</h3>

        {recentBookings.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm font-semibold text-slate-400">No bookings yet</p>
            <p className="text-xs text-slate-400 mt-1">Bookings will appear here once patients book tests</p>
          </div>
        ) : (
          <>
            {/* Mobile: Card View */}
            <div className="space-y-3 md:hidden">
              {recentBookings.map((b, idx) => (
                <div key={idx} className="border border-slate-100 dark:border-slate-700 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded">{b.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusStyle(b.status)}`}>{b.status}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-xs">{b.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{b.test}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>📅 {b.date || 'N/A'}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${b.type === 'Home' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700'}`}>
                      {b.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-wide">
                    <th className="pb-3 pr-4">Booking ID</th>
                    <th className="pb-3 pr-4">Patient</th>
                    <th className="pb-3 pr-4">Test</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {recentBookings.map((b, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="py-3 pr-4 font-bold text-slate-700 dark:text-slate-200 font-mono">{b.id}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-white">{b.name}</td>
                      <td className="py-3 pr-4 text-slate-500 dark:text-slate-400 max-w-[160px] truncate">{b.test}</td>
                      <td className="py-3 pr-4 text-slate-400">{b.date || 'N/A'}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${b.type === 'Home' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700'}`}>
                          {b.type}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${statusStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
