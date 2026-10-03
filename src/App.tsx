import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { CSSProperties } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import AuthPage from './AuthPage'
import CampusApp from './campus/CampusApp'
import { isCampusHash, navigate } from './campus/router'
import {
  ArrowUpRight,
  BookOpen,
  Users,
  Award,
  Microscope,
  Network as NetworkIcon,
  GraduationCap,
  Lightbulb,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Play,
  Calendar,
  FileText,
  Star,
  Globe,
  Dna,
  Activity,
  Brain,
  Heart,
  Stethoscope,
  FlaskConical,
  Search,
} from 'lucide-react'
import { cn } from './lib/utils'
import logo from './imports/image-3.png'
import drBermanPhoto from './imports/drvbermasdn.png'
import drSarahChenPhoto from './imports/kjnd.png'
import heroLecturePhoto from './imports/asdff.png'
import grandRoundsCardPhoto from './imports/aasagfg.png'

function FadeUp({ children, delay = 0, className, style }: { children: React.ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const NAV_GROUPS = [
  {
    label: 'Education',
    items: [
      { label: 'Programs', href: '#programs' },
      { label: 'Grand Rounds', href: '#grand-rounds' },
      { label: 'Insights', href: '#insights' },
    ],
  },
  {
    label: 'Research & Network',
    items: [
      { label: 'Research', href: '#research' },
      { label: 'Professional Network', href: '#network' },
    ],
  },
  {
    label: 'Institution',
    items: [
      { label: 'About', href: '#about' },
      { label: 'Faculty', href: '#faculty' },
    ],
  },
]

const PROGRAMS = [
  {
    icon: Activity,
    label: 'Longevity Medicine',
    desc: 'Evidence-based protocols for healthspan optimization, biological age reversal, and disease prevention.',
    tag: 'Fellowship Program',
  },
  {
    icon: Dna,
    label: 'Metabolic Health',
    desc: 'Deep mastery of metabolic dysfunction, insulin signaling, and precision dietary interventions.',
    tag: 'Certificate',
  },
  {
    icon: FlaskConical,
    label: 'Peptide Medicine',
    desc: 'Comprehensive curriculum covering therapeutic peptides, dosing protocols, and clinical applications.',
    tag: 'Short Course',
  },
  {
    icon: Heart,
    label: 'GLP-1 Therapies',
    desc: 'Clinical framework for GLP-1 receptor agonists, patient selection, and outcome management.',
    tag: 'Certificate',
  },
  {
    icon: Brain,
    label: 'Biomarker Science',
    desc: 'Advanced interpretation of functional labs, genomic panels, and emerging diagnostic tools.',
    tag: 'Fellowship Program',
  },
  {
    icon: Star,
    label: 'Aesthetic Medicine',
    desc: 'Integration of aesthetic procedures within a longevity and wellness-centered practice framework.',
    tag: 'Short Course',
  },
]

const FACULTY = [
  {
    name: 'Dr. Dean Berman',
    title: 'Founder & Medical Director',
    specialty: 'Longevity & Metabolic Medicine',
    img: drBermanPhoto,
  },
  {
    name: 'Dr. Sarah Chen',
    title: 'Director of Research',
    specialty: 'Peptide Therapeutics',
    img: drSarahChenPhoto,
  },
  {
    name: 'Dr. Marcus Torres',
    title: 'Clinical Faculty',
    specialty: 'Biomarker & Genomics',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&auto=format',
  },
  {
    name: 'Dr. Leila Nouri',
    title: 'Faculty — Aesthetics',
    specialty: 'Regenerative Aesthetics',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&auto=format',
  },
]

const ROUNDS = [
  {
    date: 'Oct 14, 2026',
    title: 'GLP-1 Weight Loss vs. Muscle Preservation: Navigating the Trade-Off',
    speaker: 'Dr. Dean Berman',
    tag: 'Metabolic',
  },
  {
    date: 'Oct 28, 2026',
    title: 'Mitochondrial Biogenesis Protocols: Evidence from Recent Trials',
    speaker: 'Dr. Sarah Chen',
    tag: 'Longevity',
  },
  {
    date: 'Nov 11, 2026',
    title: 'Biomarker Interpretation in Aging: Beyond Standard Reference Ranges',
    speaker: 'Dr. Marcus Torres',
    tag: 'Biomarkers',
  },
]

const INSIGHTS = [
  {
    category: 'Clinical Review',
    title: 'The Emerging Role of Peptide BPC-157 in Gastrointestinal Repair',
    date: 'Sep 22, 2026',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=380&fit=crop&auto=format',
  },
  {
    category: 'Research Brief',
    title: 'Biological Age Testing: Which Clocks Perform Best in Clinical Practice',
    date: 'Sep 8, 2026',
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=380&fit=crop&auto=format',
  },
  {
    category: 'Faculty Perspective',
    title: 'Metabolic Flexibility as a Core Clinical Outcome: A Framework',
    date: 'Aug 30, 2026',
    img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&h=380&fit=crop&auto=format',
  },
]

function Navbar({ onSignIn, onApply }: { onSignIn: () => void; onApply: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#d1d9e6]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <img
            src={logo}
            alt="Berman Institute"
            className="h-10 object-contain mix-blend-multiply mt-0 mr-0 ml-0"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_GROUPS.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(group.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-[13px] font-medium text-[#5a6a84] hover:text-[#0d2147] transition-colors">
                {group.label}
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeDropdown === group.label && 'rotate-180')} />
              </button>
              {activeDropdown === group.label && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#d1d9e6] rounded-xl shadow-xl py-2 min-w-[180px]">
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-[13px] text-[#5a6a84] hover:text-[#0d2147] hover:bg-[#f5f6f8] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 text-[13px] font-medium text-[#5a6a84] hover:text-[#0d2147] transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onSignIn}
            className="px-4 py-2.5 text-[14px] font-medium text-[#5a6a84] hover:text-[#0d2147] transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onSignIn}
            className="flex items-center gap-2 bg-[#c9a84c] text-[#0d2147] px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-[#e2c575] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            Apply Now
          </button>
        </div>

        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-[#0d2147]">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer — portalled to body so fixed positioning works outside the fixed nav */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/30 z-[90]"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                key="drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[100] flex flex-col px-6 py-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <img src={logo} alt="Berman Institute" className="h-8 object-contain mix-blend-multiply" />
                  <button onClick={() => setMobileOpen(false)} className="p-2 text-[#5a6a84] hover:text-[#0d2147] transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.label}>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] px-2 pt-4 pb-1">{group.label}</div>
                      {group.items.map((item) => (
                        <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-sm text-[#0d2147] font-medium hover:text-[#c9a84c] transition-colors">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  ))}
                  <a href="#contact" onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-sm text-[#0d2147] font-medium mt-1">Contact</a>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <button
                    onClick={() => { setMobileOpen(false); onSignIn(); }}
                    className="w-full border border-[#0d2147] text-[#0d2147] text-center py-[10px] rounded-full text-sm font-semibold hover:bg-[#0d2147] hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); onApply(); }}
                    className="w-full bg-[#c9a84c] text-[#0d2147] text-center py-3 rounded-full text-sm font-semibold hover:bg-[#e2c575] transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  )
}

function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative min-h-screen bg-[#0d2147] overflow-hidden flex items-center pt-16">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      {/* Gold gradient orb */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#c9a84c] opacity-[0.06] blur-3xl translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#1a3260] opacity-60 blur-3xl -translate-x-1/4 translate-y-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase mb-8 block"
          >
            Medical Education Reimagined
          </motion.span>
          <h1 className="font-serif text-white leading-[1.1] mb-6">
            {['Train at the', 'frontier of', 'medicine.'].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`block text-5xl lg:text-6xl font-bold${i === 2 ? ' italic text-[#c9a84c] font-normal' : ''}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#a0b0cc] text-lg leading-relaxed max-w-md mb-10"
          >
            Berman Institute delivers structured professional programs and a lifelong clinical network
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={onApply}
              className="flex items-center justify-center gap-2 bg-[#c9a84c] text-[#0d2147] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#e2c575] transition-colors"
            >
              <Search className="w-4 h-4" />
              Explore Programs
            </button>
            <a
              href="#about"
              className="flex items-center justify-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:border-white/50 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              Learn More
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10"
          >
            {[
              { val: '12+', label: 'Clinical Programs' },
              { val: '800+', label: 'Graduates Worldwide' },
              { val: 'CME', label: 'Accredited Credits' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white font-serif">{s.val}</div>
                <div className="text-[#a0b0cc] text-xs mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — doctor image + floating cards */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden h-[560px]"
          >
            <img
              src={heroLecturePhoto}
              alt="Berman Institute Grand Rounds lecture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2147]/60 to-transparent" />
          </motion.div>
          {/* Floating card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-10 top-16 bg-white rounded-xl p-4 shadow-2xl w-52"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#0d2147]/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#0d2147]" />
              </div>
              <span className="text-base font-semibold text-[#0d2147]">My Campus</span>
            </div>
            <p className="text-[11px] text-[#5a6a84] leading-tight">
              Personalized learning paths and progress tracking in one place.
            </p>
          </motion.div>
          {/* Floating card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-8 bottom-24 bg-white rounded-xl shadow-2xl w-64 flex flex-row items-center gap-2 p-2"
          >
            <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={grandRoundsCardPhoto}
                alt="Grand Rounds session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center flex-1">
              <span className="text-[12px] font-bold text-[#0d2147] leading-snug mb-1">Live Grand Rounds Faculty Sessions</span>
              <p className="text-[11px] text-[#5a6a84] leading-tight">CME credits available.</p>
            </div>
          </motion.div>
          {/* Floating card 3 */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-6 bottom-10 bg-[#0d2147]/90 backdrop-blur rounded-xl p-4 shadow-2xl w-44 border border-white/10"
          >
            <div className="text-2xl font-bold text-white font-serif mb-1">40+</div>
            <div className="text-[#c9a84c] text-[11px] font-semibold uppercase tracking-wide">Expert Faculty</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left image collage */}
          <FadeUp className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-72">
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=600&fit=crop&auto=format"
                  alt="Medical education environment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-72 mt-10">
                <img
                  src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&h=600&fit=crop&auto=format"
                  alt="Clinical research"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* stat block */}
            <div className="absolute -bottom-6 left-8 bg-[#0d2147] text-white rounded-2xl p-6 shadow-xl">
              <div className="text-4xl font-bold font-serif mb-1">100%</div>
              <div className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest">CME Accredited</div>
            </div>
          </FadeUp>

          {/* Right */}
          <div>
            <FadeUp delay={0.1}><span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">About Us</span></FadeUp>
            <FadeUp delay={0.2}><h2 className="font-serif text-[#0d2147] text-4xl lg:text-5xl leading-tight mt-4 mb-6">
              A new kind of medical institution.
            </h2></FadeUp>
            <FadeUp delay={0.3}><p className="text-[#5a6a84] text-lg leading-relaxed mb-6">
              Berman Institute is a digital medical education ecosystem designed to train and engage healthcare professionals in longevity, metabolic health, and other areas of clinical science.
            </p></FadeUp>
            <FadeUp delay={0.35}><p className="text-[#5a6a84] leading-relaxed mb-8">
              Beyond education, the platform creates a long-term professional network where graduates remain connected through membership, research discussions, Journal Clubs, and faculty access.
            </p></FadeUp>
            <FadeUp delay={0.45}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: BookOpen, label: 'Structured Programs' },
                { icon: Award, label: 'Verified Credentials' },
                { icon: Users, label: 'Lifelong Network' },
                { icon: Microscope, label: 'Active Research' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0d2147]/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#0d2147]" />
                  </div>
                  <span className="text-[#0d2147] text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Programs({ onApply }: { onApply: () => void }) {
  return (
    <section id="programs" className="py-16 px-0" style={{ backgroundColor: 'rgb(246, 246, 246)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <FadeUp>
          <div>
            <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Education Programs</span>
            <h2 className="font-serif text-[#0d2147] text-4xl lg:text-5xl leading-tight mt-4">
              Clinical programs built<br />
              <span className="italic">for practitioners.</span>
            </h2>
          </div>
          </FadeUp>
          <button
            onClick={onApply}
            className="flex items-center gap-2 border border-[#0d2147] text-[#0d2147] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0d2147] hover:text-white transition-colors self-start lg:self-auto"
          >
            View All Programs
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => (
            <FadeUp key={p.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(13,33,71,0.12)' }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl p-7 transition-all group cursor-pointer border border-gray-200/80 flex flex-col h-full"
              style={{ background: 'linear-gradient(to bottom, #ffffff, #eaf0f8)' }}
            >
              <div className="flex justify-end mb-5">
                <button className="w-10 h-10 rounded-full bg-[#0d2147]/5 flex items-center justify-center hover:bg-[#0d2147] hover:text-white text-[#0d2147] transition-colors group-hover:bg-[#0d2147] group-hover:text-white">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-[#0d2147] font-bold text-[20px] mb-2">{p.label}</h3>
              <p className="text-[#5a6a84] text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
              <span className="self-start text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c]/30 rounded-full px-3 py-1">
                {p.tag}
              </span>
            </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faculty() {
  return (
    <section id="faculty" className="py-28 bg-[#0d2147] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Our Faculty</span>
          <h2 className="font-serif text-white text-4xl lg:text-5xl leading-tight mt-4">
            Meet the clinicians<br />
            <span className="italic text-[#c9a84c]">shaping the curriculum.</span>
          </h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY.map((f, i) => (
            <FadeUp key={f.name} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden h-72 mb-4">
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2147]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mb-1">{f.specialty}</div>
                </div>
              </div>
              <h3 className="text-white font-bold text-base">{f.name}</h3>
              <p className="text-[#a0b0cc] text-sm">{f.title}</p>
            </div>
            </FadeUp>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
          >
            <Users className="w-4 h-4" />
            View Full Faculty Directory
          </a>
        </div>
      </div>
    </section>
  )
}

function GrandRounds({ onApply }: { onApply: () => void }) {
  return (
    <section id="grand-rounds" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Grand Rounds</span>
            <h2 className="font-serif text-[#0d2147] text-4xl lg:text-5xl leading-tight mt-4 mb-6">
              Faculty-led case discussions, live and on-demand.
            </h2>
            <p className="text-[#5a6a84] leading-relaxed mb-8">
              Monthly Grand Rounds bring faculty and graduates together to examine real clinical cases, review
              emerging research, and discuss practical applications — with CME credit available for each session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onApply}
                className="flex items-center gap-2 bg-[#0d2147] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#1a3260] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Register for Next Session
              </button>
              <a
                href="#insights"
                className="flex items-center gap-2 text-[#0d2147] text-sm font-semibold"
              >
                <Play className="w-4 h-4" />
                Watch Recent Rounds
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {ROUNDS.map((r, i) => (
              <FadeUp key={r.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex gap-5 items-start bg-[#f5f6f8] rounded-xl p-5 border border-[#d1d9e6] hover:border-[#c9a84c]/50 transition-colors group cursor-pointer"
              >
                <div className="flex-shrink-0 text-center w-14">
                  <div className="text-[#c9a84c] font-bold text-xs uppercase">
                    {r.date.split(' ')[0]}
                  </div>
                  <div className="text-[#0d2147] font-bold text-2xl font-serif leading-none">
                    {r.date.split(' ')[1].replace(',', '')}
                  </div>
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c]/30 rounded-full px-2 py-0.5 mb-2">
                    {r.tag}
                  </span>
                  <h4 className="text-[#0d2147] font-semibold text-sm leading-snug mb-1">{r.title}</h4>
                  <p className="text-[#5a6a84] text-xs">{r.speaker}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#0d2147] ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="py-28 bg-[#f5f6f8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp><span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Research</span></FadeUp>
            <FadeUp delay={0.1}><h2 className="font-serif text-[#0d2147] text-4xl lg:text-5xl leading-tight mt-4 mb-6">
              From education platform to<br />
              <span className="italic">research institution.</span>
            </h2></FadeUp>
            <p className="text-[#5a6a84] leading-relaxed mb-6">
              Berman Institute is building active research initiatives in longevity biomarkers, metabolic
              interventions, and peptide therapeutics. Advanced members participate in structured research
              discussions and may join collaborative clinical studies.
            </p>
            <p className="text-[#5a6a84] leading-relaxed mb-8">
              Our Journal Club sessions provide a structured forum for reviewing and critiquing current literature,
              equipping clinicians with the critical appraisal skills needed to evaluate emerging evidence.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Microscope, label: 'Active Research Initiatives', desc: 'IRB-registered studies and pilot programs.' },
                { icon: FileText, label: 'Journal Club', desc: 'Monthly peer literature reviews with faculty moderation.' },
                { icon: Globe, label: 'Open Collaborations', desc: 'Multi-site clinical networks for experienced members.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-[#d1d9e6]">
                  <div className="w-10 h-10 rounded-full bg-[#0d2147]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#0d2147]" />
                  </div>
                  <div>
                    <div className="text-[#0d2147] font-semibold text-sm mb-0.5">{label}</div>
                    <div className="text-[#5a6a84] text-xs">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&h=700&fit=crop&auto=format"
                alt="Medical research laboratory"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#c9a84c] rounded-2xl p-6 shadow-xl">
              <div className="text-[#0d2147] font-bold text-3xl font-serif mb-1">3</div>
              <div className="text-[#0d2147] text-xs font-bold uppercase tracking-widest">Active Studies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Network() {
  return (
    <section id="network" className="py-28 bg-[#0d2147] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Professional Network</span>
          <h2 className="font-serif text-white text-4xl lg:text-5xl leading-tight mt-4 mb-6">
            A lifelong professional community for graduates.
          </h2>
          <p className="text-[#a0b0cc] leading-relaxed">
            Graduation is the beginning, not the end. Berman Institute members maintain access to faculty,
            research discussions, and a growing network of clinicians practicing at the frontier of medicine.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: NetworkIcon,
              title: 'Member Directory',
              desc: 'Connect with over 800 credentialed graduates practicing longevity and metabolic medicine worldwide.',
            },
            {
              icon: Lightbulb,
              title: 'Research Discussions',
              desc: 'Participate in curated peer discussions on emerging clinical evidence and protocol development.',
            },
            {
              icon: BookOpen,
              title: 'Clinical Library',
              desc: 'Searchable database of protocols, case reviews, and annotated research — exclusively for members.',
            },
            {
              icon: Users,
              title: 'Faculty Access',
              desc: 'Members retain direct access to faculty for clinical consultations and case-based guidance.',
            },
            {
              icon: Award,
              title: 'Continuing Education',
              desc: 'Annual CME credits, updated modules, and emerging topic courses keep credentials current.',
            },
            {
              icon: GraduationCap,
              title: 'Contribute & Teach',
              desc: 'Experienced members can become contributors, faculty, or research collaborators within the Institute.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.4)' }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/10 p-7 transition-colors group h-full"
            >
              <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-[#a0b0cc] text-sm leading-relaxed">{desc}</p>
            </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Admissions({ onApply }: { onApply: () => void }) {
  return (
    <section id="admissions" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          <div>
            <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Admissions</span>
            <h2 className="font-serif text-[#0d2147] text-4xl lg:text-5xl leading-tight mt-4 mb-6">
              Designed for<br />
              <span className="italic">practicing clinicians.</span>
            </h2>
            <p className="text-[#5a6a84] leading-relaxed mb-8">
              Berman Institute programs are designed for licensed healthcare professionals — physicians, NPs, PAs,
              and allied practitioners — who are ready to integrate evidence-based&nbsp;&nbsp;metabolic medicine into their practice.
            </p>
            <div className="flex flex-col gap-5 mb-10">
              {[
                { num: '01', label: 'Submit an Application', desc: 'Complete a short online application with your credentials and clinical background.' },
                { num: '02', label: 'Enrollment Review', desc: 'Applications are reviewed within 5 business days. You will receive a personalized program recommendation.' },
                { num: '03', label: 'Begin Your Campus', desc: 'Access My Campus and begin your curated learning path from day one.' },
              ].map((s) => (
                <div key={s.num} className="flex gap-5">
                  <div className="text-[#c9a84c] font-bold text-xl font-serif w-8 flex-shrink-0 leading-none mt-0.5">{s.num}</div>
                  <div>
                    <div className="text-[#0d2147] font-semibold text-sm mb-0.5">{s.label}</div>
                    <div className="text-[#5a6a84] text-sm">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onApply}
              className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0d2147] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e2c575] transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              Apply Now
            </button>
          </div>
          <FadeUp delay={0.15} className="grid gap-3" style={{ gridTemplateColumns: '3fr 2fr', gridTemplateRows: 'auto auto auto' }}>
            {/* Stat — Graduates: spans 2 rows */}
            <div className="bg-[#0d2147] rounded-2xl p-5 lg:p-7 flex flex-col justify-between" style={{ gridRow: '1 / 3' }}>
              <div>
                <div className="text-4xl lg:text-[72px] font-bold text-white font-serif leading-none">800+</div>
                <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mt-2 lg:mt-3">Global Graduates</div>
              </div>
              <p className="text-[#a0b0cc] text-xs lg:text-sm leading-relaxed mt-3 hidden sm:block">Physicians, NPs, and allied health professionals trained across 40+ countries.</p>
            </div>
            {/* Photo */}
            <div className="rounded-2xl overflow-hidden min-h-[110px]" style={{ gridRow: '1 / 2' }}>
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=260&fit=crop&auto=format"
                alt="Medical professionals in education"
                className="w-full h-full object-cover"
              />
            </div>
            {/* CME */}
            <div className="bg-[#1a3260] rounded-2xl p-4 lg:p-5 flex flex-col justify-between min-h-[100px]" style={{ gridRow: '2 / 3' }}>
              <div className="text-2xl lg:text-[48px] font-bold text-white font-serif leading-none">100%</div>
              <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mt-2">CME Accredited</div>
            </div>
            {/* Cohort — full width */}
            <div className="bg-[#c9a84c] rounded-2xl p-4 lg:p-6 flex items-center justify-between" style={{ gridColumn: '1 / 3', gridRow: '3 / 4' }}>
              <div>
                <div className="text-xl lg:text-[48px] font-bold text-[#0d2147] font-serif leading-none">Jan 2027</div>
                <div className="text-[#0d2147]/70 text-[10px] font-bold uppercase tracking-widest mt-1">Next Cohort Intake</div>
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-[38px] font-bold text-[#0d2147] font-serif leading-none">60</div>
                <div className="text-[#0d2147]/70 text-[10px] font-bold uppercase tracking-widest">Seats Per Cohort</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Insights() {
  return (
    <section id="insights" className="py-28 bg-[#f5f6f8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <FadeUp>
          <div>
            <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Insights</span>
            <h2 className="font-serif text-[#0d2147] text-4xl lg:text-5xl leading-tight mt-4">
              Clinical knowledge,<br />
              <span className="italic">continuously updated.</span>
            </h2>
          </div>
          </FadeUp>
          <a
            href="#"
            className="flex items-center gap-2 border border-[#0d2147] text-[#0d2147] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0d2147] hover:text-white transition-colors self-start lg:self-auto"
          >
            All Articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHTS.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(13,33,71,0.1)' }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#d1d9e6] group cursor-pointer h-full"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">{a.category}</span>
                <h3 className="text-[#0d2147] font-bold text-base leading-snug mt-2 mb-3">{a.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#5a6a84] text-xs">{a.date}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0d2147] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-28 bg-[#0d2147] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase">Contact</span>
            <h2 className="font-serif text-white text-4xl lg:text-5xl leading-tight mt-4 mb-6">
              Ready to begin?<br />
              <span className="italic text-[#c9a84c]">Let's talk.</span>
            </h2>
            <p className="text-[#a0b0cc] leading-relaxed mb-10">
              Our admissions team is available to answer questions about programs, eligibility, scheduling,
              and membership. Reach out and we'll respond within one business day.
            </p>
            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'admissions@bermaninstitute.com' },
                { icon: Phone, label: 'Phone', value: '+1 (888) 235-4600' },
                { icon: MapPin, label: 'Address', value: 'Miami, Florida — Virtual-first Institution' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-0.5">{label}</div>
                    <div className="text-white text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-white font-bold text-xl mb-6">Send Us a Message</h3>
            <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a0b0cc] text-xs font-semibold uppercase tracking-wide mb-2">First Name</label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50"
                    placeholder="Dr. Jane"
                  />
                </div>
                <div>
                  <label className="block text-[#a0b0cc] text-xs font-semibold uppercase tracking-wide mb-2">Last Name</label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#a0b0cc] text-xs font-semibold uppercase tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50"
                  placeholder="jane@hospital.com"
                />
              </div>
              <div>
                <label className="block text-[#a0b0cc] text-xs font-semibold uppercase tracking-wide mb-2">Profession</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50">
                  <option value="" className="bg-[#0d2147]">Select your profession</option>
                  <option value="md" className="bg-[#0d2147]">MD / DO</option>
                  <option value="np" className="bg-[#0d2147]">Nurse Practitioner</option>
                  <option value="pa" className="bg-[#0d2147]">Physician Assistant</option>
                  <option value="other" className="bg-[#0d2147]">Other Allied Health</option>
                </select>
              </div>
              <div>
                <label className="block text-[#a0b0cc] text-xs font-semibold uppercase tracking-wide mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50 resize-none"
                  placeholder="Tell us about your clinical background and which programs interest you..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c9a84c] text-[#0d2147] py-4 rounded-full font-bold text-sm hover:bg-[#e2c575] transition-colors mt-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#080f22] py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="Berman Institute" className="h-8 object-contain brightness-0 invert" />
            </div>
            <p className="text-[#5a6a84] text-sm leading-relaxed">
              A digital medical education ecosystem training healthcare professionals in longevity and emerging medicine.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              { heading: 'Education', links: ['Programs', 'Short Courses', 'Credentials', 'CME Credits'] },
              { heading: 'Community', links: ['Grand Rounds', 'Journal Club', 'Research', 'Network'] },
              { heading: 'Institution', links: ['About', 'Faculty', 'Admissions', 'Contact'] },
            ].map((col) => (
              <div key={col.heading}>
                <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-4">{col.heading}</div>
                <div className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <a key={l} href="#" className="text-[#5a6a84] text-sm hover:text-white transition-colors">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[#5a6a84] text-xs">© 2026 Berman Institute. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Accreditation'].map((l) => (
              <a key={l} href="#" className="text-[#5a6a84] text-xs hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [view, setView] = useState<'site' | 'auth' | 'campus'>(() => (isCampusHash() ? 'campus' : 'site'))
  const showAuth = () => setView('auth')
  const signIn = () => {
    navigate('/home')
    setView('campus')
  }
  const signOut = () => {
    history.pushState(null, '', window.location.pathname)
    setView('site')
  }

  return (
    <AnimatePresence mode="wait">
    {view === 'campus' ? (
      <motion.div key="campus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <CampusApp onSignOut={signOut} />
      </motion.div>
    ) : view === 'auth' ? (
      <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <AuthPage onBack={() => setView('site')} onSignIn={signIn} />
      </motion.div>
    ) : (
    <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div className="min-h-screen">
      <Navbar onSignIn={showAuth} onApply={showAuth} />
      <Hero onApply={showAuth} />
      <About />
      <Programs onApply={showAuth} />
      <Faculty />
      <GrandRounds onApply={showAuth} />
      <Research />
      <Network />
      <Admissions onApply={showAuth} />
      <Insights />
      <Contact />
      <Footer />
    </div>
    </motion.div>
    )}
    </AnimatePresence>
  )
}
