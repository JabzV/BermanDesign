import { ArrowRight, Clock, Award, Radio, Play, Check, Users } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, TabChips, buttonSecondary } from '../ui'
import { SESSIONS, useRegistered, type Session } from '../data/grandRounds'
import { LIBRARY } from '../data/library'
import { FACULTY } from '../data/learn'
import { topicLabel } from '../library/parts'
import { DateBlock, Speakers, RegisteredBadge, sessionHref, registerHref, liveHref } from './parts'
import { cn } from '../../lib/utils'
import grandRoundsPhoto from '../../imports/aasagfg.png'

export type GrandRoundsTab = 'upcoming' | 'replays'

function NextSession({ session }: { session: Session }) {
  const registered = useRegistered(session.id)
  return (
    <section className="relative bg-[#0d2147] text-white rounded-2xl overflow-hidden">
      <img src={grandRoundsPhoto} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0d2147] via-[#0d2147]/90 to-[#0d2147]/50" />
      <div className="relative p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e2c575]">
            <Radio className="w-4 h-4" /> Next live session · {session.countdown}
          </span>
          <RegisteredBadge session={session} dark />
        </div>
        <div className="flex gap-4 mt-5">
          <DateBlock session={session} dark />
          <div className="min-w-0">
            <p className="text-sm text-white/75">
              {session.weekday} · {session.time} · {session.minutes} min
            </p>
            <h2 className="font-serif text-2xl sm:text-[30px] leading-snug mt-1 max-w-2xl text-balance">{session.title}</h2>
          </div>
        </div>
        <p className="text-white/75 mt-4 max-w-2xl">{session.summary}</p>
        <div className="mt-5">
          <Speakers session={session} dark />
        </div>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          {registered ? (
            <a href={liveHref(session)} className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-[#c9a84c] text-[#0d2147] text-sm font-bold hover:bg-[#e2c575] transition-colors">
              <Radio className="w-4 h-4" /> Enter session room
            </a>
          ) : (
            <a href={registerHref(session)} className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-white text-[#0d2147] text-sm font-bold hover:bg-[#e2c575] transition-colors">
              Register · {session.cme} CME
            </a>
          )}
          <a href={sessionHref(session)} className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors">
            Session details <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function SessionRow({ session }: { session: Session }) {
  const registered = useRegistered(session.id)
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5">
      <a href={sessionHref(session)} className="flex gap-4 flex-1 min-w-0 group">
        <DateBlock session={session} />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#8a6d22]">
            {topicLabel(session.topic)} · {session.weekday}, {session.time}
          </p>
          <h3 className="text-sm sm:text-base font-semibold leading-snug mt-0.5 group-hover:underline underline-offset-4 decoration-[#c9a84c]">{session.title}</h3>
          <p className="text-xs text-[#5a6a84] mt-1">
            {FACULTY[session.host].name}
            {session.guests.length > 0 && ' + Guest Faculty'} · <span className="tabular-nums">{session.cme} CME</span>
          </p>
        </div>
      </a>
      <div className="sm:w-40 shrink-0 flex sm:justify-end ml-[72px] sm:ml-0">
        {registered ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 min-h-11">
            <Check className="w-4 h-4" /> Registered
          </span>
        ) : (
          <a href={registerHref(session)} className={cn(buttonSecondary)}>
            Register
          </a>
        )}
      </div>
    </div>
  )
}

const FORMAT = [
  { label: 'Research update', detail: 'What changed in the evidence this month.' },
  { label: 'Clinical case', detail: 'A real, de-identified case from faculty practice.' },
  { label: 'Faculty discussion', detail: 'Dr. Berman and guest faculty debate the decisions.' },
  { label: 'Q&A', detail: 'Ask in advance or live; top questions are answered on air.' },
]

function UpcomingTab() {
  const [next, ...later] = SESSIONS
  return (
    <div className="flex flex-col gap-10">
      <NextSession session={next} />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
        <section className="min-w-0">
          <h2 className="font-serif text-xl mb-4">Later this season</h2>
          <Card className="divide-y divide-[#d1d9e6] overflow-hidden">
            {later.map((s) => (
              <SessionRow key={s.id} session={s} />
            ))}
          </Card>
        </section>
        <aside>
          <Card className="p-5">
            <h2 className="font-serif text-lg">How Grand Rounds work</h2>
            <p className="text-sm text-[#5a6a84] mt-1">A live monthly session with Dr. Dean Berman and guest faculty.</p>
            <ol className="mt-4 flex flex-col gap-3">
              {FORMAT.map((f) => (
                <li key={f.label} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{f.label}</p>
                    <p className="text-sm text-[#5a6a84]">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 pt-4 border-t border-[#d1d9e6] flex flex-col gap-2 text-sm text-[#5a6a84]">
              <span className="inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8a6d22]" /> CME credit for live attendance or replay + quiz
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8a6d22]" /> Recording in the library within 48 hours
              </span>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

const WATCHED = new Set(['gr-2026-08', 'gr-2026-07'])

function ReplaysTab() {
  const replays = LIBRARY.filter((i) => i.type === 'grand-rounds')
  const cmeEarned = replays.filter((r) => WATCHED.has(r.id)).reduce((s, r) => s + (r.cme ?? 0), 0)
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[#5a6a84] max-w-2xl">
        Every session with its summary and CME quiz. You have earned <span className="font-semibold text-[#0d2147] tabular-nums">{cmeEarned} CME</span> from replays this year.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {replays.map((r) => {
          const watched = WATCHED.has(r.id)
          return (
            <a key={r.id} href={`#/library/item/${r.id}`} className="group">
              <Card className="h-full p-5 flex gap-4 group-hover:border-[#0d2147]/40 transition-colors">
                <span className="w-11 h-11 rounded-full bg-[#0d2147] text-white flex items-center justify-center shrink-0 group-hover:bg-[#1a3260] transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#8a6d22]">
                    {topicLabel(r.topic)} · {r.date}
                  </p>
                  <h3 className="text-sm sm:text-[15px] font-semibold leading-snug mt-0.5">{r.title}</h3>
                  <p className="text-sm text-[#5a6a84] mt-1 line-clamp-2">{r.summary}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-[#5a6a84] tabular-nums">
                    <span>{r.minutes} min</span>
                    <span>Summary · Quiz</span>
                    {watched ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <Check className="w-3.5 h-3.5" /> {r.cme} CME earned
                      </span>
                    ) : (
                      <span>{r.cme} CME available</span>
                    )}
                  </div>
                </div>
              </Card>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function GrandRoundsHub({ tab, onSignOut }: { tab: GrandRoundsTab; onSignOut: () => void }) {
  return (
    <CampusLayout active="grand-rounds" title="Grand Rounds" onSignOut={onSignOut}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <TabChips
          label="Grand Rounds sections"
          tabs={[
            { key: 'upcoming', label: 'Upcoming', href: '#/grand-rounds', count: SESSIONS.length },
            { key: 'replays', label: 'Replays', href: '#/grand-rounds/replays', count: LIBRARY.filter((i) => i.type === 'grand-rounds').length },
          ]}
          active={tab}
        />
        <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#5a6a84]">
          <Users className="w-4 h-4" /> 4 attended this year
        </span>
      </div>
      {tab === 'upcoming' ? <UpcomingTab /> : <ReplaysTab />}
    </CampusLayout>
  )
}
