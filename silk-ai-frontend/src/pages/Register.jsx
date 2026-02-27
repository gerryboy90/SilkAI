import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    firm: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await register(form)
      toast.success('Welcome to Silk AI.')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.detail ?? 'Registration failed.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-silk-black flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 border-r border-silk-mid/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-px h-full opacity-10"
            style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }} />
        </div>

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 flex items-center justify-center border border-silk-gold/40">
            <span className="gold-text font-serif text-lg font-bold leading-none">S</span>
          </div>
          <span className="font-serif text-xl font-semibold">
            Silk <span className="gold-text">AI</span>
          </span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <div className="section-label mb-3">What you get</div>
            {[
              'Know which argument style wins this case — matched to Silk profiles',
              'See how this judge tends to rule on cases like yours',
              'Every argument scored, every weakness flagged, pivots suggested',
              'Full strategy report — recommended approach, risks, prep steps. Export as PDF.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-4">
                <span className="text-silk-gold font-mono text-xs mt-0.5">0{i + 1}</span>
                <span className="text-silk-silver text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-silk-grey text-xs font-mono relative z-10">
          Where senior counsel plan.
        </p>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-sm w-full mx-auto">
          <Link to="/" className="flex items-center gap-3 mb-12 lg:hidden">
            <div className="w-7 h-7 flex items-center justify-center border border-silk-gold/40">
              <span className="gold-text font-serif text-base font-bold leading-none">S</span>
            </div>
            <span className="font-serif text-lg font-semibold">Silk <span className="gold-text">AI</span></span>
          </Link>

          <div className="section-label mb-3">New account</div>
          <h1 className="font-serif text-4xl font-semibold mb-8">Request access</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Full name
              </label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={set('full_name')}
                className="input-field"
                placeholder="Lord Denning"
              />
            </div>

            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Email address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                className="input-field"
                placeholder="denning@chambers.co.uk"
              />
            </div>

            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Firm or chambers <span className="text-silk-grey normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={form.firm}
                onChange={set('firm')}
                className="input-field"
                placeholder="Denning Chambers"
              />
            </div>

            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={set('password')}
                  className="input-field pr-12"
                  placeholder="8+ characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-silk-grey hover:text-silk-silver transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="animate-pulse">Creating account…</span>
              ) : (
                <>
                  Get your first report <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-silk-grey text-sm">
            Already have access?{' '}
            <Link to="/login" className="text-silk-gold hover:text-silk-gold-light transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
