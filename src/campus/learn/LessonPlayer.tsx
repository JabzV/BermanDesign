import { useState } from 'react'
import {
  Bookmark,
  BookmarkCheck,
  Check,
  ArrowRight,
  Download,
  Lock,
  Award,
} from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, StatusIcon, EmptyState, FacultyAvatar, LESSON_TYPE, buttonPrimary, buttonSecondary } from '../ui'
import { FACULTY, LESSON_DETAIL, findLesson } from '../data/learn'
import { cn } from '../../lib/utils'
import VideoPlayer from '../VideoPlayer'

type Tab = 'overview' | 'transcript' | 'resources' | 'notes'
const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'transcript', label: 'Transcript' },
  { key: 'resources', label: 'Resources' },
  { key: 'notes', label: 'Notes' },
]

function LessonTabs() {
  const [tab, setTab] = useState<Tab>('overview')
  const [notes, setNotes] = useState('')
  return (
    <div className="mt-6">
      <div role="tablist" aria-label="Lesson content" className="flex gap-6 border-b border-[#d1d9e6] overflow-x-auto [scrollbar-width:none]">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => setTab(t.key)}
            className={cn(
              'relative min-h-11 text-sm whitespace-nowrap transition-colors',
              tab === t.key ? 'text-[#0d2147] font-semibold' : 'text-[#5a6a84] hover:text-[#0d2147]',
            )}
          >
            {t.label}
            {tab === t.key && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#c9a84c]" />}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-5">
        {tab === 'overview' && (
          <div className="max-w-prose">
            <h3 className="font-serif text-lg">Key takeaways</h3>
            <ul className="mt-3 flex flex-col gap-3">
              {LESSON_DETAIL.takeaways.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'transcript' && (
          <ol className="max-w-prose flex flex-col gap-4">
            {LESSON_DETAIL.transcript.map((line) => (
              <li key={line.time} className="flex gap-4">
                <button className="text-xs font-semibold text-[#8a6d22] tabular-nums shrink-0 min-h-6 hover:underline underline-offset-4">{line.time}</button>
                <p className="text-[15px] leading-relaxed">{line.text}</p>
              </li>
            ))}
          </ol>
        )}
        {tab === 'resources' && (
          <ul className="flex flex-col gap-2 max-w-xl">
            {LESSON_DETAIL.resources.map((r) => (
              <li key={r.title}>
                <button className="w-full flex items-center gap-3 p-3 min-h-14 rounded-xl border border-[#d1d9e6] bg-white text-left hover:border-[#0d2147]/40 transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#e8edf5] flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold leading-snug">{r.title}</span>
                    <span className="block text-xs text-[#5a6a84] mt-0.5">
                      {r.kind} · {r.size}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {tab === 'notes' && (
          <div className="max-w-xl">
            <label htmlFor="lesson-notes" className="text-sm text-[#5a6a84]">
              Private to you. Notes are saved with this lesson.
            </label>
            <textarea
              id="lesson-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="e.g. Re-check fasting RER at 12 weeks for patients on Zone 2 plans"
              className="mt-2 w-full rounded-xl border border-[#d1d9e6] bg-white p-4 text-[15px] leading-relaxed outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa] resize-y"
            />
            <p className="text-xs text-[#5a6a84] mt-1 tabular-nums" aria-live="polite">
              {notes.length > 0 ? 'Saved' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LessonPlayer({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const found = findLesson(id)
  const [saved, setSaved] = useState(id === 'm4-3')
  const [complete, setComplete] = useState(found?.lesson.status === 'done')

  if (!found || found.lesson.status === 'locked') {
    return (
      <CampusLayout active="learn" title="Lesson" back={{ label: 'Learn', href: '#/learn' }} onSignOut={onSignOut}>
        <EmptyState
          icon={Lock}
          title={found ? 'This lesson is locked' : 'Lesson not found'}
          body={found ? `Complete Module ${found.module.number - 1} to unlock it.` : 'It may have been moved or removed from your program.'}
          action={
            <a href="#/learn/program/advanced-certificate" className={buttonPrimary}>
              Back to program
            </a>
          }
        />
      </CampusLayout>
    )
  }

  const { module, lesson, index } = found
  const nextLesson = module.lessons[index + 1]
  const nextHref = nextLesson
    ? nextLesson.type === 'quiz'
      ? `#/learn/assessment/${module.quizId}`
      : `#/learn/lesson/${nextLesson.id}`
    : `#/learn/program/advanced-certificate/module/${module.number}`
  const type = LESSON_TYPE[lesson.type]
  const moduleHref = `#/learn/program/advanced-certificate/module/${module.number}`

  const completeButton = (
    <button
      onClick={() => setComplete((c) => !c)}
      aria-pressed={complete}
      className={cn(buttonSecondary, complete && 'border-emerald-600/40 text-emerald-700')}
    >
      <Check className="w-4 h-4" />
      {complete ? 'Completed' : 'Mark complete'}
    </button>
  )
  const nextButton = (
    <a href={nextHref} className={buttonPrimary}>
      {nextLesson ? 'Next lesson' : 'Back to module'}
      <ArrowRight className="w-4 h-4" />
    </a>
  )

  return (
    <CampusLayout active="learn" title={`Module ${module.number}: ${module.title}`} back={{ label: `Module ${module.number}`, href: moduleHref }} focus onSignOut={onSignOut}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
        <div className="min-w-0">
          <VideoPlayer minutes={lesson.minutes} resumeAt="17:12" label="Play lesson video" />

          <div className="mt-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#5a6a84] tabular-nums">
                Lesson {index + 1} of {module.lessons.length} · {type.label} · {lesson.minutes} min
              </p>
              <h2 className="font-serif text-2xl sm:text-[28px] leading-snug mt-1 text-balance">{lesson.title}</h2>
              <div className="flex items-center gap-3 mt-3">
                <FacultyAvatar id={lesson.faculty} />
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{FACULTY[lesson.faculty].name}</p>
                  <p className="text-xs text-[#5a6a84]">{FACULTY[lesson.faculty].title}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a6d22] bg-[#fbf7ec] rounded-full px-3 min-h-9 tabular-nums">
                <Award className="w-3.5 h-3.5" /> {LESSON_DETAIL.cme} CME
              </span>
              <button
                onClick={() => setSaved((s) => !s)}
                aria-pressed={saved}
                aria-label={saved ? 'Remove from saved' : 'Save lesson'}
                className={cn(
                  'w-11 h-11 rounded-full border flex items-center justify-center transition-colors',
                  saved ? 'border-[#c9a84c] bg-[#fbf7ec] text-[#8a6d22]' : 'border-[#d1d9e6] bg-white text-[#0d2147] hover:border-[#0d2147]',
                )}
              >
                {saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 mt-6">
            {completeButton}
            {nextButton}
          </div>

          <LessonTabs />
        </div>

        <aside className="lg:sticky lg:top-24 self-start w-full">
          <Card className="overflow-hidden">
            <div className="p-4 border-b border-[#d1d9e6]">
              <p className="text-xs text-[#5a6a84]">In this module</p>
              <a href={moduleHref} className="font-semibold text-sm hover:underline underline-offset-4">
                Module {module.number}: {module.title}
              </a>
            </div>
            <ol className="max-h-[420px] overflow-y-auto">
              {module.lessons.map((l, i) => {
                const isThis = l.id === lesson.id
                const href = l.type === 'quiz' ? `#/learn/assessment/${module.quizId}` : `#/learn/lesson/${l.id}`
                return (
                  <li key={l.id}>
                    <a
                      href={href}
                      aria-current={isThis ? 'page' : undefined}
                      className={cn('flex items-center gap-3 px-4 py-3 text-sm transition-colors', isThis ? 'bg-[#fbf7ec]' : 'hover:bg-[#f5f6f8]')}
                    >
                      <StatusIcon status={isThis && complete ? 'done' : l.status} className="w-6 h-6" />
                      <span className="flex-1 min-w-0">
                        <span className={cn('block leading-snug', isThis && 'font-semibold')}>
                          {i + 1}. {l.title}
                        </span>
                        <span className="block text-xs text-[#5a6a84] mt-0.5 tabular-nums">{l.minutes} min</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </Card>
        </aside>
      </div>

      {/* Mobile action bar replaces the tab bar while studying */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#d1d9e6] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] grid grid-cols-2 gap-3 [&>*]:w-full">
        {completeButton}
        {nextButton}
      </div>
    </CampusLayout>
  )
}
