import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaUser, FaPhoneAlt, FaHome, FaCalendarCheck, FaCheckCircle, FaClipboardList } from 'react-icons/fa'

const TESTS = [
  { id: 'cbc', name: 'CBC (Complete Blood Count)', price: 200 },
  { id: 'lipid', name: 'Lipid Profile', price: 350 },
  { id: 'thyroid', name: 'Thyroid Profile', price: 400 },
  { id: 'lft', name: 'Liver Function Test', price: 500 },
  { id: 'kft', name: 'Kidney Function Test', price: 500 },
  { id: 'hba1c', name: 'HbA1c', price: 400 },
  { id: 'sugar', name: 'Blood Sugar (Fasting)', price: 80 },
  { id: 'vitamin-b12', name: 'Vitamin B12', price: 700 },
  { id: 'vitamin-d', name: 'Vitamin D', price: 900 },
  { id: 'urine', name: 'Urine Examination', price: 100 },
  { id: 'pregnancy', name: 'Pregnancy Test', price: 150 },
]

const PACKAGES = [
  { id: 'pkg11', name: 'Fit India Package 1.1', price: 1300 },
  { id: 'pkg12', name: 'Fit India Package 1.2', price: 1700 },
  { id: 'pkg13', name: 'Fit India Package 1.3', price: 3000 },
]

