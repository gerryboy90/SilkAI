import { Link } from 'react-router-dom'
import { ArrowRight, Scale, Brain, FileText, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Argument Style Advisor',
    desc: 'Know which Silk-style argument will resonate with this judge — before you write your skeleton. Matched to senior barrister profiles.',
  },
  {
    icon: Scale,
    title: 'Judge Ruling Prediction',
    desc: 'See how this judge tends to rule on cases like yours. Precedent patterns, reasoning history, and a clear probability view.',
  },
  {
    icon: FileText,
    title: 'Argument Strength Scoring',
    desc: 'Every argument scored. Every weakness flagged. Pivots suggested so you know where to strengthen before you stand.',
  },
  {
    icon: Users,
    title: 'Known Barrister Profiles',
    desc: 'Barristers known for your case type — their styles, their strategies, and what you can apply in your own advocacy.',
  },
  {
    icon: Shield,
    title: 'Case Strategy Report',
    desc: 'Recommended approach, opposition arguments, risk areas, prep steps. One PDF. Ready for trial prep.',
  },
]

const suite = [
  { name: 'Lex Arena', tag: 'Learn', desc: 'Gamified legal debate for law students' },
  { name: 'Trial Chamber', tag: 'Practice', desc: 'Enterprise simulation for law firms' },
  { name: 'Silk AI', tag: 'Plan', desc: 'Strategic intelligence for senior counsel', active: true },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-silk-black text-silk-cream overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-silk-mid/20 bg-silk-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center border border-silk-gold/40">
              <span className="gold-text font-serif text-lg font-bold leading-none">S</span>
            </div>
            <span className="font-serif text-xl font-semibold tracking-wide">
              Silk <span className="gold-text">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-silk-silver hover:text-silk-cream text-sm font-medium transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="btn-gold text-sm py-2.5 px-5">
              Start your analysis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
        {/* Background geometric accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-silk-gold/5" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-silk-gold/3" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 opacity-20"
            style={{ background: 'linear-gradient(180deg, transparent, #C9A84C)' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="section-label mb-6 animate-fade-in">Nicrinze Tech Legal Suite</div>
          <h1
            className="font-serif text-6xl md:text-8xl font-semibold leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Where senior<br />
            counsel <span className="gold-text italic">plan</span>.
          </h1>
          <p
            className="text-silk-silver text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.25s', opacity: 0 }}
          >
            Upload a case brief. Get argument analysis, judge prediction, and a full strategy report in under 2 minutes — before you ever step into court.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <Link to="/register" className="btn-gold flex items-center gap-2 text-base">
              Begin your analysis <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-ghost text-base">
              Sign in to dashboard
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs font-mono tracking-widest text-silk-grey">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-silk-gold to-transparent" />
        </div>
      </section>

      {/* Demo video */}
      <section className="py-24 px-6 border-y border-silk-mid/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-4">See it in action</div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
              Strategic intelligence, in under a minute
            </h2>
          </div>
          <div className="relative rounded-lg overflow-hidden border border-silk-gold/20 bg-silk-charcoal">
            <video
              src="/demo.mp4"
              controls
              className="w-full aspect-video"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
            <div className="section-label mb-4">Intelligence Suite</div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">
              What you get from every analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-silk-mid/20">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-silk-black p-8 hover:bg-silk-charcoal transition-colors duration-300 group"
              >
                <div className="w-10 h-10 border border-silk-gold/20 flex items-center justify-center mb-6 group-hover:border-silk-gold/50 transition-colors duration-300">
                  <Icon size={18} className="text-silk-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-silk-gold transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-silk-grey text-sm leading-relaxed">{desc}</p>
              </div>
            ))}

            {/* Sixth cell: CTA */}
            <div className="bg-silk-black p-8 flex flex-col justify-end border border-silk-gold/10">
              <div className="section-label mb-4">Get started</div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                One brief. Full intelligence.
              </h3>
              <p className="text-silk-grey text-sm leading-relaxed mb-6">
                Senior barristers, QCs, law firm partners. Strategy before you step into court.
              </p>
              <Link to="/register" className="btn-gold text-sm self-start flex items-center gap-2">
                Get your first report <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Anonymization callout */}
      <section className="py-20 px-6 border-y border-silk-mid/20">
        <div className="max-w-3xl mx-auto text-center">
          <Shield size={32} className="text-silk-gold mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-3xl font-semibold mb-4">
            Client confidentiality, by design
          </h2>
          <p className="text-silk-grey leading-relaxed">
            Two-pass anonymization — spaCy NER plus Claude verification — before any AI sees your brief.
            Client names and identifiers stay redacted. Always.
          </p>
        </div>
      </section>

      {/* Product Suite */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Nicrinze Tech Legal Suite</div>
            <h2 className="font-serif text-3xl font-semibold">
              Three products. One career.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suite.map(({ name, tag, desc, active }) => (
              <div
                key={name}
                className={`p-6 border transition-all duration-300 ${
                  active
                    ? 'border-silk-gold/40 bg-silk-charcoal'
                    : 'border-silk-mid/30 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="section-label mb-3">{tag}</div>
                <h3 className={`font-serif text-2xl font-semibold mb-2 ${active ? 'gold-text' : ''}`}>
                  {name}
                </h3>
                <p className="text-silk-grey text-sm">{desc}</p>
                {active && (
                  <div className="mt-4 text-xs font-mono text-silk-gold/60">← You are here</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-silk-mid/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center border border-silk-gold/30">
              <span className="gold-text font-serif text-sm font-bold">S</span>
            </div>
            <span className="font-serif text-base text-silk-silver">Silk AI</span>
          </div>
          <p className="text-silk-grey text-xs font-mono text-center">
            © 2025 Nicrinze Tech. Built for the senior bar.
          </p>
          <div className="flex gap-6">
            <Link to="/login" className="text-silk-grey hover:text-silk-gold text-xs font-mono transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="text-silk-grey hover:text-silk-gold text-xs font-mono transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
