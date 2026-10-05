import { useEffect, useState, type ReactNode } from 'react'
import { UserCircle, ShieldCheck, CreditCard, Bell, Settings, CheckCircle2, AlertCircle } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { TabChips } from '../ui'
import { cn } from '../../lib/utils'

export type ProfileSection = 'profile' | 'verification' | 'membership' | 'notifications' | 'account'

export const PROFILE_SECTIONS: { key: ProfileSection; label: string; icon: typeof UserCircle; href: string }[] = [
  { key: 'profile', label: 'Professional Profile', icon: UserCircle, href: '#/profile' },
  { key: 'verification', label: 'Verification Status', icon: ShieldCheck, href: '#/profile/verification' },
  { key: 'membership', label: 'Membership', icon: CreditCard, href: '#/profile/membership' },
  { key: 'notifications', label: 'Notifications', icon: Bell, href: '#/profile/notifications' },
  { key: 'account', label: 'Account Settings', icon: Settings, href: '#/profile/account' },
]

export function ProfileLayout({ section, onSignOut, children }: { section: ProfileSection; onSignOut: () => void; children: ReactNode }) {
  return (
    <CampusLayout active="profile" title="Profile" onSignOut={onSignOut}>
      <div className="lg:hidden mb-6">
        <TabChips label="Profile sections" tabs={PROFILE_SECTIONS} active={section} />
      </div>
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Profile sections" className="hidden lg:block">
          <ul className="sticky top-24 flex flex-col gap-1">
            {PROFILE_SECTIONS.map(({ key, label, icon: Icon, href }) => {
              const active = key === section
              return (
                <li key={key}>
                  <a
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 min-h-11 px-3 rounded-lg text-sm transition-colors',
                      active ? 'bg-white border border-[#d1d9e6] font-semibold' : 'text-[#5a6a84] hover:text-[#0d2147] hover:bg-white/60',
                    )}
                  >
                    <Icon className={cn('w-4 h-4', active && 'text-[#8a6d22]')} />
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="min-w-0 max-w-3xl">{children}</div>
      </div>
    </CampusLayout>
  )
}

export function SectionTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        <h2 className="font-serif text-2xl">{title}</h2>
        {description && <p className="text-[#5a6a84] mt-1">{description}</p>}
      </div>
      {action}
    </div>
  )
}

/** Sticky bar shown while a form has unsaved changes. */
export function SaveBar({ dirty, onSave, onDiscard, saving }: { dirty: boolean; onSave: () => void; onDiscard: () => void; saving?: boolean }) {
  if (!dirty) return null
  return (
    <div className="sticky bottom-[76px] lg:bottom-4 z-20 mt-6">
      <div className="rounded-xl bg-[#0d2147] text-white p-3 pl-5 flex items-center gap-3 shadow-[0_12px_30px_-12px_rgba(13,33,71,0.5)]">
        <p className="text-sm flex-1">
          <span className="hidden sm:inline">You have unsaved changes</span>
          <span className="sm:hidden">Unsaved changes</span>
        </p>
        <button type="button" onClick={onDiscard} className="min-h-10 px-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
          Discard
        </button>
        <button type="button" onClick={onSave} disabled={saving} className="min-h-10 px-5 rounded-full bg-[#c9a84c] text-[#0d2147] text-sm font-bold hover:bg-[#e2c575] transition-colors disabled:opacity-60">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

/** Brief confirmation after saving. */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null)
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 2800)
    return () => clearTimeout(t)
  }, [message])
  const toast = (
    <div aria-live="polite" className="fixed left-1/2 -translate-x-1/2 bottom-24 lg:bottom-8 z-40 pointer-events-none">
      {message && (
        <p className="inline-flex items-center gap-2 rounded-full bg-[#0d2147] text-white text-sm font-semibold px-4 py-2.5 shadow-[0_10px_30px_-10px_rgba(13,33,71,0.6)]">
          <CheckCircle2 className="w-4 h-4 text-[#e2c575]" /> {message}
        </p>
      )}
    </div>
  )
  return { show: setMessage, toast }
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-[#b04848] inline-flex items-start gap-1.5">
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {children}
    </p>
  )
}

export function Row({ label, description, children }: { label: string; description?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        {description && <p className="text-sm text-[#5a6a84] mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

