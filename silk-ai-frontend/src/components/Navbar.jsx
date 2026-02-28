import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, FileText, LayoutDashboard, Upload } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/upload', label: 'New Case', icon: Upload },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-silk-gold/10 bg-silk-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center border border-silk-gold/40 group-hover:border-silk-gold group-hover:shadow-[0_0_15px_rgba(201,168,76,0.2)] transition-all duration-300">
            <span className="gold-text font-serif text-lg font-bold leading-none">S</span>
          </div>
          <span className="font-serif text-xl font-semibold tracking-wide text-silk-cream">
            Silk <span className="gold-text">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300
                  ${active
                    ? 'text-silk-gold shadow-[0_2px_10px_rgba(201,168,76,0.25)]'
                    : 'text-silk-silver hover:text-silk-cream'
                  }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-silk-cream text-sm font-medium leading-none">{user.full_name}</span>
              {user.firm && (
                <span className="text-silk-grey text-xs mt-0.5">{user.firm}</span>
              )}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-silk-silver hover:text-silk-gold transition-colors duration-200 text-sm"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
