import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaLock, FaUser, FaHospital } from 'react-icons/fa'
import { useState } from 'react'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = (data) => {
    setLoginError('')
    setLoading(true)

    const { username, password } = data

    // Small delay to show loading state
    setTimeout(() => {
      setLoading(false)
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_token', 'demo-jwt-token-ssk')
        localStorage.setItem('admin_logged_in', 'true')
        try {
          toast.success('Welcome to Admin Panel!')
        } catch (e) {
          // toast unavailable - ignore
        }
        navigate('/admin/dashboard')
      } else {
        setLoginError('Invalid username or password')
        try {
          toast.error('Invalid credentials. Use admin / admin123')
        } catch (e) {
          // toast unavailable - ignore
        }
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6 shadow-glow text-white text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="w-14 h-14 bg-primary-700 rounded-xl flex items-center justify-center mx-auto text-2xl text-white shadow-glow">
            <FaHospital />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display">Admin Portal</h1>
            <p className="text-xs text-slate-400">Shri Samarth Krupa Diagnostic Centre</p>
          </div>
        </div>

        {/* Hint box */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-3 text-left">
          <p className="text-[11px] text-blue-300 font-semibold">Demo Credentials</p>
          <p className="text-[11px] text-slate-300 mt-0.5">Username: <span className="font-bold text-white">admin</span> &nbsp;|&nbsp; Password: <span className="font-bold text-white">admin123</span></p>
        </div>

        {/* Error */}
        {loginError && (
          <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-3 text-left">
            <p className="text-[11px] text-red-300 font-semibold">⚠️ {loginError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">Username</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30"
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            {errors.username && <p className="text-red-400 text-[10px]">{errors.username.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {errors.password && <p className="text-red-400 text-[10px]">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-700 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-glow transition-all"
          >
            {loading ? '⏳ Logging in...' : '🔐 Login to Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
