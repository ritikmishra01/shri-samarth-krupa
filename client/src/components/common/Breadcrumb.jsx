import { Link } from 'react-router-dom'
import { FaChevronRight, FaHome } from 'react-icons/fa'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <FaHome className="text-xs" />
        <span>Home</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <FaChevronRight className="text-slate-400 dark:text-slate-600 text-xs" />
          {item.to ? (
            <Link
              to={item.to}
              className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
