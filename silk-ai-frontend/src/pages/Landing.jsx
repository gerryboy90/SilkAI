import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Scale, Brain, FileText, Users, Shield } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-silk-gold/10 bg-silk-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center border border-silk-gold/40 transition-all duration-300 hover:border-silk-gold hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
            >
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
        <AnimatedBackground variant="hero" />

        {/* Large decorative "S" watermark — like Gem+Jewel diamond */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <div
            className="font-serif font-bold leading-none opacity-[0.035]"
            style={{
              fontSize: '28rem',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96C 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            S
          </div>
          {/* Radial glow behind the watermark */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.12]"
            style={{
              background: 'radial-gradient(circle, rgba(201, 168, 76, 0.6) 0%, rgba(201, 168, 76, 0.1) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="section-label mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Nicrinze Tech Legal Suite
          </motion.div>
          <motion.h1
            className="font-serif text-7xl md:text-9xl font-semibold leading-[1.02] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Where senior<br />
            counsel <span className="gold-text italic">plan</span>.
          </motion.h1>
          <motion.p
            className="text-silk-silver text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Upload a case brief. Get argument analysis, judge prediction, and a full strategy report in under 2 minutes — before you ever step into court.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/register" className="btn-gold flex items-center gap-2 text-base">
              Begin your analysis <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-ghost text-base">
              Sign in to dashboard
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs font-mono tracking-widest text-silk-grey">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-silk-gold to-transparent" />
        </div>
      </section>

      {/* Demo video */}
      <section className="py-24 px-6">
        <div className="section-divider mb-24" />
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <div className="section-label mb-4">See it in action</div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
              Strategic intelligence, in under a minute
            </h2>
          </div>
          <div
            className="relative rounded-lg overflow-hidden border border-silk-gold/20 bg-silk-charcoal"
            style={{ boxShadow: '0 0 60px rgba(201, 168, 76, 0.06), 0 0 120px rgba(201, 168, 76, 0.03)' }}
          >
            <video
              src="/demo.mp4"
              controls
              className="w-full aspect-video"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label mb-4">Intelligence Suite</div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">
              What you get from every analysis
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-silk-mid/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                className="card-rich p-8 group"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 border border-silk-gold/20 flex items-center justify-center mb-6 transition-all duration-400
                    group-hover:border-silk-gold/50 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                >
                  <Icon size={18} className="text-silk-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-silk-gold transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-silk-grey text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}

            {/* Sixth cell: CTA */}
            <motion.div
              className="card-rich p-8 flex flex-col justify-end"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Anonymization callout */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center glass-panel p-12 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          {/* Glow behind shield */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-[0.08]"
            style={{
              background: 'radial-gradient(circle, rgba(201, 168, 76, 0.6) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <Shield size={36} className="text-silk-gold mx-auto mb-6 relative z-10" />
          <h2 className="font-serif text-3xl font-semibold mb-4 relative z-10">
            Client confidentiality, by design
          </h2>
          <p className="text-silk-grey leading-relaxed relative z-10">
            Two-pass anonymization — spaCy NER plus Claude verification — before any AI sees your brief.
            Client names and identifiers stay redacted. Always.
          </p>
        </motion.div>
      </section>

      {/* Product Suite */}
      <section className="py-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <div className="section-label mb-4">Nicrinze Tech Legal Suite</div>
            <h2 className="font-serif text-3xl font-semibold">
              Three products. One career.
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {suite.map(({ name, tag, desc, active }) => (
              <motion.div
                key={name}
                className={`p-6 border transition-all duration-400 ${
                  active
                    ? 'border-silk-gold/50 bg-silk-charcoal glow-gold'
                    : 'border-silk-mid/30 opacity-60 hover:opacity-90 hover:border-silk-gold/20 hover:shadow-[0_0_20px_rgba(201,168,76,0.05)]'
                }`}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <div className="section-label mb-3">{tag}</div>
                <h3 className={`font-serif text-2xl font-semibold mb-2 ${active ? 'gold-text' : ''}`}>
                  {name}
                </h3>
                <p className="text-silk-grey text-sm">{desc}</p>
                {active && (
                  <div className="mt-4 text-xs font-mono text-silk-gold/60">← You are here</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="section-divider" />
      <footer className="py-12 px-6">
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
