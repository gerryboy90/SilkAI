/**
 * Animated background with floating orbs, orbiting circles, and particles.
 * Variants: hero (rich for landing), subtle (lighter for auth/dashboard)
 */
export default function AnimatedBackground({ variant = 'hero', className = '' }) {
  const isHero = variant === 'hero'
  const meshOpacity = isHero ? 'opacity-[0.12]' : 'opacity-[0.06]'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient mesh — slow drift */}
      <div
        className={`absolute inset-0 ${meshOpacity} animate-gradient-drift`}
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201, 168, 76, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(201, 168, 76, 0.15) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Orbiting concentric circles */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] animate-orbit ${!isHero && 'top-1/2'}`}>
        <div className={`rounded-full border ${isHero ? 'border-silk-gold/[0.06]' : 'border-silk-gold/[0.04]'}`} style={{ width: '100%', height: '100%' }} />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border ${isHero ? 'border-silk-gold/[0.04]' : 'border-silk-gold/[0.03]'}`} />
      </div>
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] animate-orbit-reverse ${!isHero && 'top-1/2'}`}>
        <div className="rounded-full border border-silk-gold/[0.03]" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Pulsing center circle */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-silk-gold/[0.08] animate-glow-pulse ${!isHero && 'top-1/2'}`} />

      {/* Floating gradient orbs */}
      <div
        className={`absolute top-[20%] left-[15%] w-64 h-64 rounded-full blur-[80px] animate-float ${isHero ? 'opacity-20' : 'opacity-10'}`}
        style={{ background: 'radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 70%)' }}
      />
      <div
        className={`absolute top-[60%] right-[10%] w-80 h-80 rounded-full blur-[100px] animate-float-slow ${isHero ? 'opacity-15' : 'opacity-8'}`}
        style={{ background: 'radial-gradient(circle, rgba(201, 168, 76, 0.35) 0%, transparent 70%)' }}
      />
      <div
        className={`absolute bottom-[25%] left-[25%] w-48 h-48 rounded-full blur-[60px] animate-float-slower ${isHero ? 'opacity-25' : 'opacity-12'}`}
        style={{ background: 'radial-gradient(circle, rgba(232, 201, 108, 0.3) 0%, transparent 70%)' }}
      />

      {/* Floating particles — more in hero variant */}
      {isHero && (
        <>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-silk-gold/30 animate-float"
              style={{
                top: `${15 + (i * 10) % 70}%`,
                left: `${(i * 17 + 10) % 85}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${10 + (i % 4) * 3}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Center vertical line accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 opacity-20"
        style={{ background: 'linear-gradient(180deg, transparent, #C9A84C)' }}
      />
    </div>
  )
}
