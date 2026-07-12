import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaSearch, FaDownload, FaBrain, FaFilePdf, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa'

export default function DownloadReport() {
  const [patientId, setPatientId] = useState('')
  const [mobile, setMobile] = useState('')
  const [report, setReport] = useState(null)
  const [showAI, setShowAI] = useState(false)
  const [healthScore, setHealthScore] = useState(85)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!patientId || !mobile) {
      toast.error('Please enter both Patient ID and Mobile Number.')
      return
    }

    // Mock search logic
    if (patientId.toUpperCase() === 'SKD-2026001' && mobile === '8169686040') {
      setReport({
        patient_id: 'SKD-2026001',
        name: 'Rajesh Patil',
        test: 'Complete Blood Count (CBC)',
        date: '2026-07-05',
        status: 'Ready',
        values: [
          { name: 'WBC (White Blood Cells)', val: 7.2, unit: 'K/uL', range: '4.5 - 11.0', status: 'Normal' },
          { name: 'RBC (Red Blood Cells)', val: 5.1, unit: 'M/uL', range: '4.5 - 5.9', status: 'Normal' },
          { name: 'Hemoglobin', val: 13.2, unit: 'g/dL', range: '13.5 - 17.5', status: 'Low' },
          { name: 'Platelets Count', val: 250, unit: 'K/uL', range: '150 - 400', status: 'Normal' },
          { name: 'MCV', val: 79, unit: 'fL', range: '80 - 100', status: 'Low' }
        ],
        ai_summary: 'Your blood counts are mostly normal. However, Hemoglobin and MCV are slightly below reference range. This might indicate early stage iron deficiency or mild anemia. All other parameters show optimal cellular functions.'
      })
      setHealthScore(82)
      setShowAI(false)
      toast.success('Report found!')
    } else {
      toast.error('No report found matching the details. Try ID: SKD-2026001, Mobile: 8169686040')
    }
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div key="search-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold font-display text-slate-800 dark:text-white">Download Digital Reports</h1>
              <p className="text-slate-500 max-w-sm mx-auto text-xs">Enter your login credentials provided during sample registration.</p>
            </div>

            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 rounded-3xl shadow-glow space-y-4 max-w-md mx-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Patient ID / Booking ID *</label>
                <input 
                  type="text" 
                  value={patientId} 
                  onChange={e => setPatientId(e.target.value)}
                  className="input-primary" 
                  placeholder="e.g. SKD-2026001"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Registered Mobile Number *</label>
                <input 
                  type="tel" 
                  value={mobile} 
                  onChange={e => setMobile(e.target.value)}
                  className="input-primary" 
                  placeholder="e.g. 8169686040"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-glow">
                <FaSearch /> Fetch Pathology Report
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="report-panel" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm">
              <div className="space-y-1">
                <button onClick={() => setReport(null)} className="text-xs text-primary-700 dark:text-blue-400 font-bold flex items-center gap-1 mb-2 hover:underline">
                  <FaArrowLeft /> Go Back
                </button>
                <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white">{report.name}</h2>
                <p className="text-xs text-slate-500">ID: {report.patient_id} · Test: {report.test}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => toast.success('Report PDF download started!')} className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all">
                  <FaDownload /> Download Report
                </button>
                <button onClick={() => setShowAI(!showAI)} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow">
                  <FaBrain /> {showAI ? 'Hide AI Analysis' : '✨ Analyze My Report'}
                </button>
              </div>
            </div>

            {/* AI Analysis View */}
            {showAI && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-glow space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold font-display flex items-center gap-2 text-indigo-400">
                    <FaBrain /> AI Health Report Analysis
                  </h3>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Health Score:</p>
                    <p className="text-2xl font-extrabold text-[#00B894] font-display">{healthScore}/100</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                    {report.ai_summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                      <h4 className="font-bold text-[#00B894] text-xs">🍏 Recommended Diet Adjustments</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                        <li>Increase iron intake with spinach, beetroot, beans, and lentils.</li>
                        <li>Include Vitamin C rich foods (amla, citrus fruits) to improve iron absorption.</li>
                        <li>Reduce tea or coffee consumption immediately after meals.</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                      <h4 className="font-bold text-[#00B894] text-xs">🏃 Lifestyle Improvement Tips</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                        <li>Aim for 30 minutes of mild physical exercise daily.</li>
                        <li>Maintain proper hydration (at least 8-10 glasses of water daily).</li>
                        <li>Ensure 7-8 hours of deep restorative sleep.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 text-center italic">Disclaimer: AI report insights are for informational reference only. Please consult a qualified doctor for medical prescription.</p>
              </motion.div>
            )}

            {/* Standard Pathology Values Table */}
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-4 overflow-hidden">
              <h3 className="font-bold text-slate-800 dark:text-white font-display">Pathology Reference Ranges</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                      <th className="pb-3 font-semibold">Test Marker</th>
                      <th className="pb-3 font-semibold">Observed Value</th>
                      <th className="pb-3 font-semibold">Reference Range</th>
                      <th className="pb-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {report.values.map((v, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                        <td className="py-3.5 font-bold text-slate-700 dark:text-slate-200">{v.name}</td>
                        <td className="py-3.5 font-bold text-primary-700 dark:text-blue-400">{v.val} {v.unit}</td>
                        <td className="py-3.5 text-slate-400 font-mono">{v.range}</td>
                        <td className="py-3.5 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            v.status === 'Normal' 
                              ? 'bg-[#00B894]/15 text-[#00B894]' 
                              : 'bg-[#E63946]/15 text-[#E63946]'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