export default function BookAppointment() {
  const [step, setStep] = useState(1)
  const [isHomeCollection, setIsHomeCollection] = useState(false)
  const [selectedTests, setSelectedTests] = useState([])
  const [selectedPackage, setSelectedPackage] = useState('')
  const [bookingId, setBookingId] = useState('')

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    shouldUnregister: false
  })

  const handleTestToggle = (testId) => {
    setSelectedPackage('') // Reset package if test selected
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter(id => id !== testId))
    } else {
      setSelectedTests([...selectedTests, testId])
    }
  }

  const handlePackageSelect = (pkgId) => {
    setSelectedTests([]) // Reset tests if package selected
    setSelectedPackage(pkgId)
  }

  const calculateTotal = () => {
    if (selectedPackage) {
      const pkg = PACKAGES.find(p => p.id === selectedPackage)
      return pkg ? pkg.price : 0
    }
    return selectedTests.reduce((total, id) => {
      const test = TESTS.find(t => t.id === id)
      return total + (test ? test.price : 0)
    }, 0)
  }

  const onSubmit = (data) => {
    if (step < 3) {
      setStep(step + 1)
      return
    }

    if (selectedTests.length === 0 && !selectedPackage) {
      toast.error('Please select at least one test or package to continue.')
      return
    }

    // Process Booking
    const newId = `SKD-${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`
    setBookingId(newId)

    const bookingData = {
      booking_id: newId,
      ...data,
      is_home_collection: isHomeCollection ? 1 : 0,
      total_price: calculateTotal(),
      tests: selectedPackage 
        ? PACKAGES.find(p => p.id === selectedPackage).name
        : selectedTests.map(id => TESTS.find(t => t.id === id).name).join(', '),
      status: 'Pending'
    }

    // Save to localStorage for Demo Mode
    let currentList = []
    try {
      currentList = JSON.parse(localStorage.getItem('appointments') || '[]')
      if (!Array.isArray(currentList)) {
        currentList = []
      }
    } catch (e) {
      currentList = []
    }
    currentList.push(bookingData)
    localStorage.setItem('appointments', JSON.stringify(currentList))

    // Optional: Send to backend
    fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    }).catch(err => console.log('Backend sync skipped in demo:', err.message))

    toast.success('Appointment booked successfully!')
    setStep(4)
  }

  const handleRestart = () => {
    reset()
    setSelectedTests([])
    setSelectedPackage('')
    setIsHomeCollection(false)
    setBookingId('')
    setStep(1)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Progress Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-8 text-xs font-semibold text-slate-400">
          <span className={step >= 1 ? 'text-primary-700 font-bold' : ''}>1. Personal Info</span>
          <div className="h-[2px] bg-slate-200 dark:bg-slate-700 flex-1 mx-4" />
          <span className={step >= 2 ? 'text-primary-700 font-bold' : ''}>2. Collection Details</span>
          <div className="h-[2px] bg-slate-200 dark:bg-slate-700 flex-1 mx-4" />
          <span className={step >= 3 ? 'text-primary-700 font-bold' : ''}>3. Test & Package Selection</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 sm:p-10 shadow-glow relative overflow-hidden">
        
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white flex items-center gap-2">
              <FaUser className="text-primary-700" /> Personal Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Full Name *</label>
                <input 
                  type="text" 
                  {...register('name', { required: 'Name is required' })}
                  className="input-primary" 
                  placeholder="e.g. Rajesh Patil"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Mobile Number *</label>
                <input 
                  type="tel" 
                  {...register('phone', { 
                    required: 'Mobile number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' }
                  })}
                  className="input-primary" 
                  placeholder="10-digit number"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Age *</label>
                <input 
                  type="number" 
                  {...register('age', { required: 'Age is required', min: { value: 1, message: 'Invalid age' } })}
                  className="input-primary" 
                  placeholder="e.g. 45"
                />
                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Gender *</label>
                <select {...register('gender', { required: 'Gender is required' })} className="input-primary">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-sm">
              Next Step: Collection Details
            </button>
          </motion.div>
        )}

        {/* Step 2: Collection Details */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white flex items-center gap-2">
              <FaHome className="text-primary-700" /> Collection Details
            </h2>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 block">Where should we collect the sample?</label>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsHomeCollection(true)}
                  className={`flex-1 py-4 border rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                    isHomeCollection ? 'border-primary-700 bg-primary-50/50 dark:bg-primary-900/10 text-primary-700 font-bold' : 'border-slate-200'
                  }`}
                >
                  <span className="text-xl">🏠</span>
                  <span className="text-xs">Home Sample Collection</span>
                </button>

                <button 
                  type="button" 
                  onClick={() => setIsHomeCollection(false)}
                  className={`flex-1 py-4 border rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                    !isHomeCollection ? 'border-primary-700 bg-primary-50/50 dark:bg-primary-900/10 text-primary-700 font-bold' : 'border-slate-200'
                  }`}
                >
                  <span className="text-xl">🏥</span>
                  <span className="text-xs">Visit Diagnostic Centre</span>
                </button>
              </div>
            </div>

            {isHomeCollection && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Full Home Address *</label>
                <textarea 
                  {...register('address', { required: isHomeCollection ? 'Address is required for home visits' : false })}
                  className="input-primary min-h-[80px]" 
                  placeholder="Street, Building, Flat No., Landmark, Kalyan West"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Preferred Date *</label>
                <input 
                  type="date" 
                  {...register('preferred_date', { required: 'Date is required' })}
                  className="input-primary" 
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.preferred_date && <p className="text-red-500 text-xs">{errors.preferred_date.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Preferred Time Slot *</label>
                <select {...register('preferred_time', { required: 'Time is required' })} className="input-primary">
                  <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM (Recommended)</option>
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                  <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                  <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">
                Back
              </button>
              <button type="submit" className="flex-1 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs">
                Next: Select Tests
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Tests Selection */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white flex items-center gap-2">
              <FaClipboardList className="text-primary-700" /> Select Diagnostic Tests
            </h2>

            {/* Packages Group */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Select a Package (Recommended)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGES.map(pkg => (
                  <button 
                    key={pkg.id} 
                    type="button"
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`p-4 border rounded-2xl text-left transition-all ${
                      selectedPackage === pkg.id ? 'border-primary-700 bg-primary-50/50 dark:bg-primary-900/10 text-primary-700' : 'border-slate-100 dark:border-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{pkg.name}</p>
                    <p className="text-sm font-extrabold mt-1">₹{pkg.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Tests */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Or Select Individual Tests</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1 border border-slate-100 dark:border-slate-700 rounded-xl">
                {TESTS.map(test => (
                  <button 
                    key={test.id} 
                    type="button"
                    onClick={() => handleTestToggle(test.id)}
                    className={`p-3 border rounded-xl text-left transition-all ${
                      selectedTests.includes(test.id) ? 'border-primary-700 bg-primary-50/30 dark:bg-primary-900/10 text-primary-700' : 'border-slate-100 dark:border-slate-700'
                    }`}
                  >
                    <p className="text-[10px] font-bold truncate">{test.name}</p>
                    <p className="text-xs font-semibold mt-1">₹{test.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Amount:</p>
                <p className="text-xl font-bold text-primary-700 dark:text-blue-400 font-display">₹{calculateTotal()}</p>
              </div>
              <span className="text-[10px] text-[#00B894] font-bold bg-[#00B894]/15 px-3 py-1 rounded-full">
                ✓ Pay on Sample Collection
              </span>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200">
                Back
              </button>
              <button type="submit" className="flex-1 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs shadow-glow">
                Confirm & Book Test
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success confirmation */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <FaCheckCircle className="text-6xl text-[#00B894] mx-auto animate-bounce-slow" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Booking Confirmed!</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your pathology test request has been logged successfully.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 inline-block text-left space-y-2 max-w-sm w-full mx-auto">
              <p className="text-xs text-slate-500">Booking ID: <span className="font-bold text-slate-700 dark:text-white font-mono">{bookingId}</span></p>
              <p className="text-xs text-slate-500">Patient: <span className="font-bold text-slate-700 dark:text-white">{watch('name')}</span></p>
              <p className="text-xs text-slate-500">Collection: <span className="font-bold text-slate-700 dark:text-white">{isHomeCollection ? '🏠 Home Collection' : '🏥 Lab Visit'}</span></p>
              <p className="text-xs text-slate-500">Date/Time: <span className="font-bold text-slate-700 dark:text-white">{watch('preferred_date')} ({watch('preferred_time')})</span></p>
            </div>

            <div className="flex flex-col gap-2 max-w-xs mx-auto">
              <a 
                href={`https://wa.me/918169686040?text=Hello%2C%20I%20have%20booked%20an%20appointment.%20Booking%20ID%3A%20${bookingId}`} 
                target="_blank" 
                rel="noreferrer" 
                className="py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                Share via WhatsApp
              </a>
              <button 
                type="button" 
                onClick={handleRestart}
                className="py-3 border border-slate-200 hover:bg-slate-100 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs"
              >
                Book Another Test
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}
