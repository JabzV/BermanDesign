import { motion } from 'motion/react'
import {
  ArrowRight,
  ChevronRight,
  Dna,
  FlaskConical,
  Activity,
  PlayCircle,
  FileText,
  Stethoscope,
  Calendar,
  Award,
  ShieldCheck,
  Clock,
} from 'lucide-react'
import { Card, SectionHeader } from './ui'
import CampusLayout from './CampusLayout'
import { cn } from '../lib/utils'
import drBermanPhoto from '../imports/drvbermasdn.png'

const CONTINUE_LEARNING = [
  {
    eyebrow: 'Advanced Certificate',
    title: 'Metabolic Flexibility in Clinical Practice',
    progress: 'Module 4 · Lesson 5 / 9',
    href: '#/learn/lesson/m4-5',
    pct: 55,
    icon: Activity,
    tone: 'from-[#1a3260] to-[#0d2147]',
  },
  {
    eyebrow: 'Certificate Course',
    title: 'Peptide Medicine: Foundations',
    progress: 'Lesson 2 / 8',
    href: '#/learn/courses',
    pct: 25,
    icon: FlaskConical,
    tone: 'from-[#c9a84c] to-[#a8873a]',
  },
  {
    eyebrow: 'Masterclass',
    title: 'Biomarkers of Healthy Aging',
    progress: 'Lesson 4 / 5',
    href: '#/learn/masterclasses',
    pct: 80,
    icon: Dna,
    tone: 'from-[#e8edf5] to-[#d1d9e6]',
  },
]

const PROGRAM_STATS = [
  { value: '3 / 6', label: 'Modules completed' },
  { value: '18.5', label: 'CME credits earned' },
  { value: '4', label: 'Grand Rounds attended' },
  { value: '6h', label: 'Studied this week' },
]

const RESEARCH_THIS_WEEK = [
  {
    tag: 'Journal Club',
    title: 'GLP-1 Weight Loss vs. Muscle Preservation: Navigating the Trade-Off',
    author: 'Dr. Sarah Chen',
    meta: '8 min read',
  },
  {
    tag: 'Research Brief',
    title: 'Biological Age Testing: Which Clocks Perform Best in Clinical Practice',
    author: 'Research Team',
    meta: '5 min read',
  },
  {
    tag: 'Clinical Insight',
    title: 'Mitochondrial Biogenesis Protocols: Evidence from Recent Trials',
    author: 'Dr. Marcus Torres',
    meta: '6 min read',
  },
]

const NEW_IN_LIBRARY = [
  { category: 'GLP-1', title: 'Titration Strategies for Complex Patients', type: 'Video', icon: PlayCircle, href: '#/library/item/v-glp1-titration' },
  { category: 'Clinical Cases', title: 'Insulin Resistance in a Lean 42-Year-Old', type: 'Case', icon: Stethoscope, href: '#/library/item/c-lean-ir' },
  { category: 'Hormones', title: 'Perimenopause and Metabolic Health', type: 'Article', icon: FileText, href: '#/library/item/a-perimenopause' },
]

const UPCOMING_ROUNDS = [
  { month: 'Oct', day: '24', title: 'Peptides in Musculoskeletal Recovery', speaker: 'Dr. Marcus Torres' },
  { month: 'Nov', day: '21', title: 'Biomarker Panels: What to Order and When', speaker: 'Dr. Sarah Chen' },
]

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})


function ContinueLearningHero() {
  return (
    <motion.section
      {...fade(0)}
      className="relative bg-[#0d2147] rounded-2xl overflow-hidden p-6 sm:p-8 grid xl:grid-cols-[300px_1fr] gap-8"
    >
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
      />
      <div className="relative flex flex-col">
        <span className="text-[#c9a84c] text-xs font-bold tracking-[0.15em] uppercase">Good morning, Dr. Reyes</span>
        <h2 className="font-serif text-white text-2xl sm:text-[28px] leading-snug mt-4">
          You're <span className="italic text-[#c9a84c]">58%</span> through the Advanced Certificate.
        </h2>
        <p className="text-white/60 text-sm mt-3">Longevity &amp; Metabolic Medicine</p>
        <div className="h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-[#c9a84c] rounded-full" style={{ width: '58%' }} />
        </div>
        <a
          href="#/learn"
          className="mt-6 xl:mt-auto self-start flex items-center gap-2 bg-white text-[#0d2147] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e2c575] transition-colors"
        >
          See All Learning
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="relative -mx-6 sm:-mx-8 xl:mx-0 px-6 sm:px-8 xl:px-0 flex gap-4 overflow-x-auto snap-x pb-1 [scrollbar-width:none]">
        {CONTINUE_LEARNING.map((c) => {
          const Icon = c.icon
          const lightTop = c.tone.includes('#e8edf5')
          return (
            <a
              key={c.title}
              href={c.href}
              className="snap-start shrink-0 w-60 bg-white rounded-xl overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              <div className={cn('h-28 bg-linear-to-br flex items-center justify-center', c.tone)}>
                <Icon
                  className={cn('w-12 h-12 group-hover:scale-110 transition-transform', lightTop ? 'text-[#0d2147]' : 'text-white')}
                  strokeWidth={1.3}
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">{c.eyebrow}</span>
                <h3 className="font-semibold text-sm leading-snug mt-1.5 min-h-10">{c.title}</h3>
                <p className="text-xs text-[#5a6a84] mt-3">{c.progress}</p>
                <div className="h-1 bg-[#e8edf5] rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-[#0d2147] rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </motion.section>
  )
}

function ProgramProgress() {
  return (
    <motion.section {...fade(0.1)}>
      <SectionHeader title="Program Progress" action="Program details" href="#/learn/program/advanced-certificate" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PROGRAM_STATS.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="font-serif text-2xl">{s.value}</div>
            <div className="text-sm text-[#5a6a84] mt-2 leading-snug">{s.label}</div>
          </Card>
        ))}
      </div>
    </motion.section>
  )
}

function ResearchThisWeek() {
  return (
    <motion.section {...fade(0.15)}>
      <SectionHeader title="Research This Week" action="View all" href="#/research" />
      <Card className="divide-y divide-[#d1d9e6]">
        {RESEARCH_THIS_WEEK.map((r) => (
          <a key={r.title} href="#/research" className="flex items-start gap-4 p-4 group">
            <div className="flex-1 min-w-0">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c]/30 rounded-full px-2 py-0.5">
                {r.tag}
              </span>
              <h3 className="font-semibold text-sm leading-snug mt-2 group-hover:text-[#1a3260]">{r.title}</h3>
              <p className="text-xs text-[#5a6a84] mt-1">
                {r.author} · {r.meta}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#5a6a84] mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </a>
        ))}
      </Card>
    </motion.section>
  )
}

