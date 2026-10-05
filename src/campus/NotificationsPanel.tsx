import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Bell, Radio, MessageSquare, MessageCircleQuestion, Award, BookOpen, Microscope, Users, Settings, X, BellOff, type LucideIcon } from 'lucide-react'
import { NOTIFICATIONS, type NotificationKind } from './data/notifications'
import { cn } from '../lib/utils'

const KIND_ICON: Record<NotificationKind, LucideIcon> = {
  'grand-rounds': Radio,
  reply: MessageSquare,
  faculty: MessageCircleQuestion,
  credential: Award,
  program: BookOpen,
  research: Microscope,
  cohort: Users,
}

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(NOTIFICATIONS)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const ref = useRef<HTMLDivElement>(null)
  const unread = items.filter((n) => n.unread).length

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

  // Close when navigating via a notification link.
  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const shown = items.filter((n) => filter === 'all' || n.unread)
  const groups = [...new Set(shown.map((n) => n.group))]
  const markRead = (id: string) => setItems((list) => list.map((n) => (n.id === id ? { ...n, unread: false } : n)))

  return (
    <div ref={ref} className="sm:relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
        className={cn('relative w-11 h-11 rounded-full flex items-center justify-center transition-colors', open ? 'bg-white text-[#0d2147]' : 'text-[#0d2147] hover:text-[#8a6d22]')}
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#c9a84c] text-[#0d2147] text-[10px] font-bold leading-4 text-center tabular-nums ring-2 ring-[#f5f6f8]">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Notifications"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed sm:absolute inset-x-3 sm:inset-x-auto top-16 sm:top-full sm:right-0 sm:mt-2 sm:w-[400px] max-h-[calc(100dvh-9.5rem)] sm:max-h-[min(640px,calc(100vh-7rem))] flex flex-col bg-white rounded-xl border border-[#d1d9e6] shadow-[0_16px_48px_-16px_rgba(13,33,71,0.35)] overflow-hidden z-40"
          >
            <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-[#e8edf5]">
              <h2 className="font-serif text-lg">Notifications</h2>
              <div className="flex items-center gap-1">
                {unread > 0 && (
                  <button onClick={() => setItems((list) => list.map((n) => ({ ...n, unread: false })))} className="text-xs font-semibold min-h-9 px-2 rounded-md hover:bg-[#f5f6f8]">
                    Mark all as read
                  </button>
                )}
                <button onClick={() => setOpen(false)} aria-label="Close notifications" className="w-9 h-9 rounded-full flex items-center justify-center text-[#5a6a84] hover:bg-[#f5f6f8] sm:hidden">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div role="group" aria-label="Filter notifications" className="flex gap-1 px-4 py-2">
              {(['all', 'unread'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn('min-h-8 px-3 rounded-full text-xs capitalize', filter === f ? 'bg-[#0d2147] text-white font-semibold' : 'text-[#5a6a84] hover:bg-[#f5f6f8]')}
                >
                  {f === 'unread' ? `Unread (${unread})` : 'All'}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto flex-1">
              {shown.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <BellOff className="w-6 h-6 text-[#5a6a84] mx-auto" />
                  <p className="font-semibold text-sm mt-3">You're all caught up</p>
                  <p className="text-sm text-[#5a6a84] mt-1">New activity will appear here.</p>
                </div>
              ) : (
                groups.map((g) => (
                  <section key={g}>
                    <h3 className="px-4 pt-3 pb-1 text-xs font-semibold text-[#5a6a84]">{g}</h3>
                    <ul>
                      {shown
                        .filter((n) => n.group === g)
                        .map((n) => {
                          const Icon = KIND_ICON[n.kind]
                          return (
                            <li key={n.id}>
                              <a href={n.href} onClick={() => markRead(n.id)} className={cn('flex gap-3 px-4 py-3 hover:bg-[#f5f6f8] transition-colors', n.unread && 'bg-[#fbf9f2]')}>
                                <span className="w-9 h-9 rounded-full bg-[#e8edf5] flex items-center justify-center shrink-0">
                                  <Icon className="w-4 h-4 text-[#0d2147]" />
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className={cn('block text-sm leading-snug', n.unread ? 'font-semibold' : 'font-medium')}>{n.title}</span>
                                  <span className="block text-sm text-[#5a6a84] mt-0.5 line-clamp-2">{n.body}</span>
                                  <span className="block text-xs text-[#5a6a84] mt-1">{n.time}</span>
                                </span>
                                {n.unread && (
                                  <span className="w-2 h-2 rounded-full bg-[#c9a84c] shrink-0 mt-1.5">
                                    <span className="sr-only">Unread</span>
                                  </span>
                                )}
                              </a>
                            </li>
                          )
                        })}
                    </ul>
                  </section>
                ))
              )}
            </div>

            <a href="#/profile/notifications" className="flex items-center justify-center gap-2 min-h-12 border-t border-[#e8edf5] text-sm font-semibold hover:bg-[#f5f6f8] transition-colors">
              <Settings className="w-4 h-4 text-[#5a6a84]" /> Notification settings
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
