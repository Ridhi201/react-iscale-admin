import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, breadcrumbs = [], actions }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-1.5">
            <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Home size={12} />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-blue-600 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-slate-600 dark:text-slate-400">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