function NewInLibrary() {
  return (
    <motion.section {...fade(0.2)}>
      <SectionHeader title="New in Clinical Library" action="View all" href="#/library" />
      <div className="grid sm:grid-cols-3 gap-3">
        {NEW_IN_LIBRARY.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="p-4 hover:border-[#c9a84c]/60 transition-colors">
              <a href={item.href} className="block">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#e8edf5] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0d2147]" strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] text-[#5a6a84]">{item.type}</span>
                </div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mt-4">{item.category}</span>
                <h3 className="font-semibold text-sm leading-snug mt-1">{item.title}</h3>
              </a>
            </Card>
          )
        })}
      </div>
    </motion.section>
  )
}

function UpcomingGrandRounds() {
  return (
    <motion.section {...fade(0.1)}>
      <SectionHeader title="Grand Rounds" action="All sessions" href="#/grand-rounds" />
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <img src={drBermanPhoto} alt="Dr. Dean Berman" className="w-12 h-12 rounded-full object-cover object-top bg-[#e8edf5]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">Next Live Session</span>
            <div className="text-xs text-[#5a6a84] mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Thu, Oct 9 · 7:00 PM ET
            </div>
          </div>
        </div>
        <h3 className="font-serif text-lg leading-snug mt-4">GLP-1 Beyond Weight Loss: Complex Clinical Cases</h3>
        <p className="text-xs text-[#5a6a84] mt-2">Dr. Dean Berman + Guest Faculty</p>
        <p className="text-xs text-[#5a6a84] mt-1">Live Case Review · Evidence Update · Q&amp;A</p>
        <button className="w-full mt-5 bg-[#0d2147] text-white py-2.5 rounded-full text-sm font-bold hover:bg-[#1a3260] transition-colors">
          Register
        </button>
      </Card>
      <Card className="mt-3 divide-y divide-[#d1d9e6]">
        {UPCOMING_ROUNDS.map((r) => (
          <a key={r.title} href="#/grand-rounds" className="flex items-center gap-4 p-4 group">
            <div className="w-11 text-center shrink-0">
              <div className="text-[#c9a84c] font-bold text-[10px] uppercase">{r.month}</div>
              <div className="font-serif text-xl leading-none">{r.day}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-snug">{r.title}</h4>
              <p className="text-xs text-[#5a6a84] mt-0.5">{r.speaker}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#5a6a84] shrink-0" />
          </a>
        ))}
      </Card>
    </motion.section>
  )
}

function CredentialsSummary() {
  return (
    <motion.section {...fade(0.2)}>
      <SectionHeader title="Credentials" action="View all" href="#/credentials" />
      <Card className="p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Professionally Verified
        </span>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#f5f6f8] rounded-lg p-3">
            <Award className="w-5 h-5 text-[#c9a84c]" />
            <div className="font-serif text-xl mt-2">2</div>
            <div className="text-xs text-[#5a6a84]">Certificates</div>
          </div>
          <div className="bg-[#f5f6f8] rounded-lg p-3">
            <Clock className="w-5 h-5 text-[#c9a84c]" />
            <div className="font-serif text-xl mt-2">18.5</div>
            <div className="text-xs text-[#5a6a84]">CME / CE credits</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#d1d9e6]">
          <div className="text-xs text-[#5a6a84]">Latest</div>
          <div className="text-sm font-semibold mt-0.5">Certificate of Completion — GLP-1 Fundamentals</div>
        </div>
      </Card>
    </motion.section>
  )
}

export default function CampusDashboard({ onSignOut }: { onSignOut: () => void }) {
  return (
    <CampusLayout active="home" title="Home" onSignOut={onSignOut}>
      <ContinueLearningHero />
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-10">
        <div className="flex flex-col gap-10 min-w-0">
          <ProgramProgress />
          <ResearchThisWeek />
          <NewInLibrary />
        </div>
        <div className="flex flex-col gap-10">
          <UpcomingGrandRounds />
          <CredentialsSummary />
        </div>
      </div>
    </CampusLayout>
  )
}
