import { CalendarDays, Clock, Award, Users, Download, Radio, CalendarPlus, CalendarX } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, FacultyAvatar, buttonPrimary, buttonSecondary } from '../ui'
import { FACULTY } from '../data/learn'
import { findSession, useRegistered, type Session } from '../data/grandRounds'
import { topicLabel } from '../library/parts'
import { DateBlock, RegisteredBadge, registerHref, liveHref } from './parts'
import { cn } from '../../lib/utils'

function ActionCard({ session }: { session: Session }) {
  const registered = useRegistered(session.id)
  return (
    <Card className="p-5">
      <div className="flex gap-4 items-center">
        <DateBlock session={session} />
        <div>
          <p className="text-sm font-semibold">
            {session.weekday}, {session.month} {session.day}
          </p>
          <p className="text-sm text-[#5a6a84]">
            {session.time} · {session.minutes} min
          </p>
          <p className="text-xs text-[#8a6d22] font-semibold mt-0.5">{session.countdown}</p>
        </div>
      </div>
      <dl className="mt-5 flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#5a6a84]" />
          <dt className="sr-only">CME</dt>
          <dd className="tabular-nums">{session.cme} CME / CE credits for live attendance</dd>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#5a6a84]" />
          <dt className="sr-only">Registered</dt>
          <dd className="tabular-nums">{session.registered + (registered ? 1 : 0)} clinicians registered</dd>
        </div>
      </dl>
      {registered ? (
        <div className="mt-5 flex flex-col gap-2">
          <a href={liveHref(session)} className={cn(buttonPrimary, 'w-full')}>
            <Radio className="w-4 h-4" /> Enter session room
          </a>
          <button className={cn(buttonSecondary, 'w-full')}>
            <CalendarPlus className="w-4 h-4" /> Add to calendar
          </button>
          <p className="text-xs text-[#5a6a84] mt-1 text-center">The room opens 15 minutes before start.</p>
        </div>
      ) : (
        <a href={registerHref(session)} className={cn(buttonPrimary, 'mt-5 w-full')}>
          Register for this session
        </a>
      )}
    </Card>
  )
}

export default function SessionDetail({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const session = findSession(id)
  const back = { label: 'Grand Rounds', href: '#/grand-rounds' }
  if (!session)
    return (
      <CampusLayout active="grand-rounds" title="Grand Rounds" back={back} onSignOut={onSignOut}>
        <EmptyState
          icon={CalendarX}
          title="Session not found"
          body="It may have been rescheduled. Check the upcoming schedule."
          action={
            <a href="#/grand-rounds" className={buttonPrimary}>
              Upcoming sessions
            </a>
          }
        />
      </CampusLayout>
    )

  const host = FACULTY[session.host]
  const starts = session.agenda.map((_, i) => session.agenda.slice(0, i).reduce((sum, a) => sum + a.minutes, 0))

  return (
    <CampusLayout active="grand-rounds" title="Session" back={back} onSignOut={onSignOut}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
        <div className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-[#8a6d22]">Grand Rounds · {topicLabel(session.topic)}</p>
              <RegisteredBadge session={session} />
            </div>
            <h2 className="font-serif text-2xl sm:text-[34px] leading-tight mt-2 text-balance">{session.title}</h2>
            <p className="text-[#5a6a84] mt-3 max-w-2xl">{session.summary}</p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#5a6a84]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" /> {session.weekday}, {session.month} {session.day}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {session.time}
              </span>
            </p>
          </header>

          <div className="lg:hidden mt-6">
            <ActionCard session={session} />
          </div>

          <section className="mt-10">
            <h2 className="font-serif text-xl">Faculty</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              <li>
                <Card className="p-4 flex items-center gap-3 h-full">
                  <FacultyAvatar id={session.host} />
                  <div>
                    <p className="text-sm font-semibold">{host.name}</p>
                    <p className="text-xs text-[#5a6a84]">Host · {host.title}</p>
                  </div>
                </Card>
              </li>
              {session.guests.map((g) => (
                <li key={g.name}>
                  <Card className="p-4 flex items-center gap-3 h-full">
                    <span className="w-10 h-10 rounded-full bg-[#e8edf5] font-serif text-xs flex items-center justify-center shrink-0">{g.initials}</span>
                    <div>
                      <p className="text-sm font-semibold">{g.name}</p>
                      <p className="text-xs text-[#5a6a84]">{g.title}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl">Agenda</h2>
            <Card className="mt-4 divide-y divide-[#e8edf5]">
              {session.agenda.map((a, i) => {
                const start = starts[i]
                return (
                  <div key={a.label} className="flex gap-4 p-4 sm:p-5">
                    <span className="w-14 shrink-0 text-xs font-semibold text-[#8a6d22] tabular-nums pt-0.5">+{start} min</span>
                    <div>
                      <p className="text-sm font-semibold">
                        {a.label} <span className="font-normal text-[#5a6a84] tabular-nums">· {a.minutes} min</span>
                      </p>
                      <p className="text-sm text-[#5a6a84] mt-0.5">{a.detail}</p>
                    </div>
                  </div>
                )
              })}
            </Card>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl">Prepare</h2>
            {session.prep.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-2">
                {session.prep.map((p) => (
                  <li key={p.title}>
                    <button className="w-full flex items-center gap-3 p-3 min-h-14 rounded-xl border border-[#d1d9e6] bg-white text-left hover:border-[#0d2147]/40 transition-colors">
                      <span className="w-9 h-9 rounded-lg bg-[#e8edf5] flex items-center justify-center shrink-0">
                        <Download className="w-4 h-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold">{p.title}</span>
                        <span className="block text-xs text-[#5a6a84]">{p.kind}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#5a6a84] mt-2">Pre-reading is posted one week before the session.</p>
            )}
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ActionCard session={session} />
          </div>
        </aside>
      </div>
    </CampusLayout>
  )
}
