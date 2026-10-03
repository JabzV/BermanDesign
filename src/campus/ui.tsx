import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import {
  Activity,
  FlaskConical,
  Dna,
  Heart,
  Brain,
  Syringe,
  Sparkles,
  Stethoscope,
  Leaf,
  Check,
  Lock,
  PlayCircle,
  FileText,
  ClipboardList,
  BookOpenText,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { FACULTY, type LessonType, type Status, type Tone, type TopicIcon } from './data/learn'

export const TOPIC_ICONS: Record<TopicIcon, LucideIcon> = {
  activity: Activity,
  flask: FlaskConical,
  dna: Dna,
  heart: Heart,
  brain: Brain,
  syringe: Syringe,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  leaf: Leaf,
}

export const LESSON_TYPE: Record<LessonType | 'library', { label: string; icon: LucideIcon }> = {
  video: { label: 'Video', icon: PlayCircle },
  reading: { label: 'Reading', icon: BookOpenText },
  case: { label: 'Case', icon: Stethoscope },
  quiz: { label: 'Knowledge check', icon: ClipboardList },
  library: { label: 'Library', icon: FileText },
}

const TONES: Record<Tone, { bg: string; fg: string }> = {
  navy: { bg: 'bg-linear-to-br from-[#1a3260] to-[#0d2147]', fg: 'text-white' },
  gold: { bg: 'bg-linear-to-br from-[#c9a84c] to-[#a8873a]', fg: 'text-white' },
  mist: { bg: 'bg-linear-to-br from-[#e8edf5] to-[#d1d9e6]', fg: 'text-[#0d2147]' },
}

export const buttonPrimary =
  'inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-[#0d2147] text-white text-sm font-bold hover:bg-[#1a3260] transition-colors disabled:bg-[#d1d9e6] disabled:text-[#5a6a84] disabled:cursor-not-allowed'
export const buttonSecondary =
  'inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full border border-[#d1d9e6] bg-white text-[#0d2147] text-sm font-semibold hover:border-[#0d2147] transition-colors'
export const buttonGold =
  'inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-[#c9a84c] text-[#0d2147] text-sm font-bold hover:bg-[#e2c575] transition-colors'

export function Card({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn('bg-white rounded-xl border border-[#d1d9e6]', className)} style={style}>
      {children}
    </div>
  )
}

export function SectionHeader({ title, action, href = '#' }: { title: string; action?: string; href?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="font-serif text-xl">{title}</h2>
      {action && (
        <a href={href} className="flex items-center gap-1 shrink-0 whitespace-nowrap text-sm text-[#5a6a84] hover:text-[#0d2147] transition-colors">
          {action}
          <ChevronRight className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}

export function ProgressBar({ value, className, tone = 'navy' }: { value: number; className?: string; tone?: 'navy' | 'gold' }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 rounded-full overflow-hidden', tone === 'gold' ? 'bg-white/15' : 'bg-[#e8edf5]', className)}
    >
      <div className={cn('h-full rounded-full', tone === 'gold' ? 'bg-[#c9a84c]' : 'bg-[#0d2147]')} style={{ width: `${value}%` }} />
    </div>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#8a6d22] border border-[#c9a84c]/40 rounded-full px-2 py-0.5',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TopicTile({ icon, tone, className, iconClassName }: { icon: TopicIcon; tone: Tone; className?: string; iconClassName?: string }) {
  const Icon = TOPIC_ICONS[icon]
  const t = TONES[tone]
  return (
    <div className={cn('flex items-center justify-center', t.bg, className)}>
      <Icon className={cn('w-8 h-8', t.fg, iconClassName)} strokeWidth={1.4} />
    </div>
  )
}

export function StatusIcon({ status, className }: { status: Status; className?: string }) {
  if (status === 'done')
    return (
      <span className={cn('w-7 h-7 rounded-full bg-[#0d2147] text-[#c9a84c] flex items-center justify-center shrink-0', className)}>
        <Check className="w-4 h-4" strokeWidth={2.5} />
        <span className="sr-only">Completed</span>
      </span>
    )
  if (status === 'current')
    return (
      <span className={cn('w-7 h-7 rounded-full border-2 border-[#c9a84c] bg-white flex items-center justify-center shrink-0', className)}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
        <span className="sr-only">In progress</span>
      </span>
    )
  if (status === 'locked')
    return (
      <span className={cn('w-7 h-7 rounded-full bg-[#e8edf5] text-[#5a6a84] flex items-center justify-center shrink-0', className)}>
        <Lock className="w-3.5 h-3.5" />
        <span className="sr-only">Locked</span>
      </span>
    )
  return (
    <span className={cn('w-7 h-7 rounded-full border-2 border-[#d1d9e6] bg-white shrink-0', className)}>
      <span className="sr-only">Not started</span>
    </span>
  )
}

export function FacultyAvatar({ id, size = 'md' }: { id: string; size?: 'sm' | 'md' }) {
  const f = FACULTY[id]
  const dim = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-10 h-10 text-xs'
  return f.photo ? (
    <img src={f.photo} alt="" className={cn(dim, 'rounded-full object-cover object-top bg-[#e8edf5] shrink-0')} />
  ) : (
    <span className={cn(dim, 'rounded-full bg-[#e8edf5] text-[#0d2147] font-serif flex items-center justify-center shrink-0')}>{f.initials}</span>
  )
}

export function EmptyState({ icon: Icon, title, body, action }: { icon: LucideIcon; title: string; body: string; action?: ReactNode }) {
  return (
    <Card className="px-6 py-12 text-center flex flex-col items-center">
      <span className="w-12 h-12 rounded-full bg-[#e8edf5] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#0d2147]" strokeWidth={1.8} />
      </span>
      <h3 className="font-serif text-lg mt-4">{title}</h3>
      <p className="text-sm text-[#5a6a84] mt-1 max-w-xs">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </Card>
  )
}

export function TabChips({ tabs, active, label = 'Sections' }: { tabs: { key: string; label: string; href: string; count?: number }[]; active: string; label?: string }) {
  const activeRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const el = activeRef.current
    const row = el?.closest('nav')
    if (el && row) row.scrollLeft = el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2
  }, [active])
  return (
    <nav aria-label={label} className="relative -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto [scrollbar-width:none]">
      <ul className="flex gap-2 w-max pr-4 sm:pr-0">
        {tabs.map((t) => {
          const isActive = t.key === active
          return (
            <li key={t.key}>
              <a
                href={t.href}
                ref={isActive ? activeRef : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 min-h-10 px-4 rounded-full text-sm whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-[#0d2147] text-white font-semibold'
                    : 'bg-white border border-[#d1d9e6] text-[#0d2147] hover:border-[#0d2147]',
                )}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className={cn('text-xs tabular-nums', isActive ? 'text-[#e2c575]' : 'text-[#5a6a84]')}>{t.count}</span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
