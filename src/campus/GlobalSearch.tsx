import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, CornerDownLeft, ArrowUpRight, Clock, type LucideIcon, BookOpen, Library, Radio, Microscope, MessagesSquare, Users, PlayCircle } from 'lucide-react'
import { PROGRAM, COURSES, MASTERCLASSES, INTENSIVES, FACULTY } from './data/learn'
import { LIBRARY, TYPE_LABEL, TOPICS } from './data/library'
import { SESSIONS } from './data/grandRounds'
import { RESEARCH, RESEARCH_TYPE_LABEL } from './data/research'
import { MEMBERS, THREADS, THREAD_KIND_LABEL } from './data/network'
import { navigate } from './router'
import { cn } from '../lib/utils'

interface Result {
  id: string
  group: string
  title: string
  meta: string
  href: string
  keywords: string
}

const GROUPS: { name: string; icon: LucideIcon }[] = [
  { name: 'Learn', icon: BookOpen },
  { name: 'Clinical Library', icon: Library },
  { name: 'Grand Rounds', icon: Radio },
  { name: 'Research', icon: Microscope },
  { name: 'Discussions', icon: MessagesSquare },
  { name: 'Members', icon: Users },
]

const topic = (k: string) => TOPICS.find((t) => t.key === k)?.label ?? ''

function buildIndex(): Result[] {
  const r: Result[] = []
  r.push({ id: 'program', group: 'Learn', title: PROGRAM.title, meta: `Program · ${PROGRAM.progress}% complete`, href: '#/learn/program/advanced-certificate', keywords: 'advanced certificate program' })
  for (const m of PROGRAM.modules) {
    r.push({ id: `m${m.number}`, group: 'Learn', title: `Module ${m.number}: ${m.title}`, meta: `Advanced Certificate · ${m.status === 'locked' ? 'Locked' : m.status === 'done' ? 'Completed' : 'In progress'}`, href: `#/learn/program/advanced-certificate/module/${m.number}`, keywords: m.summary })
    for (const l of m.lessons)
      r.push({
        id: l.id,
        group: 'Learn',
        title: l.title,
        meta: `Lesson · Module ${m.number} · ${l.minutes} min`,
        href: l.type === 'quiz' ? `#/learn/assessment/${m.quizId}` : `#/learn/lesson/${l.id}`,
        keywords: `${FACULTY[l.faculty].name} ${l.type}`,
      })
  }
  for (const c of COURSES) r.push({ id: c.id, group: 'Learn', title: c.title, meta: `Certificate course · ${FACULTY[c.faculty].name}`, href: '#/learn/courses', keywords: 'course' })
  for (const c of MASTERCLASSES) r.push({ id: c.id, group: 'Learn', title: c.title, meta: `Masterclass · ${FACULTY[c.faculty].name}`, href: '#/learn/masterclasses', keywords: 'masterclass' })
  for (const i of INTENSIVES) r.push({ id: i.id, group: 'Learn', title: i.title, meta: `Clinical intensive · ${i.dates}`, href: '#/learn/intensives', keywords: `intensive ${i.format}` })
  for (const i of LIBRARY) r.push({ id: i.id, group: 'Clinical Library', title: i.title, meta: `${TYPE_LABEL[i.type]} · ${topic(i.topic)}`, href: `#/library/item/${i.id}`, keywords: `${i.summary} ${FACULTY[i.faculty].name} ${topic(i.topic)}` })
  for (const s of SESSIONS) r.push({ id: s.id, group: 'Grand Rounds', title: s.title, meta: `Live · ${s.weekday}, ${s.month} ${s.day}`, href: `#/grand-rounds/session/${s.id}`, keywords: `${s.summary} ${FACULTY[s.host].name} grand rounds` })
  for (const i of RESEARCH) r.push({ id: i.id, group: 'Research', title: i.title, meta: `${RESEARCH_TYPE_LABEL[i.type]} · ${i.author.name}`, href: `#/research/item/${i.id}`, keywords: `${i.summary} ${topic(i.topic)}` })
  for (const t of THREADS) r.push({ id: t.id, group: 'Discussions', title: t.title, meta: `${THREAD_KIND_LABEL[t.kind]} · ${t.replies} replies`, href: `#/network/thread/${t.id}`, keywords: `${t.body} ${topic(t.topic)}` })
  for (const m of MEMBERS) r.push({ id: m.id, group: 'Members', title: m.name, meta: `${m.specialty} · ${m.location}`, href: `#/network/member/${m.id}`, keywords: `${m.organization} ${m.standing}` })
  return r
}

