import { Link } from 'react-router-dom'
import { FaFlask, FaArrowLeft } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-glow">
        <FaFlask className="text-6xl text-primary-700 dark:text-blue-400 mx-auto animate-bounce-slow" />
        
        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-primary-700 dark:text-blue-400 font-display">404</h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white font-display">Page Not Found</h2>
          <p className="text-xs text-slate-400">
            The page you are looking for does not exist or has been relocated to another route.
          </p>
        </div>

        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 px-5 py-3 btn-primary text-xs font-bold shadow-glow">
            <FaArrowLeft /> Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}
