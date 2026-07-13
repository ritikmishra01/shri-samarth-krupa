import { useState, useEffect, useRef } from 'react'
import { FaUpload, FaFilePdf, FaDownload, FaTrash, FaSearch, FaCheck, FaClock, FaEye } from 'react-icons/fa'
import toast from 'react-hot-toast'

const statusBadge = (s) =>
  s === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
  s === 'Confirmed'  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
  s === 'Cancelled'  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                       'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'

export default function Reports() {
  const [appointments, setAppointments] = useState([])
  const [reports, setReports] = useState({})
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileRefs = useRef({})

  useEffect(() => {
    // Load appointments
    let list = []
    try { list = JSON.parse(localStorage.getItem('appointments') || '[]'); if (!Array.isArray(list)) list = [] }
    catch { list = [] }
    setAppointments(list)

    // Load all uploaded reports
    const allReports = {}
    list.forEach(item => {
      const key = `report_${item.booking_id}`
      try {
        const stored = localStorage.getItem(key)
        if (stored) allReports[item.booking_id] = JSON.parse(stored)
      } catch {}
    })
    setReports(allReports)
  }, [])

  const handleFileSelect = (bookingId, file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed!')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Max size is 10 MB.')
      return
    }

    setUploading(bookingId)
    const reader = new FileReader()
    reader.onload = (e) => {
      const reportData = {
        filename: file.name,
        base64: e.target.result,
        uploadedAt: new Date().toISOString(),
        size: (file.size / 1024).toFixed(1) + ' KB'
      }
      localStorage.setItem(`report_${bookingId}`, JSON.stringify(reportData))
      setReports(prev => ({ ...prev, [bookingId]: reportData }))
      setUploading(null)
      toast.success('Report uploaded successfully! Patient can now download it.')
    }
    reader.onerror = () => { setUploading(null); toast.error('Upload failed. Please try again.') }
    reader.readAsDataURL(file)
  }

  const handleDelete = (bookingId) => {
    if (!window.confirm('Delete this report? Patient will no longer be able to download it.')) return
    localStorage.removeItem(`report_${bookingId}`)
    setReports(prev => { const n = { ...prev }; delete n[bookingId]; return n })
    toast.success('Report deleted.')
  }

  const handleDownload = (bookingId) => {
    const r = reports[bookingId]
    if (!r) return
    const link = document.createElement('a')
    link.href = r.base64
    link.download = r.filename
    link.click()
  }

  const filtered = appointments.filter(a =>
    !search ||
    a.booking_id?.toLowerCase().includes(search.toLowerCase()) ||
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.phone?.includes(search)
  )

  const uploadedCount = Object.keys(reports).length
  const pendingCount = appointments.length - uploadedCount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Patient Reports</h1>
          <p className="text-xs text-slate-400 mt-0.5">Upload PDF reports for confirmed patients</p>
        </div>
        {/* Stats pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <FaCheck className="text-[10px]" /> {uploadedCount} Uploaded
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold">
            <FaClock className="text-[10px]" /> {pendingCount} Pending
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, booking ID, phone..."
          className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
        />
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg mt-0.5">ℹ️</span>
        <div>
          <p className="text-xs font-bold text-blue-800 dark:text-blue-300">How Report Upload Works</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
            Upload a PDF report for any booking. The patient can then go to the <strong>Download Report</strong> page on the website and enter their Booking ID + Phone Number to access and download their report.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-12 text-center">
          <FaFilePdf className="text-5xl text-slate-200 dark:text-slate-700 mx-auto mb-4" />
          <p className="font-semibold text-slate-400">{search ? 'No matching patients found' : 'No bookings yet'}</p>
          <p className="text-xs text-slate-400 mt-1">{search ? 'Try a different search term' : 'Patients who book tests will appear here for report upload'}</p>
        </div>
      )}

      {/* Mobile: Card View */}
      {filtered.length > 0 && (
        <div className="md:hidden space-y-3">
          {filtered.map((item) => {
            const report = reports[item.booking_id]
            const isUploading = uploading === item.booking_id
            return (
              <div key={item.booking_id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 space-y-3 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{item.booking_id}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${statusBadge(item.status)}`}>{item.status}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.tests}</p>
                <div className="text-[10px] text-slate-400">📞 {item.phone} · 📅 {item.preferred_date}</div>

                {/* Report Status */}
                {report ? (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <FaFilePdf className="text-red-500" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{report.filename}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{report.size} · Uploaded {new Date(report.uploadedAt).toLocaleDateString()}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleDownload(item.booking_id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors">
                        <FaDownload className="text-[9px]" /> Download
                      </button>
                      <button onClick={() => handleDelete(item.booking_id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file" accept=".pdf" className="hidden"
                      ref={el => fileRefs.current[item.booking_id] = el}
                      onChange={e => handleFileSelect(item.booking_id, e.target.files[0])}
                    />
                    <button
                      onClick={() => fileRefs.current[item.booking_id]?.click()}
                      disabled={isUploading}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all text-xs font-semibold disabled:opacity-50"
                    >
                      <FaUpload className="text-[10px]" />
                      {isUploading ? 'Uploading...' : 'Upload PDF Report'}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Desktop: Table View */}
      {filtered.length > 0 && (
        <div className="hidden md:block bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-700">
                  {['Booking ID', 'Patient', 'Tests', 'Date', 'Status', 'Report', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {filtered.map((item) => {
                  const report = reports[item.booking_id]
                  const isUploading = uploading === item.booking_id
                  return (
                    <tr key={item.booking_id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-primary-600 dark:text-primary-400">{item.booking_id}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400 max-w-[180px] truncate">{item.tests}</td>
                      <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{item.preferred_date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${statusBadge(item.status)}`}>{item.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        {report ? (
                          <div className="flex items-center gap-2">
                            <FaFilePdf className="text-red-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">{report.filename}</p>
                              <p className="text-[9px] text-slate-400">{report.size}</p>
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 text-[10px] font-semibold">
                            <FaClock className="text-[9px]" /> Not uploaded
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="file" accept=".pdf" className="hidden"
                          ref={el => fileRefs.current[item.booking_id] = el}
                          onChange={e => handleFileSelect(item.booking_id, e.target.files[0])}
                        />
                        <div className="flex items-center gap-1.5">
                          {report ? (
                            <>
                              <button onClick={() => handleDownload(item.booking_id)}
                                title="Download Report"
                                className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                <FaDownload className="text-xs" />
                              </button>
                              <button
                                onClick={() => fileRefs.current[item.booking_id]?.click()}
                                title="Replace Report"
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 transition-all">
                                <FaUpload className="text-xs" />
                              </button>
                              <button onClick={() => handleDelete(item.booking_id)}
                                title="Delete Report"
                                className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <FaTrash className="text-xs" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => fileRefs.current[item.booking_id]?.click()}
                              disabled={isUploading}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600 text-white text-[11px] font-bold hover:bg-primary-700 transition-all disabled:opacity-50 whitespace-nowrap"
                            >
                              <FaUpload className="text-[9px]" />
                              {isUploading ? 'Uploading...' : 'Upload PDF'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