const SUGGESTED = [
  { title: 'Resume: Metabolic Flexibility in Clinical Practice', meta: 'Module 4 · Lesson 5', href: '#/learn/lesson/m4-5', icon: PlayCircle },
  { title: 'Next Grand Rounds · Oct 9', meta: 'GLP-1 Beyond Weight Loss', href: '#/grand-rounds/session/gr-oct-9', icon: Radio },
  { title: 'Clinical Cases', meta: 'Clinical Library', href: '#/library/cases', icon: Library },
  { title: 'CME / CE record', meta: 'Credentials', href: '#/credentials/cme', icon: BookOpen },
]

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-[#c9a84c]/30 text-inherit rounded-sm px-0.5 -mx-0.5">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const index = useMemo(buildIndex, [])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState(['GLP-1 titration', 'ApoB', 'Zone 2', 'Dr. Sarah Chen'])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const q = query.trim().toLowerCase()
  const grouped = useMemo(() => {
    if (!q) return []
    const terms = q.split(/\s+/)
    const matches = index.filter((r) => {
      const hay = `${r.title} ${r.meta} ${r.keywords}`.toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
    return GROUPS.map((g) => {
      const all = matches.filter((m) => m.group === g.name)
      // Title matches first, then the rest.
      all.sort((a, b) => Number(!a.title.toLowerCase().includes(q)) - Number(!b.title.toLowerCase().includes(q)))
      return { ...g, items: all.slice(0, 5), total: all.length }
    }).filter((g) => g.items.length > 0)
  }, [index, q])

  const flat = q ? grouped.flatMap((g) => g.items) : SUGGESTED.map((s, i) => ({ id: `s${i}`, href: s.href }))
  const totalMatches = grouped.reduce((n, g) => n + g.total, 0)

  useEffect(() => setActive(0), [q])
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (href: string) => {
    if (q && !recent.includes(query.trim())) setRecent((r) => [query.trim(), ...r].slice(0, 5))
    onClose()
    navigate(href.replace(/^#/, ''))
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault()
      go(flat[active].href)
    }
  }

  let running = -1
  const option = (key: string, href: string, content: ReactNode) => {
    running++
    const idx = running
    return (
      <li key={key} role="option" id={`search-opt-${idx}`} aria-selected={active === idx} data-index={idx}>
        <button
          type="button"
          onClick={() => go(href)}
          onMouseMove={() => setActive(idx)}
          className={cn('w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors', active === idx ? 'bg-[#f5f6f8]' : '')}
        >
          {content}
          <CornerDownLeft className={cn('w-4 h-4 text-[#5a6a84] shrink-0 hidden sm:block', active === idx ? 'opacity-100' : 'opacity-0')} />
        </button>
      </li>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex sm:items-start justify-center sm:px-4 sm:pt-[10vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-[#0d2147]/45 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search My Campus"
        initial={{ opacity: 0, y: -8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.99 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-2xl h-dvh sm:h-auto sm:max-h-[75vh] flex flex-col bg-white sm:rounded-2xl shadow-[0_24px_60px_-20px_rgba(13,33,71,0.5)] overflow-hidden"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 px-4 border-b border-[#e8edf5] min-h-16 shrink-0">
          <Search className="w-5 h-5 text-[#5a6a84] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={flat.length ? `search-opt-${active}` : undefined}
            aria-autocomplete="list"
            placeholder="Search courses, library, research, members…"
            className="flex-1 min-w-0 bg-transparent text-[16px] outline-none focus-visible:outline-none placeholder:text-[#8392aa]"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search" className="w-9 h-9 rounded-full flex items-center justify-center text-[#5a6a84] hover:bg-[#f5f6f8]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-sm font-semibold text-[#5a6a84] hover:text-[#0d2147] min-h-11 px-2 sm:hidden">
            Cancel
          </button>
          <kbd className="hidden sm:inline-flex items-center rounded border border-[#d1d9e6] px-1.5 py-0.5 text-[11px] text-[#5a6a84] font-sans">Esc</kbd>
        </div>

        <div ref={listRef} id="search-results" className="flex-1 overflow-y-auto py-2" role="listbox" aria-label="Search results">
          {!q && (
            <>
              <div className="px-4 pt-2 pb-3">
                <h3 className="text-xs font-semibold text-[#5a6a84]">Recent searches</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button key={r} onClick={() => setQuery(r)} className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-full border border-[#d1d9e6] text-sm hover:border-[#0d2147] transition-colors">
                      <Clock className="w-3.5 h-3.5 text-[#5a6a84]" /> {r}
                    </button>
                  ))}
                </div>
              </div>
              <h3 className="px-4 pt-2 pb-1 text-xs font-semibold text-[#5a6a84]">Jump to</h3>
              <ul>
                {SUGGESTED.map((s, i) => {
                  const Icon = s.icon
                  return option(
                    `s${i}`,
                    s.href,
                    <>
                      <span className="w-9 h-9 rounded-lg bg-[#e8edf5] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#0d2147]" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold truncate">{s.title}</span>
                        <span className="block text-xs text-[#5a6a84] truncate">{s.meta}</span>
                      </span>
                    </>,
                  )
                })}
              </ul>
            </>
          )}

          {q && grouped.length === 0 && (
            <div className="px-6 py-14 text-center">
              <Search className="w-6 h-6 text-[#5a6a84] mx-auto" />
              <p className="font-semibold mt-3">No results for “{query.trim()}”</p>
              <p className="text-sm text-[#5a6a84] mt-1">Check the spelling, or try a topic like GLP-1, biomarkers or peptides.</p>
            </div>
          )}

          {q &&
            grouped.map((g) => {
              const Icon = g.icon
              return (
                <section key={g.name} className="pb-1">
                  <h3 className="px-4 pt-3 pb-1 text-xs font-semibold text-[#5a6a84] flex items-center justify-between">
                    <span>{g.name}</span>
                    {g.total > g.items.length && <span className="font-normal tabular-nums">{g.total} results</span>}
                  </h3>
                  <ul>
                    {g.items.map((r) =>
                      option(
                        r.id,
                        r.href,
                        <>
                          <span className="w-9 h-9 rounded-lg bg-[#e8edf5] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[#0d2147]" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold truncate">
                              <Highlight text={r.title} query={query} />
                            </span>
                            <span className="block text-xs text-[#5a6a84] truncate">{r.meta}</span>
                          </span>
                        </>,
                      ),
                    )}
                  </ul>
                </section>
              )
            })}
        </div>

        <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 border-t border-[#e8edf5] text-xs text-[#5a6a84] shrink-0">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-[#d1d9e6] px-1 font-sans">↑</kbd>
            <kbd className="rounded border border-[#d1d9e6] px-1 font-sans">↓</kbd> to move
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-[#d1d9e6] px-1 font-sans">Enter</kbd> to open
          </span>
          {q && <span className="ml-auto tabular-nums" aria-live="polite">{totalMatches} matches</span>}
          {!q && (
            <a href="#/library" onClick={onClose} className="ml-auto inline-flex items-center gap-1 hover:text-[#0d2147]">
              Browse the Clinical Library <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Header trigger (field on desktop, icon on mobile) plus the search dialog. Ctrl/⌘ + K opens it. */
export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="ml-auto hidden md:flex items-center gap-3 bg-white border border-[#d1d9e6] rounded-full pl-4 pr-2 min-h-11 w-80 text-left hover:border-[#0d2147]/40 transition-colors"
      >
        <Search className="w-4 h-4 text-[#5a6a84] shrink-0" />
        <span className="flex-1 text-sm text-[#5a6a84] truncate">Search courses, library, research…</span>
        <kbd className="rounded border border-[#d1d9e6] px-1.5 py-0.5 text-[11px] text-[#5a6a84] font-sans">Ctrl K</kbd>
      </button>
      <button onClick={() => setOpen(true)} aria-label="Search" aria-haspopup="dialog" className="md:hidden ml-auto w-11 h-11 flex items-center justify-center text-[#0d2147]">
        <Search className="w-5 h-5" />
      </button>
      {createPortal(<AnimatePresence>{open && <SearchDialog onClose={close} />}</AnimatePresence>, document.body)}
    </>
  )
}
