import { Check } from 'lucide-react'
import { FacultyAvatar } from '../ui'
import { FACULTY } from '../data/learn'
import { useRegistered, type Session } from '../data/grandRounds'
import { cn } from '../../lib/utils'

export const sessionHref = (s: Session) => `#/grand-rounds/session/${s.id}`
export const registerHref = (s: Session) => `#/grand-rounds/session/${s.id}/register`
export const liveHref = (s: Session) => `#/grand-rounds/live/${s.id}`

export function DateBlock({ session, dark = false, className }: { session: Session; dark?: boolean; className?: string }) {
  return (
    <div className={cn('w-14 shrink-0 rounded-lg text-center py-2', dark ? 'bg-white/10' : 'bg-[#f5f6f8]', className)}>
      <div className={cn('text-[11px] font-bold uppercase', dark ? 'text-[#e2c575]' : 'text-[#8a6d22]')}>{session.month}</div>
      <div className="font-serif text-2xl leading-none mt-0.5">{session.day}</div>
    </div>
  )
}

export function Speakers({ session, dark = false }: { session: Session; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <span className={cn('rounded-full ring-2', dark ? 'ring-[#0d2147]' : 'ring-white')}>
          <FacultyAvatar id={session.host} />
        </span>
        {session.guests.map((g) => (
          <span
            key={g.name}
            className={cn('w-10 h-10 rounded-full ring-2 font-serif text-xs flex items-center justify-center', dark ? 'ring-[#0d2147] bg-[#1a3260] text-[#e2c575]' : 'ring-white bg-[#e8edf5] text-[#0d2147]')}
          >
            {g.initials}
          </span>
        ))}
      </div>
      <p className={cn('text-sm leading-snug', dark ? 'text-white/80' : 'text-[#5a6a84]')}>
        <span className={cn('font-semibold', dark ? 'text-white' : 'text-[#0d2147]')}>{FACULTY[session.host].name}</span>
        {session.guests.length > 0 && <> + {session.guests.map((g) => g.name).join(', ')}</>}
      </p>
    </div>
  )
}

export function RegisteredBadge({ session, dark = false }: { session: Session; dark?: boolean }) {
  const registered = useRegistered(session.id)
  if (!registered) return null
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1', dark ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-700')}>
      <Check className="w-3.5 h-3.5" /> Registered
    </span>
  )
}
