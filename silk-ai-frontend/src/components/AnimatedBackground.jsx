/**
 * Animated background with atmospheric gold glow, floating orbs, orbiting circles,
 * sparkle effects, and particles. Inspired by Gem+Jewel luxury brand aesthetic.
 * Variants: hero (rich, commanding), subtle (softer for auth/dashboard)
 */
export default function AnimatedBackground({ variant = 'hero', className = '' }) {
  const isHero = variant === 'hero'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large central radial glow — the "lit from within" effect */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-glow-breathe ${
          isHero
            ? 'w-[900px] h-[900px] opacity-[0.18]'
            : 'w-[600px] h-[600px] opacity-[0.07]'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.5) 0%, rgba(201, 168, 76, 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Gradient mesh — slow drift */}
      <div
        className={`absolute inset-0 animate-gradient-drift ${isHero ? 'opacity-[0.28]' : 'opacity-[0.10]'}`}
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201, 168, 76, 0.35) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(201, 168, 76, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232, 201, 108, 0.15) 0%, transparent 60%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Orbiting concentric circles — more visible */}
      <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-orbit ${isHero ? 'top-1/3' : 'top-1/2'}`}>
        <div
          className={`rounded-full border ${isHero ? 'border-silk-gold/[0.12]' : 'border-silk-gold/[0.06]'}`}
          style={{ width: '100%', height: '100%' }}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border ${
            isHero ? 'border-silk-gold/[0.08]' : 'border-silk-gold/[0.04]'
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border ${
            isHero ? 'border-silk-gold/[0.06]' : 'border-silk-gold/[0.03]'
          }`}
        />
      </div>
      <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] animate-orbit-reverse ${isHero ? 'top-1/3' : 'top-1/2'}`}>
        <div className={`rounded-full border ${isHero ? 'border-silk-gold/[0.06]' : 'border-silk-gold/[0.03]'}`} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Pulsing center circle with glow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full animate-glow-pulse ${isHero ? 'top-1/3' : 'top-1/2'}`}
        style={{
          border: `1px solid rgba(201, 168, 76, ${isHero ? 0.12 : 0.06})`,
          boxShadow: isHero
            ? '0 0 80px rgba(201, 168, 76, 0.06), inset 0 0 80px rgba(201, 168, 76, 0.03)'
            : '0 0 40px rgba(201, 168, 76, 0.03)',
        }}
      />

      {/* Floating gradient orbs — much larger and more visible */}
      <div
        className={`absolute top-[15%] left-[10%] w-96 h-96 rounded-full animate-float ${
          isHero ? 'opacity-[0.30]' : 'opacity-[0.12]'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.5) 0%, rgba(201, 168, 76, 0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className={`absolute top-[55%] right-[5%] w-[28rem] h-[28rem] rounded-full animate-float-slow ${
          isHero ? 'opacity-[0.25]' : 'opacity-[0.10]'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.45) 0%, rgba(201, 168, 76, 0.1) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className={`absolute bottom-[20%] left-[20%] w-72 h-72 rounded-full animate-float-slower ${
          isHero ? 'opacity-[0.35]' : 'opacity-[0.14]'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(232, 201, 108, 0.4) 0%, rgba(201, 168, 76, 0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Additional orb for hero — top-right warmth */}
      {isHero && (
        <div
          className="absolute top-[30%] right-[15%] w-80 h-80 rounded-full animate-float opacity-[0.20]"
          style={{
            background: 'radial-gradient(circle, rgba(232, 201, 108, 0.5) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animationDelay: '3s',
          }}
        />
      )}

      {/* Sparkle/starburst elements — diamond shapes that twinkle */}
      {isHero && (
        <>
          {[
            { top: '18%', left: '25%', size: 8, delay: 0 },
            { top: '28%', left: '72%', size: 6, delay: 0.8 },
            { top: '45%', left: '15%', size: 5, delay: 1.6 },
            { top: '22%', left: '55%', size: 7, delay: 2.2 },
            { top: '60%', left: '80%', size: 5, delay: 0.4 },
            { top: '35%', left: '85%', size: 4, delay: 1.2 },
          ].map((s, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-sparkle"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${2.5 + (i % 3) * 0.5}s`,
              }}
            >
              <div
                className="w-full h-full bg-silk-gold/60 rotate-45"
                style={{
                  boxShadow: '0 0 6px rgba(201, 168, 76, 0.6), 0 0 12px rgba(201, 168, 76, 0.3)',
                }}
              />
            </div>
          ))}
        </>
      )}

      {/* Floating particles — more numerous, varied sizes */}
      {isHero && (
        <>
          {[...Array(16)].map((_, i) => {
            const size = i < 4 ? 3 : i < 10 ? 2 : 1
            const glow = size >= 3
            return (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full animate-float"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: `rgba(201, 168, 76, ${0.3 + (i % 4) * 0.1})`,
                  top: `${12 + (i * 7) % 70}%`,
                  left: `${(i * 13 + 8) % 88}%`,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: `${8 + (i % 5) * 3}s`,
                  boxShadow: glow ? '0 0 4px rgba(201, 168, 76, 0.4)' : 'none',
                }}
              />
            )
          })}
        </>
      )}

      {/* Subtle variant particles — fewer but present */}
      {!isHero && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={`particle-s-${i}`}
              className="absolute w-px h-px rounded-full bg-silk-gold/20 animate-float"
              style={{
                top: `${15 + (i * 12) % 65}%`,
                left: `${(i * 17 + 10) % 85}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${12 + (i % 3) * 4}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Decorative gold lines — structural depth */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-px ${isHero ? 'h-64 opacity-[0.12]' : 'h-32 opacity-[0.06]'}`}
        style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }}
      />
      {isHero && (
        <>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-48 opacity-[0.08]"
            style={{ background: 'linear-gradient(0deg, transparent, #C9A84C, transparent)' }}
          />
          <div
            className="absolute top-1/2 left-0 h-px w-32 opacity-[0.06]"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          />
          <div
            className="absolute top-1/2 right-0 h-px w-32 opacity-[0.06]"
            style={{ background: 'linear-gradient(270deg, transparent, #C9A84C, transparent)' }}
          />
        </>
      )}
    </div>
  )
}
