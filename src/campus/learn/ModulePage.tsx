import { ArrowLeft, ArrowRight, Download, Lock, Target, ClipboardList } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, ProgressBar, StatusIcon, EmptyState, LESSON_TYPE, buttonPrimary, buttonSecondary } from '../ui'
import { PROGRAM, FACULTY } from '../data/learn'
import { cn } from '../../lib/utils'

export default function ModulePage({ number, onSignOut }: { number: number; onSignOut: () => void }) {
  const module = PROGRAM.modules.find((m) => m.number === number)
  const back = { label: 'Advanced Certificate', href: '#/learn/program/advanced-certificate' }

  if (!module || module.status === 'locked') {
    return (
      <CampusLayout active="learn" title={module ? `Module ${module.number}` : 'Module'} back={back} onSignOut={onSignOut}>
        <EmptyState
          icon={Lock}
          title={module ? module.title : 'Module not found'}
          body={module ? `This module unlocks when Module ${module.number - 1} is complete.` : 'This module does not exist in your program.'}
          action={
            <a href={back.href} className={buttonPrimary}>
              Back to program
            </a>
          }
        />
      </CampusLayout>
    )
  }

  const studyLessons = module.lessons.filter((l) => l.type !== 'quiz')
  const quiz = module.lessons.find((l) => l.type === 'quiz')
  const done = module.lessons.filter((l) => l.status === 'done').length
  const pct = Math.round((done / module.lessons.length) * 100)
  const remaining = studyLessons.filter((l) => l.status !== 'done').length
  const quizUnlocked = remaining === 0
  const prev = PROGRAM.modules.find((m) => m.number === number - 1)
  const next = PROGRAM.modules.find((m) => m.number === number + 1)

  return (
    <CampusLayout active="learn" title={`Module ${module.number}`} back={back} onSignOut={onSignOut}>
      <Card className="p-5 sm:p-7">
        <p className="text-sm text-[#5a6a84]">
          Module {module.number} of {PROGRAM.modules.length}
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl leading-snug mt-1 text-balance">{module.title}</h2>
        <p className="text-[#5a6a84] mt-2 max-w-2xl">{module.summary}</p>
        <div className="mt-5 max-w-xl">
          <div className="flex justify-between text-sm mb-2 tabular-nums">
            <span className="text-[#5a6a84]">
              {done} of {module.lessons.length} complete
            </span>
            <span className="font-semibold">{pct}%</span>
          </div>
          <ProgressBar value={pct} />
        </div>
      </Card>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 mt-8">
        <section>
          <h2 className="font-serif text-xl mb-4">Lessons</h2>
          <Card className="divide-y divide-[#d1d9e6] overflow-hidden">
            {studyLessons.map((l, i) => {
              const type = LESSON_TYPE[l.type]
              const TypeIcon = type.icon
              const isCurrent = l.status === 'current'
              return (
                <a
                  key={l.id}
                  href={`#/learn/lesson/${l.id}`}
                  className={cn('flex items-center gap-4 p-4 transition-colors', isCurrent ? 'bg-[#fbf7ec]' : 'hover:bg-[#f5f6f8]')}
                >
                  <StatusIcon status={l.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug">
                      <span className="text-[#5a6a84] font-normal tabular-nums mr-1.5">{i + 1}.</span>
                      {l.title}
                    </p>
                    <p className="text-xs text-[#5a6a84] mt-1 flex items-center gap-1.5">
                      <TypeIcon className="w-3.5 h-3.5" />
                      {type.label} · {l.minutes} min · {FACULTY[l.faculty].name}
                    </p>
                  </div>
                  {isCurrent ? (
                    <span className="hidden sm:inline-flex items-center min-h-9 px-4 rounded-full bg-[#0d2147] text-white text-xs font-bold">Resume</span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#5a6a84] shrink-0" />
                  )}
                </a>
              )
            })}
          </Card>

          {quiz && (
            <Card className={cn('mt-4 p-5 flex flex-col sm:flex-row sm:items-center gap-4', quizUnlocked && 'border-[#c9a84c]')}>
              <span className="w-11 h-11 rounded-full bg-[#e8edf5] flex items-center justify-center shrink-0">
                {quizUnlocked ? <ClipboardList className="w-5 h-5" /> : <Lock className="w-4 h-4 text-[#5a6a84]" />}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold">{quiz.title}</h3>
                <p className="text-sm text-[#5a6a84] mt-0.5">
                  {module.status === 'done'
                    ? 'Passed · 90%'
                    : quizUnlocked
                      ? '5 questions · 15 min · 80% to pass'
                      : `Finish ${remaining} more lesson${remaining === 1 ? '' : 's'} to unlock. You can preview the format now.`}
                </p>
              </div>
              <a href={`#/learn/assessment/${module.quizId}`} className={cn(quizUnlocked ? buttonPrimary : buttonSecondary, 'shrink-0')}>
                {module.status === 'done' ? 'Review answers' : quizUnlocked ? 'Start knowledge check' : 'Preview'}
              </a>
            </Card>
          )}
        </section>

        <aside className="flex flex-col gap-4">
          <Card className="p-5">
            <h2 className="font-serif text-lg">What you will be able to do</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {module.objectives.map((o) => (
                <li key={o} className="flex gap-3 text-sm">
                  <Target className="w-4 h-4 text-[#8a6d22] shrink-0 mt-0.5" />
                  {o}
                </li>
              ))}
            </ul>
          </Card>
          {module.resources.length > 0 && (
            <Card className="p-5">
              <h2 className="font-serif text-lg">Module resources</h2>
              <ul className="mt-3 -mx-2">
                {module.resources.map((r) => (
                  <li key={r.title}>
                    <button className="w-full flex items-center gap-3 p-2 min-h-11 rounded-lg text-left hover:bg-[#f5f6f8] transition-colors">
                      <Download className="w-4 h-4 text-[#5a6a84] shrink-0" />
                      <span className="flex-1 text-sm">{r.title}</span>
                      <span className="text-xs text-[#5a6a84] shrink-0">
                        {r.kind} · {r.size}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>

      <nav aria-label="Modules" className="grid grid-cols-2 gap-3 mt-10">
        {prev ? (
          <a href={`#/learn/program/advanced-certificate/module/${prev.number}`} className="rounded-xl border border-[#d1d9e6] bg-white p-4 hover:border-[#0d2147]/40 transition-colors">
            <span className="text-xs text-[#5a6a84] inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Module {prev.number}
            </span>
            <span className="block text-sm font-semibold mt-1 leading-snug">{prev.title}</span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a
            href={next.status === 'locked' ? undefined : `#/learn/program/advanced-certificate/module/${next.number}`}
            aria-disabled={next.status === 'locked' || undefined}
            className={cn('rounded-xl border border-[#d1d9e6] bg-white p-4 text-right', next.status === 'locked' ? 'opacity-60' : 'hover:border-[#0d2147]/40 transition-colors')}
          >
            <span className="text-xs text-[#5a6a84] inline-flex items-center gap-1">
              {next.status === 'locked' && <Lock className="w-3 h-3" />} Module {next.number} <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="block text-sm font-semibold mt-1 leading-snug">{next.title}</span>
          </a>
        )}
      </nav>
    </CampusLayout>
  )
}
