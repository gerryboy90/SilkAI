import Navbar from './Navbar'
import AnimatedBackground from './AnimatedBackground'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-silk-black relative">
      <AnimatedBackground variant="subtle" />
      <Navbar />
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  )
}
