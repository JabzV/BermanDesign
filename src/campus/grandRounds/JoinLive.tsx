import { useState, type FormEvent } from 'react'
import { ArrowBigUp, Captions, Maximize, Volume2, Send, Check, Users, Download, LogOut, Lock, Award } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, buttonPrimary, buttonSecondary } from '../ui'
import { findSession, useRegistered, LIVE_QUESTIONS, type Session } from '../data/grandRounds'
import { Speakers, registerHref, sessionHref } from './parts'
import { cn } from '../../lib/utils'
import grandRoundsPhoto from '../../imports/aasagfg.png'

// The live segment shown in the prototype (index into the agenda).
const CURRENT_SEGMENT = 2
const ELAPSED = 38

type Panel = 'qa' | 'agenda' | 'resources'

function Stage({ session }: { session: Session }) {
  const [captions, setCaptions] = useState(false)
  return (
    <div className="relative -mx-4 sm:mx-0 aspect-video bg-black sm:rounded-2xl overflow-hidden">
      <img src={grandRoundsPhoto} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#b04848] text-white text-xs font-bold px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white motion-safe:animate-pulse" /> LIVE
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-black/60 text-white text-xs font-semibold px-2 py-1 tabular-nums">
          <Users className="w-3.5 h-3.5" /> 286 watching
        </span>
      </div>
      {captions && (
        <p className="absolute inset-x-6 bottom-16 text-center">
          <span className="bg-black/75 text-white text-sm sm:text-base px-2 py-1 rounded leading-relaxed box-decoration-clone">
            …so in patients over 65, I start resistance training at least two weeks before the first dose.
          </span>
        </p>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent pt-10 px-3 pb-2 flex items-center gap-1 text-white">
        <button aria-label="Volume" className="w-10 h-10 flex items-center justify-center">
          <Volume2 className="w-5 h-5" />
        </button>
        <span className="text-xs tabular-nums">
          {session.agenda[CURRENT_SEGMENT].label} · {ELAPSED} min in
        </span>
        <span className="ml-auto" />
        <button
          onClick={() => setCaptions((c) => !c)}
          aria-pressed={captions}
          aria-label="Captions"
          className={cn('w-10 h-10 flex items-center justify-center rounded', captions && 'text-[#e2c575]')}
        >
          <Captions className="w-5 h-5" />
        </button>
        <button aria-label="Full screen" className="w-10 h-10 flex items-center justify-center">
          <Maximize className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function QuestionList({ questions, voted, onVote }: { questions: typeof LIVE_QUESTIONS; voted: Set<string>; onVote: (id: string) => void }) {
  return (
    <ol className="flex flex-col gap-2">
      {questions.map((q) => {
        const hasVoted = voted.has(q.id)
        return (
          <li key={q.id} className="flex gap-3 rounded-xl border border-[#d1d9e6] bg-white p-3">
            <button
              onClick={() => onVote(q.id)}
              aria-pressed={hasVoted}
              aria-label={`Upvote question, ${q.votes + (hasVoted ? 1 : 0)} votes`}
              className={cn(
                'w-11 shrink-0 rounded-lg flex flex-col items-center justify-center py-1.5 transition-colors',
                hasVoted ? 'bg-[#0d2147] text-white' : 'bg-[#f5f6f8] text-[#0d2147] hover:bg-[#e8edf5]',
              )}
            >
              <ArrowBigUp className="w-5 h-5" fill={hasVoted ? 'currentColor' : 'none'} />
              <span className="text-xs font-semibold tabular-nums">{q.votes + (hasVoted ? 1 : 0)}</span>
            </button>
            <div className="min-w-0">
              <p className="text-sm leading-snug">{q.text}</p>
              <p className="text-xs text-[#5a6a84] mt-1.5 flex flex-wrap items-center gap-x-2">
                <span>
                  {q.author} · {q.specialty}
                </span>
                {q.answered && (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <Check className="w-3.5 h-3.5" /> Answered on air
                  </span>
                )}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function AskForm({ onAsk, compact = false }: { onAsk: (text: string, anonymous: boolean) => void; compact?: boolean }) {
  const [text, setText] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAsk(text.trim(), anonymous)
    setText('')
  }
  return (
    <form onSubmit={submit} className={cn(compact ? 'flex items-center gap-2' : 'flex flex-col gap-2')}>
      <label htmlFor={compact ? 'ask-mobile' : 'ask'} className="sr-only">
        Ask the faculty
      </label>
      {compact ? (
        <input
          id="ask-mobile"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask the faculty…"
          className="flex-1 min-w-0 min-h-11 rounded-full border border-[#d1d9e6] bg-white px-4 text-[15px] outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa]"
        />
      ) : (
        <textarea
          id="ask"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Ask the faculty. No patient identifiers."
          className="w-full rounded-xl border border-[#d1d9e6] bg-white p-3 text-sm leading-relaxed outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa] resize-none"
        />
      )}
      {!compact && (
        <label className="flex items-center gap-2 text-sm cursor-pointer min-h-9">
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-4 h-4" />
          Ask anonymously
        </label>
      )}
      <button type="submit" disabled={!text.trim()} aria-label="Send question" className={cn(buttonPrimary, compact ? 'w-11 px-0 shrink-0' : 'self-end')}>
        <Send className="w-4 h-4" />
        {!compact && 'Send question'}
      </button>
    </form>
  )
}

export default function JoinLive({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const session = findSession(id)
  const registered = useRegistered(id)
  const [panel, setPanel] = useState<Panel>('qa')
  const [sort, setSort] = useState<'top' | 'recent'>('top')
  const [questions, setQuestions] = useState(LIVE_QUESTIONS)
  const [voted, setVoted] = useState<Set<string>>(new Set())

  const back = session ? { label: 'Session details', href: sessionHref(session) } : { label: 'Grand Rounds', href: '#/grand-rounds' }

  if (!session || !registered)
    return (
      <CampusLayout active="grand-rounds" title="Session room" back={back} onSignOut={onSignOut}>
        <EmptyState
          icon={Lock}
          title={session ? 'Register to join this session' : 'Session not found'}
          body={session ? 'The live room is open to registered members. Registration takes less than a minute.' : 'It may have been rescheduled.'}
          action={
            <a href={session ? registerHref(session) : '#/grand-rounds'} className={buttonPrimary}>
              {session ? 'Register now' : 'Upcoming sessions'}
            </a>
          }
        />
      </CampusLayout>
    )

  const ask = (text: string, anonymous: boolean) => {
    setQuestions((prev) => [{ id: `mine-${prev.length}`, author: anonymous ? 'Anonymous member' : 'Dr. Ana Reyes', specialty: 'Internal Medicine', text, votes: 0, answered: false }, ...prev])
    setSort('recent')
    setPanel('qa')
  }
  const toggleVote = (qid: string) =>
    setVoted((prev) => {
      const next = new Set(prev)
      if (next.has(qid)) next.delete(qid)
      else next.add(qid)
      return next
    })
  const sorted = sort === 'top' ? [...questions].sort((a, b) => b.votes - a.votes) : questions

  const tabs: { key: Panel; label: string }[] = [
    { key: 'qa', label: `Q&A (${questions.length})` },
    { key: 'agenda', label: 'Agenda' },
    { key: 'resources', label: 'Resources' },
  ]

  return (
    <CampusLayout active="grand-rounds" title="Grand Rounds · Live" back={back} focus onSignOut={onSignOut}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-8">
        <div className="min-w-0">
          <Stage session={session} />
          <div className="mt-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-xl sm:text-2xl leading-snug text-balance">{session.title}</h2>
              <div className="mt-3">
                <Speakers session={session} />
              </div>
            </div>
            <a href={sessionHref(session)} className={cn(buttonSecondary, 'shrink-0 self-start')}>
              <LogOut className="w-4 h-4" /> Leave
            </a>
          </div>
          <Card className="mt-5 p-4 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#8a6d22] shrink-0" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">Attendance is being recorded for CME.</span>{' '}
                <span className="text-[#5a6a84] tabular-nums">
                  {ELAPSED} of {session.minutes} min · stay to the end for {session.cme} credits.
                </span>
              </p>
              <div className="h-1.5 rounded-full bg-[#e8edf5] mt-2 overflow-hidden">
                <div className="h-full bg-[#c9a84c]" style={{ width: `${(ELAPSED / session.minutes) * 100}%` }} />
              </div>
            </div>
          </Card>
        </div>

        <section aria-label="Session panel" className="lg:sticky lg:top-24 self-start w-full">
          <Card className="overflow-hidden lg:max-h-[calc(100vh-8rem)] flex flex-col">
            <div role="tablist" aria-label="Session panel" className="flex border-b border-[#d1d9e6] px-2 shrink-0">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={panel === t.key}
                  onClick={() => setPanel(t.key)}
                  className={cn(
                    'relative flex-1 min-h-12 text-sm whitespace-nowrap transition-colors',
                    panel === t.key ? 'font-semibold text-[#0d2147]' : 'text-[#5a6a84] hover:text-[#0d2147]',
                  )}
                >
                  {t.label}
                  {panel === t.key && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-[#c9a84c]" />}
                </button>
              ))}
            </div>

            <div role="tabpanel" className="p-4 overflow-y-auto flex-1 bg-[#f9fafb]">
              {panel === 'qa' && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#5a6a84]">Upvote the questions you want answered.</p>
                    <div role="group" aria-label="Sort questions" className="flex rounded-full bg-[#e8edf5] p-0.5 text-xs">
                      {(['top', 'recent'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSort(s)}
                          aria-pressed={sort === s}
                          className={cn('px-3 min-h-8 rounded-full capitalize', sort === s ? 'bg-white font-semibold shadow-[0_1px_2px_rgba(13,33,71,0.12)]' : 'text-[#5a6a84]')}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <QuestionList questions={sorted} voted={voted} onVote={toggleVote} />
                </>
              )}
              {panel === 'agenda' && (
                <ol className="flex flex-col gap-2">
                  {session.agenda.map((a, i) => {
                    const state = i < CURRENT_SEGMENT ? 'done' : i === CURRENT_SEGMENT ? 'now' : 'next'
                    return (
                      <li key={a.label} className={cn('rounded-xl border p-3 bg-white', state === 'now' ? 'border-[#c9a84c]' : 'border-[#d1d9e6]')}>
                        <div className="flex items-center justify-between gap-2">
                          <p className={cn('text-sm font-semibold', state === 'done' && 'text-[#5a6a84]')}>{a.label}</p>
                          {state === 'now' && <span className="text-[10px] font-bold uppercase tracking-wide text-[#b04848]">Now</span>}
                          {state === 'done' && <Check className="w-4 h-4 text-emerald-700" />}
                        </div>
                        <p className="text-xs text-[#5a6a84] mt-0.5">{a.detail}</p>
                      </li>
                    )
                  })}
                </ol>
              )}
              {panel === 'resources' && (
                <ul className="flex flex-col gap-2">
                  {(session.prep.length ? session.prep : [{ title: 'Session slides', kind: 'PDF · after the session' }]).map((p) => (
                    <li key={p.title}>
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#d1d9e6] bg-white text-left hover:border-[#0d2147]/40 transition-colors">
                        <Download className="w-4 h-4 text-[#5a6a84] shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">{p.title}</span>
                          <span className="block text-xs text-[#5a6a84]">{p.kind}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hidden lg:block border-t border-[#d1d9e6] p-4 shrink-0">
              <AskForm onAsk={ask} />
            </div>
          </Card>
        </section>
      </div>

      {/* Mobile: question composer pinned to the bottom edge */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#d1d9e6] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <AskForm onAsk={ask} compact />
      </div>
    </CampusLayout>
  )
}
