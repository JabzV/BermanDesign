import { ArrowRight, Check, Users, Award } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, ProgressBar, StatusIcon, FacultyAvatar, buttonPrimary } from '../ui'
import { PROGRAM, FACULTY } from '../data/learn'
import { cn } from '../../lib/utils'

function moduleMinutes(m: (typeof PROGRAM.modules)[number]) {
  return m.lessons.reduce((sum, l) => sum + l.minutes, 0)
}

function ModuleTimeline() {
  return (
    <ol className="relative">
      {PROGRAM.modules.map((m, i) => {
        const isLast = i === PROGRAM.modules.length - 1
        const doneLessons = m.lessons.filter((l) => l.status === 'done').length
        const next = m.lessons.find((l) => l.status === 'current')
        const locked = m.status === 'locked'
        return (
          <li key={m.number} className="relative flex gap-4 pb-4">
            {!isLast && (
              <span
                aria-hidden
                className={cn('absolute left-[13px] top-8 bottom-0 w-0.5', m.status === 'done' ? 'bg-[#0d2147]' : 'bg-[#d1d9e6]')}
              />
            )}
            <StatusIcon status={m.status} className="mt-4 relative" />
            <a
              href={locked ? undefined : `#/learn/program/advanced-certificate/module/${m.number}`}
              aria-disabled={locked || undefined}
              className={cn(
                'flex-1 min-w-0 block rounded-xl border bg-white p-4 sm:p-5 transition-colors',
                m.status === 'current' ? 'border-[#c9a84c]' : 'border-[#d1d9e6]',
                locked ? 'opacity-70' : 'hover:border-[#0d2147]/40',
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-xs font-semibold text-[#5a6a84]">Module {m.number}</p>
                <p className="text-xs text-[#5a6a84] tabular-nums shrink-0">
                  {m.lessons.length} lessons · {Math.round(moduleMinutes(m) / 60 * 10) / 10} h
                </p>
              </div>
              <h3 className="font-serif text-lg leading-snug mt-1">{m.title}</h3>
              <p className="text-sm text-[#5a6a84] mt-1">{m.summary}</p>

              {m.status === 'current' && next && (
                <div className="mt-4 pt-4 border-t border-[#d1d9e6]">
                  <div className="flex justify-between text-xs text-[#5a6a84] mb-1.5 tabular-nums">
                    <span>
                      {doneLessons} of {m.lessons.length} lessons
                    </span>
                    <span>{Math.round((doneLessons / m.lessons.length) * 100)}%</span>
                  </div>
                  <ProgressBar value={(doneLessons / m.lessons.length) * 100} />
                  <p className="text-sm mt-4">
                    <span className="text-[#5a6a84]">Next: </span>
                    <span className="font-semibold">{next.title}</span>
                  </p>
                  <span className={cn(buttonPrimary, 'mt-4 w-full sm:w-auto')}>
                    Continue module <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              )}
              {m.status === 'done' && (
                <p className="text-xs text-emerald-700 font-semibold mt-3 inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Completed · knowledge check passed
                </p>
              )}
              {locked && <p className="text-xs text-[#5a6a84] mt-3">Unlocks when Module {m.number - 1} is complete</p>}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

function Requirements() {
  return (
    <Card className="p-5">
      <h2 className="font-serif text-lg">Completion requirements</h2>
      <ul className="mt-4 flex flex-col gap-4">
        {PROGRAM.requirements.map((r) => (
          <li key={r.label} className="flex gap-3">
            <span
              className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                r.done ? 'bg-[#0d2147] text-[#c9a84c]' : 'border-2 border-[#d1d9e6]',
              )}
            >
              {r.done && <Check className="w-3 h-3" strokeWidth={3} />}
            </span>
            <div>
              <p className="text-sm font-semibold leading-snug">{r.label}</p>
              <p className="text-xs text-[#5a6a84] mt-0.5">{r.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t border-[#d1d9e6] flex gap-3">
        <Award className="w-5 h-5 text-[#8a6d22] shrink-0" />
        <p className="text-sm text-[#5a6a84]">
          On completion you earn the <span className="text-[#0d2147] font-semibold">Advanced Certificate</span> credential and an invitation to Professional
          Membership.
        </p>
      </div>
    </Card>
  )
}

function FacultyCard() {
  return (
    <Card className="p-5">
      <h2 className="font-serif text-lg">Program faculty</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {Object.values(FACULTY)
          .slice(0, 3)
          .map((f) => (
            <li key={f.id} className="flex items-center gap-3">
              <FacultyAvatar id={f.id} />
              <div>
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-[#5a6a84]">{f.title}</p>
              </div>
            </li>
          ))}
      </ul>
      <a
        href="#/network/cohort"
        className="mt-5 pt-4 border-t border-[#d1d9e6] flex items-center gap-3 text-sm font-semibold hover:text-[#1a3260]"
      >
        <Users className="w-4 h-4 text-[#5a6a84]" />
        <span className="flex-1">My Cohort · 38 clinicians</span>
        <ArrowRight className="w-4 h-4 text-[#5a6a84]" />
      </a>
    </Card>
  )
}

export default function ProgramOverview({ onSignOut }: { onSignOut: () => void }) {
  const modulesDone = PROGRAM.modules.filter((m) => m.status === 'done').length
  return (
    <CampusLayout active="learn" title="Advanced Certificate" back={{ label: 'Learn', href: '#/learn/programs' }} onSignOut={onSignOut}>
      <section className="relative bg-[#0d2147] text-white rounded-2xl p-5 sm:p-8 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
        />
        <p className="relative text-sm text-white/70">{PROGRAM.cohort} · Started {PROGRAM.startedOn}</p>
        <h2 className="relative font-serif text-2xl sm:text-3xl leading-snug mt-2 max-w-2xl text-balance">{PROGRAM.title}</h2>
        <div className="relative mt-6 max-w-xl">
          <div className="flex justify-between text-sm mb-2 tabular-nums">
            <span className="text-white/70">Overall progress</span>
            <span className="font-semibold">{PROGRAM.progress}%</span>
          </div>
          <ProgressBar value={PROGRAM.progress} tone="gold" />
        </div>
        <dl className="relative grid grid-cols-3 gap-4 mt-6 max-w-xl text-sm">
          <div>
            <dt className="text-white/70">Modules</dt>
            <dd className="font-serif text-xl mt-0.5 tabular-nums">
              {modulesDone} / {PROGRAM.modules.length}
            </dd>
          </div>
          <div>
            <dt className="text-white/70">CME / CE</dt>
            <dd className="font-serif text-xl mt-0.5 tabular-nums">
              {PROGRAM.cmeEarned} / {PROGRAM.cmeTotal}
            </dd>
          </div>
          <div>
            <dt className="text-white/70">Target</dt>
            <dd className="font-serif text-xl mt-0.5">{PROGRAM.targetCompletion}</dd>
          </div>
        </dl>
      </section>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 mt-8">
        <section>
          <h2 className="font-serif text-xl mb-4">Modules</h2>
          <ModuleTimeline />
        </section>
        <aside className="flex flex-col gap-4">
          <Requirements />
          <FacultyCard />
        </aside>
      </div>
    </CampusLayout>
  )
}
