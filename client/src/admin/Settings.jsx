import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaSave, FaCog } from 'react-icons/fa'

export default function Settings() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      lab_name: 'Shri Samarth Krupa Diagnostic Centre',
      owner_name: 'Mr. Shailesh Dubey',
      phone: '8169686040',
      email: 'shrisamarthkrupa@gmail.com',
      address: 'Shop No. 5, Sai Complex, Near ST Bus Stand, Kalyan West - 421301',
      timings_weekday: '07:00 AM - 09:00 PM',
      timings_sunday: '07:00 AM - 02:00 PM',
      meta_title: 'Shri Samarth Krupa Diagnostic Centre | Best Pathology Lab in Kalyan West',
      meta_desc: 'ISO 9001:2015 certified clinical diagnostic centre providing affordable blood tests, full body packages, and home sample collection across Kalyan.'
    }
  })

  const onSubmit = (data) => {
    // Save to localStorage for mock persistence
    localStorage.setItem('lab_settings', JSON.stringify(data))
    toast.success('Configuration settings updated successfully!')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white flex items-center gap-2">
          <FaCog /> Settings Portal
        </h1>
        <p className="text-xs text-slate-400">Configure public business details, metadata tags, and lab timing configurations.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 rounded-3xl space-y-6 shadow-sm">
        
        {/* Business Branding Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700">1. Business Branding Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Laboratory Registry Name *</label>
              <input type="text" {...register('lab_name')} className="input-primary" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Phlebotomist / Clinical Manager *</label>
              <input type="text" {...register('owner_name')} className="input-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Primary Phone / WhatsApp *</label>
              <input type="text" {...register('phone')} className="input-primary" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Primary Support Email *</label>
              <input type="email" {...register('email')} className="input-primary" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Laboratory Street Address *</label>
            <input type="text" {...register('address')} className="input-primary" />
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-700" />

        {/* Operating Hours */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700">2. Operating Timings</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Weekdays (Mon-Sat) *</label>
              <input type="text" {...register('timings_weekday')} className="input-primary" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Sundays *</label>
              <input type="text" {...register('timings_sunday')} className="input-primary" />
            </div>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-700" />

        {/* Search Engine Optimization */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700">3. SEO Metadata</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Default Page Title *</label>
            <input type="text" {...register('meta_title')} className="input-primary" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Default Meta Description *</label>
            <textarea {...register('meta_desc')} className="input-primary min-h-[60px]" />
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-glow">
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  )
}
