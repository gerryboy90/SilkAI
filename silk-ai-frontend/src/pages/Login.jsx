import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back.')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.detail ?? 'Login failed. Check your credentials.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-silk-black flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 border-r border-silk-gold/10 relative overflow-hidden">
        <AnimatedBackground variant="hero" />

        {/* Decorative "S" watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <div
            className="font-serif font-bold leading-none opacity-[0.03]"
            style={{
              fontSize: '20rem',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96C 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            S
          </div>
        </div>

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 flex items-center justify-center border border-silk-gold/40 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)] transition-all duration-300">
            <span className="gold-text font-serif text-lg font-bold leading-none">S</span>
          </div>
          <span className="font-serif text-xl font-semibold">
            Silk <span className="gold-text">AI</span>
          </span>
        </Link>

        <div className="relative z-10">
          <blockquote className="font-serif text-3xl font-light leading-snug text-silk-cream mb-6">
            "The measure of intelligence is the ability to change."
          </blockquote>
          <cite className="text-silk-grey text-sm font-mono not-italic">— Albert Einstein</cite>
        </div>

        <p className="text-silk-grey text-xs font-mono relative z-10">
          Intelligence for the senior bar.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, rgba(201, 168, 76, 0.5) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="max-w-sm w-full mx-auto relative z-10">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-3 mb-12 lg:hidden">
            <div className="w-7 h-7 flex items-center justify-center border border-silk-gold/40">
              <span className="gold-text font-serif text-base font-bold leading-none">S</span>
            </div>
            <span className="font-serif text-lg font-semibold">
              Silk <span className="gold-text">AI</span>
            </span>
          </Link>

          <div className="section-label mb-3">Secure access</div>
          <h1 className="font-serif text-4xl font-semibold mb-8">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-silk-silver text-xs font-mono mb-2 tracking-wider uppercase">
                Email address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="qc@chambers.co.uk"
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
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-12"
                  placeholder="••••••••"
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
                <span className="animate-pulse">Authenticating…</span>
              ) : (
                <>
                  Open dashboard <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-silk-grey text-sm">
            No account?{' '}
            <Link to="/register" className="text-silk-gold hover:text-silk-gold-light transition-colors">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
