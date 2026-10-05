import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Home,
  BookOpen,
  Library,
  Microscope,
  Radio,
  Users,
  Award,
  UserCircle,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Settings,
} from 'lucide-react'
import { cn } from '../lib/utils'
import logo from '../imports/image-3.png'

export type CampusSection =
  | 'home'
  | 'learn'
  | 'library'
  | 'research'
  | 'grand-rounds'
  | 'network'
  | 'credentials'
  | 'profile'

const SIDEBAR_ITEMS: { key: CampusSection; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'learn', label: 'Learn', icon: BookOpen },
  { key: 'library', label: 'Clinical Library', icon: Library },
  { key: 'research', label: 'Research', icon: Microscope },
  { key: 'grand-rounds', label: 'Grand Rounds', icon: Radio },
  { key: 'network', label: 'Network', icon: Users },
  { key: 'credentials', label: 'Credentials', icon: Award },
  { key: 'profile', label: 'Profile', icon: UserCircle },
]

// Mobile exposes only five primary items (System Reference §5)
const MOBILE_ITEMS: CampusSection[] = ['home', 'learn', 'research', 'network', 'profile']
// Sections without a mobile tab highlight their parent (System Reference §5)
const MOBILE_PARENT: Partial<Record<CampusSection, CampusSection>> = {
  library: 'learn',
  'grand-rounds': 'home',
  credentials: 'profile',
}

const ACCOUNT_LINKS = [
  { label: 'Professional Profile', icon: UserCircle, href: '#/profile' },
  { label: 'Verification Status', icon: ShieldCheck, href: '#/profile/verification' },
  { label: 'Membership', icon: CreditCard, href: '#/profile/membership' },
  { label: 'Notifications', icon: Bell, href: '#/profile/notifications' },
  { label: 'Settings', icon: Settings, href: '#/profile/account' },
]

function AccountMenu({ onSignOut }: { onSignOut: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-3 rounded-full p-1 xl:pr-3 hover:bg-white transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-[#0d2147] text-[#c9a84c] font-serif text-sm flex items-center justify-center">
          AR
        </div>
        <div className="hidden xl:block leading-tight text-left">
          <div className="text-sm font-semibold">Dr. Ana Reyes</div>
          <div className="text-xs text-[#5a6a84]">Internal Medicine</div>
        </div>
        <ChevronDown className={cn('hidden xl:block w-4 h-4 text-[#5a6a84] transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top-right bg-white rounded-xl border border-[#d1d9e6] shadow-[0_12px_40px_-12px_rgba(13,33,71,0.25)] overflow-hidden z-40"
          >
            <div className="p-5 bg-[#0d2147] text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 text-[#c9a84c] font-serif flex items-center justify-center">
                  AR
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">Dr. Ana Reyes</div>
                  <div className="text-xs text-white/60 truncate">ana.reyes@clinic.com</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c]/40 rounded-full px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
                <span className="text-[11px] text-white/60">Professional Member</span>
              </div>
            </div>
            <div className="py-2">
              {ACCOUNT_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#0d2147] hover:bg-[#f5f6f8] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#5a6a84]" strokeWidth={1.8} />
                  {label}
                </a>
              ))}
            </div>
            <div className="border-t border-[#d1d9e6] py-2">
              <button
                role="menuitem"
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-[#c25b5b] hover:bg-[#fcf1f1] transition-colors"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.8} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface CampusLayoutProps {
  active: CampusSection
  title: string
  onSignOut: () => void
  children: ReactNode
  /** Parent page link, shown above the title. */
  back?: { label: string; href: string }
  /** Study mode (lesson, assessment): hides the mobile tab bar so the page can own the bottom edge. */
  focus?: boolean
}

export default function CampusLayout({ active, title, onSignOut, children, back, focus }: CampusLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f6f8] font-sans text-[#0d2147]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-white border-r border-[#d1d9e6] z-30">
        <a href="#/home" className="block px-7 pt-8 pb-10">
          <img src={logo} alt="Berman Institute" className="h-10 object-contain mix-blend-multiply" />
          <span className="block mt-3 text-[#8a6d22] text-[10px] font-bold tracking-[0.2em] uppercase">My Campus</span>
        </a>
        <nav className="flex-1 flex flex-col gap-1">
          {SIDEBAR_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = key === active
            return (
              <a
                key={key}
                href={`#/${key}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex items-center gap-4 px-7 py-3 text-sm transition-colors',
                  isActive ? 'text-[#0d2147] font-semibold' : 'text-[#5a6a84] hover:text-[#0d2147]',
                )}
              >
                {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#c9a84c]" />}
                <Icon className={cn('w-5 h-5', isActive && 'text-[#c9a84c]')} strokeWidth={isActive ? 2.2 : 1.8} />
                {label}
              </a>
            )
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#f5f6f8]/90 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 lg:h-20 flex items-center gap-2 sm:gap-4">
            <a href="#/home" className="lg:hidden shrink-0">
              <img src={logo} alt="Berman Institute" className="h-8 object-contain mix-blend-multiply" />
            </a>
            <div className="hidden lg:block min-w-0">
              {back && (
                <a href={back.href} className="flex items-center gap-1 text-xs text-[#5a6a84] hover:text-[#0d2147] transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  {back.label}
                </a>
              )}
              <h1 className={cn('font-serif truncate', back ? 'text-2xl' : 'text-3xl')}>{title}</h1>
            </div>
            <div className="ml-auto hidden md:flex items-center gap-3 bg-white border border-[#d1d9e6] rounded-full px-4 py-2.5 w-80 focus-within:border-[#c9a84c] transition-colors">
              <Search className="w-4 h-4 text-[#5a6a84]" />
              <input
                type="search"
                aria-label="Search My Campus"
                placeholder="Search courses, library, research…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#5a6a84]"
              />
            </div>
            <button aria-label="Search" className="md:hidden ml-auto w-11 h-11 flex items-center justify-center text-[#0d2147]">
              <Search className="w-5 h-5" />
            </button>
            <button aria-label="Notifications" className="relative w-11 h-11 flex items-center justify-center text-[#0d2147] hover:text-[#8a6d22] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#c9a84c] ring-2 ring-[#f5f6f8]" />
            </button>
            <AccountMenu onSignOut={onSignOut} />
          </div>
        </header>

        <main className={cn('max-w-[1200px] mx-auto px-4 sm:px-8 lg:pb-12', focus ? 'pb-32' : 'pb-28')}>
          <div className="lg:hidden mb-5">
            {back && (
              <a href={back.href} className="-ml-1 inline-flex items-center gap-1 min-h-9 text-sm text-[#5a6a84]">
                <ChevronLeft className="w-4 h-4" />
                {back.label}
              </a>
            )}
            {!focus && <h1 className="font-serif text-2xl">{title}</h1>}
          </div>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {!focus && (
        <nav aria-label="Primary" className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#d1d9e6] pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-5">
            {MOBILE_ITEMS.map((key) => {
              const item = SIDEBAR_ITEMS.find((i) => i.key === key)!
              const Icon = item.icon
              const isActive = key === active || MOBILE_PARENT[active] === key
              return (
                <a
                  key={key}
                  href={`#/${key}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center gap-1 py-3 text-[11px] font-medium',
                    isActive ? 'text-[#0d2147]' : 'text-[#5a6a84]',
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive && 'text-[#c9a84c]')} strokeWidth={isActive ? 2.2 : 1.8} />
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}
