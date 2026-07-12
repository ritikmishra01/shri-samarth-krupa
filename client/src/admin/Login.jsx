import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaLock, FaUser, FaHospital } from 'react-icons/fa'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const { username, password } = data
    
    // Demo authentication check
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_token', 'demo-jwt-token-ssk')
      toast.success('Successfully logged in to Admin Panel!')
      navigate('/admin/dashboard')
    } else {
      toast.error('Invalid username or password. Try: admin / admin123')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6 shadow-glow text-white text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center mx-auto text-xl text-white shadow-glow">
            <FaHospital />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display">Admin Portal</h2>
            <p className="text-xs text-slate-400">Shri Samarth Krupa Diagnostic Centre</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">Username</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-slate-400" />
              <input 
                type="text" 
                {...register('username', { required: 'Username is required' })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-primary-700" 
                placeholder="e.g. admin"
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
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-primary-700" 
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-[10px]">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-xs shadow-glow">
            Log In to Admin Panel
          </button>
        </form>

        <p className="text-[10px] text-slate-500 italic">For Demo Login use Username: <span className="font-bold text-slate-400">admin</span> / Password: <span className="font-bold text-slate-400">admin123</span></p>
      </div>
    </div>
  )
}
