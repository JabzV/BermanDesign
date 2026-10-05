import { useState } from 'react'
import {
  Play,
  ArrowRight,
  Bookmark,
  BookmarkX,
  Check,
  CalendarDays,
  MapPin,
  MonitorPlay,
  Award,
  GraduationCap,
  Clock,
} from 'lucide-react'
import CampusLayout from '../CampusLayout'
import {
  Card,
  ProgressBar,
  TopicTile,
  TabChips,
  EmptyState,
  FacultyAvatar,
  LESSON_TYPE,
  buttonPrimary,
  buttonSecondary,
} from '../ui'
import {
  PROGRAM,
  COURSES,
  MASTERCLASSES,
  INTENSIVES,
  SAVED,
  COMPLETED,
  FACULTY,
  findLesson,
  type CatalogItem,
} from '../data/learn'
import { cn } from '../../lib/utils'
import lecturePhoto from '../../imports/asdff.png'

export type LearnTab = 'programs' | 'courses' | 'masterclasses' | 'intensives' | 'saved' | 'completed'

const TABS: { key: LearnTab; label: string; count?: number }[] = [
  { key: 'programs', label: 'My Programs', count: 1 },
  { key: 'courses', label: 'My Courses', count: COURSES.filter((c) => c.enrolled).length },
  { key: 'masterclasses', label: 'Masterclasses', count: MASTERCLASSES.filter((c) => c.enrolled).length },
  { key: 'intensives', label: 'Clinical Intensives', count: INTENSIVES.filter((i) => i.registered).length },
  { key: 'saved', label: 'Saved', count: SAVED.length },
  { key: 'completed', label: 'Completed', count: COMPLETED.length },
]

function ResumeCard() {
  const found = findLesson('m4-5')!
  const { lesson, module, index } = found
  return (
    <a
      href={`#/learn/lesson/${lesson.id}`}
      className="group block bg-[#0d2147] rounded-2xl overflow-hidden text-white sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
    >
      <div className="relative aspect-video sm:aspect-auto sm:min-h-full overflow-hidden">
        <img src={lecturePhoto} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d2147]/80 via-[#0d2147]/10 to-transparent sm:bg-linear-to-r sm:from-transparent sm:via-transparent sm:to-[#0d2147]/60" />
        <span className="absolute left-4 bottom-4 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bottom-auto w-14 h-14 rounded-full bg-white text-[#0d2147] flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] group-hover:bg-[#e2c575] transition-colors">
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
        </span>
        <span className="absolute right-4 bottom-4 text-xs font-semibold tabular-nums bg-[#0d2147]/80 rounded-md px-2 py-1">14 min left</span>
      </div>
      <div className="p-5 sm:p-7 flex flex-col">
        <p className="text-sm text-white/70">
          Pick up where you left off · Module {module.number}, Lesson {index + 1}
        </p>
        <h2 className="font-serif text-2xl leading-snug mt-2 text-balance">{lesson.title}</h2>
        <div className="flex items-center gap-2 mt-3 text-sm text-white/70">
          <FacultyAvatar id={lesson.faculty} size="sm" />
          {FACULTY[lesson.faculty].name}
        </div>
        <div className="mt-6 sm:mt-auto pt-2">
          <div className="flex justify-between text-xs text-white/70 mb-2 tabular-nums">
            <span>{PROGRAM.shortTitle}</span>
            <span>{PROGRAM.progress}% complete</span>
          </div>
          <ProgressBar value={PROGRAM.progress} tone="gold" />
          <span className="mt-5 inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-white text-[#0d2147] text-sm font-bold group-hover:bg-[#e2c575] transition-colors">
            Resume lesson
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  )
}

