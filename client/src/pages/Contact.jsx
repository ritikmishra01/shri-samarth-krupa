import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa'

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    // Demo Mode Message Submission
    const currentMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    currentMessages.push({
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      is_read: 0,
      created_at: new Date().toISOString()
    })
    localStorage.setItem('messages', JSON.stringify(currentMessages))

    // Optional: sync to backend
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.log('Backend sync skipped in demo:', err.message))

    toast.success('Your message has been sent successfully!')
    reset()
  }

  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="bg-gradient-to-tr from-primary-800 to-primary-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold font-display">Contact Us</h1>
        <p className="text-slate-200 mt-2 text-sm max-w-lg mx-auto">
          Have query about custom packages, corporate testing, or home visits? Connect with our team.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* Info Side */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-display">Get in Touch</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Visit our lab or reach out to Mr. Shailesh Dubey directly for emergency pathology collection.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 flex items-center justify-center text-lg flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white font-display text-sm">Lab Address</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Shop No. 5, Sai Complex, Near ST Bus Stand, Kalyan West - 421301</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 flex items-center justify-center text-lg flex-shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white font-display text-sm">Phone Numbers</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">+91 8169686040, +91 9876543210</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 flex items-center justify-center text-lg flex-shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white font-display text-sm">Email Address</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">shrisamarthkrupa@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-blue-400 flex items-center justify-center text-lg flex-shrink-0">
                <FaClock />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white font-display text-sm">Laboratory Timings</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mon - Sat: 7:00 AM - 9:00 PM <br/> Sunday: 7:00 AM - 2:00 PM (Health Camp)</p>
              </div>
            </div>
          </div>

          {/* Quick Chat */}
          <div className="flex gap-2 max-w-xs pt-4">
            <a href="tel:8169686040" className="flex-1 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all">
              <FaPhoneAlt /> Call Now
            </a>
            <a href="https://wa.me/918169686040" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all">
              <FaWhatsapp className="text-base" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">Send Message</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Name *</label>
            <input 
              type="text" 
              {...register('name', { required: 'Name is required' })}
              className="input-primary" 
              placeholder="e.g. Priya Sharma"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Phone Number *</label>
              <input 
                type="tel" 
                {...register('phone', { required: 'Phone is required' })}
                className="input-primary" 
                placeholder="10-digit mobile"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Email Address (Optional)</label>
              <input 
                type="email" 
                {...register('email')}
                className="input-primary" 
                placeholder="e.g. priya@gmail.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Your Message *</label>
            <textarea 
              {...register('message', { required: 'Message is required' })}
              className="input-primary min-h-[100px]" 
              placeholder="Tell us what you want to inquire about..."
            />
            {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
          </div>

          <button type="submit" className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs shadow-glow">
            Send Message
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="h-96 w-full border-t border-slate-100 dark:border-slate-800 bg-slate-100 relative">
        <iframe 
          title="Shri Samarth Krupa Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.432851944813!2d73.1293393!3d19.2417757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795804efb3cf1%3A0xe54e38e146eb247d!2sSai%20Complex%2C%20Kalyan%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        />
      </section>
    </div>
  )
}