function ProgramsTab() {
  const current = PROGRAM.modules.find((m) => m.status === 'current')!
  const nextLesson = current.lessons.find((l) => l.status === 'current')!
  const modulesDone = PROGRAM.modules.filter((m) => m.status === 'done').length
  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#d1d9e6]">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-xl bg-[#0d2147] text-[#c9a84c] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-[#5a6a84]">{PROGRAM.cohort}</p>
              <h3 className="font-serif text-xl leading-snug mt-0.5 text-balance">{PROGRAM.title}</h3>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-2 tabular-nums">
              <span className="text-[#5a6a84]">
                {modulesDone} of {PROGRAM.modules.length} modules
              </span>
              <span className="font-semibold">{PROGRAM.progress}%</span>
            </div>
            <ProgressBar value={PROGRAM.progress} />
          </div>
          <dl className="grid grid-cols-2 gap-4 mt-5 text-sm">
            <div>
              <dt className="text-[#5a6a84]">CME / CE credits</dt>
              <dd className="font-semibold mt-0.5 tabular-nums">
                {PROGRAM.cmeEarned} of {PROGRAM.cmeTotal}
              </dd>
            </div>
            <div>
              <dt className="text-[#5a6a84]">Target completion</dt>
              <dd className="font-semibold mt-0.5">{PROGRAM.targetCompletion}</dd>
            </div>
          </dl>
        </div>
        <a href={`#/learn/lesson/${nextLesson.id}`} className="flex items-center gap-4 p-5 sm:px-6 hover:bg-[#f5f6f8] transition-colors">
          <TopicTile icon={current.icon} tone="navy" className="w-11 h-11 rounded-lg shrink-0" iconClassName="w-5 h-5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#5a6a84]">Next up · Module {current.number}</p>
            <p className="text-sm font-semibold truncate">{nextLesson.title}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#5a6a84] shrink-0" />
        </a>
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <a href="#/learn/program/advanced-certificate" className={cn(buttonPrimary, 'w-full sm:w-auto')}>
            Open program
          </a>
        </div>
      </Card>

      <div className="rounded-xl border border-dashed border-[#c5cfdf] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-[#5a6a84]">Future Advanced Programs</p>
          <h3 className="font-semibold mt-0.5">Advanced Certificate in Regenerative &amp; Aesthetic Medicine</h3>
          <p className="text-sm text-[#5a6a84] mt-1">Applications open in 2027 for graduates and members.</p>
        </div>
        <button className={cn(buttonSecondary, 'shrink-0')}>Notify me</button>
      </div>
    </div>
  )
}

function CatalogList({ items, kind }: { items: CatalogItem[]; kind: 'course' | 'masterclass' }) {
  const enrolled = items.filter((i) => i.enrolled)
  const available = items.filter((i) => !i.enrolled)
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="font-serif text-xl mb-4">In progress</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {enrolled.map((item) => (
            <a key={item.id} href={item.href} className="group">
              <Card className="flex gap-4 p-4 h-full group-hover:border-[#0d2147]/40 transition-colors">
                <TopicTile icon={item.icon} tone={item.tone} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-[#5a6a84] mt-1">{FACULTY[item.faculty].name}</p>
                  <div className="mt-auto pt-3">
                    <div className="flex justify-between text-xs text-[#5a6a84] mb-1.5 tabular-nums">
                      <span>
                        Lesson {Math.max(1, Math.round(((item.progress ?? 0) / 100) * item.lessons))} of {item.lessons}
                      </span>
                      <span>{item.progress}%</span>
                    </div>
                    <ProgressBar value={item.progress ?? 0} />
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl">{kind === 'course' ? 'Certificate courses to explore' : 'More masterclasses'}</h2>
        <p className="text-sm text-[#5a6a84] mt-1 mb-4">
          {kind === 'course'
            ? 'Each course counts toward CME and prepares you for the Advanced Certificate.'
            : 'Short, focused sessions with faculty. Most take one evening.'}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {available.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col">
              <TopicTile icon={item.icon} tone={item.tone} className="h-24" iconClassName="w-9 h-9" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                <p className="text-xs text-[#5a6a84] mt-1">{FACULTY[item.faculty].name}</p>
                <p className="flex items-center gap-3 text-xs text-[#5a6a84] mt-3 tabular-nums">
                  <span>{item.lessons} lessons</span>
                  <span>{item.hours} h</span>
                  <span>{item.cme} CME</span>
                </p>
                <button className={cn(buttonSecondary, 'mt-4 w-full')}>View {kind === 'course' ? 'course' : 'masterclass'}</button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

function IntensivesTab() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-[#5a6a84] mb-1">Small-group, faculty-led training. Seats are limited and confirmed after registration.</p>
      {INTENSIVES.map((it) => (
        <Card key={it.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex gap-4 flex-1 min-w-0">
            <div className="w-14 shrink-0 rounded-lg bg-[#f5f6f8] text-center py-2">
              <div className="text-[11px] font-bold uppercase text-[#8a6d22]">{it.month}</div>
              <div className="font-serif text-2xl leading-none mt-0.5">{it.day}</div>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base leading-snug">{it.title}</h3>
              <p className="text-xs text-[#5a6a84] mt-1">{FACULTY[it.faculty].name}</p>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5a6a84] mt-2">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" /> {it.dates}
                </span>
                <span className="inline-flex items-center gap-1">
                  {it.format === 'Virtual' ? <MonitorPlay className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  {it.format}
                </span>
                <span className="tabular-nums">{it.cme} CME</span>
              </p>
            </div>
          </div>
          <div className="sm:w-44 shrink-0 flex sm:flex-col items-center sm:items-end gap-3 justify-between">
            {it.registered ? (
              <>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  <Check className="w-4 h-4" /> Registered
                </span>
                <button className={buttonSecondary}>View details</button>
              </>
            ) : (
              <>
                <span className="text-xs text-[#5a6a84] tabular-nums">{it.seatsLeft} seats left</span>
                <button className={buttonPrimary}>Reserve a seat</button>
              </>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}

function SavedTab() {
  const [items, setItems] = useState(SAVED)
  if (items.length === 0)
    return (
      <EmptyState
        icon={Bookmark}
        title="Nothing saved yet"
        body="Tap the bookmark on any lesson or library item to keep it here for later."
        action={
          <a href="#/learn/programs" className={buttonPrimary}>
            Back to My Programs
          </a>
        }
      />
    )
  return (
    <Card className="divide-y divide-[#d1d9e6]">
      {items.map((item) => {
        const type = LESSON_TYPE[item.type]
        const Icon = type.icon
        return (
          <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-4">
            <span className="w-10 h-10 rounded-full bg-[#e8edf5] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-[#0d2147]" strokeWidth={1.8} />
            </span>
            <a href={item.href} className="flex-1 min-w-0 group">
              <h3 className="text-sm font-semibold leading-snug group-hover:underline underline-offset-4 decoration-[#c9a84c]">{item.title}</h3>
              <p className="text-xs text-[#5a6a84] mt-0.5">
                {item.source} · {type.label} · {item.minutes} min
              </p>
            </a>
            <button
              onClick={() => setItems((prev) => prev.filter((p) => p.id !== item.id))}
              aria-label={`Remove ${item.title} from saved`}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#5a6a84] hover:text-[#c25b5b] hover:bg-[#fcf1f1] transition-colors shrink-0"
            >
              <BookmarkX className="w-5 h-5" strokeWidth={1.8} />
            </button>
          </div>
        )
      })}
    </Card>
  )
}

function CompletedTab() {
  const totalCme = COMPLETED.reduce((sum, c) => sum + c.cme, 0)
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[#5a6a84]">
        {COMPLETED.length} items completed · <span className="font-semibold text-[#0d2147] tabular-nums">{totalCme} CME credits</span> earned
      </p>
      <Card className="divide-y divide-[#d1d9e6]">
        {COMPLETED.map((c) => (
          <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="w-7 h-7 rounded-full bg-[#0d2147] text-[#c9a84c] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" strokeWidth={2.5} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug">{c.title}</h3>
                <p className="text-xs text-[#5a6a84] mt-0.5">
                  {c.kind} · Completed {c.completedOn} · <span className="tabular-nums">{c.cme} CME</span>
                </p>
              </div>
            </div>
            {c.certificate ? (
              <a href={`#/credentials/certificate/${c.certificateId}`} className={cn(buttonSecondary, 'self-start sm:self-auto ml-10 sm:ml-0')}>
                <Award className="w-4 h-4 text-[#8a6d22]" /> Certificate
              </a>
            ) : (
              <span className="text-xs text-[#5a6a84] ml-10 sm:ml-0 inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Credential on program completion
              </span>
            )}
          </div>
        ))}
      </Card>
    </div>
  )
}

export default function LearnHub({ tab, onSignOut }: { tab: LearnTab; onSignOut: () => void }) {
  return (
    <CampusLayout active="learn" title="Learn" onSignOut={onSignOut}>
      {tab === 'programs' && <ResumeCard />}
      <div className={tab === 'programs' ? 'mt-8 mb-6' : 'mb-6'}>
        <TabChips
          label="Learn sections"
          tabs={[...TABS.map((t) => ({ ...t, href: `#/learn/${t.key}` })), { key: 'library', label: 'Clinical Library', href: '#/library' }]}
          active={tab}
        />
      </div>
      {tab === 'programs' && <ProgramsTab />}
      {tab === 'courses' && <CatalogList items={COURSES} kind="course" />}
      {tab === 'masterclasses' && <CatalogList items={MASTERCLASSES} kind="masterclass" />}
      {tab === 'intensives' && <IntensivesTab />}
      {tab === 'saved' && <SavedTab />}
      {tab === 'completed' && <CompletedTab />}
    </CampusLayout>
  )
}

