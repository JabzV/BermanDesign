import { useState, type FormEvent } from 'react'
import { CheckCircle2, CalendarPlus, CalendarX, Radio, PlayCircle, Mail, Bell, MessageSquareText } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, buttonPrimary, buttonSecondary } from '../ui'
import { findSession, registerFor, useRegistered, type Session } from '../data/grandRounds'
import { DateBlock, Speakers, sessionHref, liveHref } from './parts'
import { cn } from '../../lib/utils'

type Mode = 'live' | 'replay'

function Confirmation({ session, mode }: { session: Session; mode: Mode }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 sm:p-8">
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        <h2 className="font-serif text-2xl mt-4">You're registered</h2>
        <p className="text-[#5a6a84] mt-2">
          {session.title} · {session.weekday}, {session.month} {session.day} at {session.time}. A confirmation has been sent to ana.reyes@clinic.com.
        </p>

        <h3 className="text-sm font-semibold mt-6">Add to your calendar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          {['Google Calendar', 'Outlook', 'Apple (.ics)'].map((c) => (
            <button key={c} className={cn(buttonSecondary, 'px-3')}>
              <CalendarPlus className="w-4 h-4" /> {c}
            </button>
          ))}
        </div>

        <h3 className="text-sm font-semibold mt-6">What happens next</h3>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-[#5a6a84]">
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
            Pre-reading is posted one week before the session.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
            {mode === 'live'
              ? 'The session room opens 15 minutes before start. Stay for the full session to receive CME credit.'
              : 'The recording, summary and CME quiz appear in the Grand Rounds Library within 48 hours.'}
          </li>
        </ul>

        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
          <a href="#/grand-rounds" className={buttonSecondary}>
            Back to Grand Rounds
          </a>
          <a href={mode === 'live' ? liveHref(session) : sessionHref(session)} className={buttonPrimary}>
            {mode === 'live' ? (
              <>
                <Radio className="w-4 h-4" /> Preview the session room
              </>
            ) : (
              'Session details'
            )}
          </a>
        </div>
      </Card>
    </div>
  )
}

export default function Register({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const session = findSession(id)
  const alreadyRegistered = useRegistered(id)
  const [mode, setMode] = useState<Mode>('live')
  const [reminders, setReminders] = useState({ day: true, hour: true, sms: false })
  const [question, setQuestion] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  const back = session ? { label: 'Session details', href: sessionHref(session) } : { label: 'Grand Rounds', href: '#/grand-rounds' }
  const layout = { active: 'grand-rounds' as const, title: 'Register', back, onSignOut }

  if (!session)
    return (
      <CampusLayout {...layout}>
        <EmptyState
          icon={CalendarX}
          title="Session not found"
          body="It may have been rescheduled."
          action={
            <a href="#/grand-rounds" className={buttonPrimary}>
              Upcoming sessions
            </a>
          }
        />
      </CampusLayout>
    )

  if (alreadyRegistered)
    return (
      <CampusLayout {...layout}>
        <Confirmation session={session} mode={mode} />
      </CampusLayout>
    )

  const submit = (e: FormEvent) => {
    e.preventDefault()
    registerFor(session.id)
  }

  const modes: { key: Mode; icon: typeof Radio; title: string; detail: string }[] = [
    { key: 'live', icon: Radio, title: 'Attend live', detail: `Join on ${session.weekday} and earn ${session.cme} CME for full attendance.` },
    { key: 'replay', icon: PlayCircle, title: 'Watch the replay', detail: 'Get the recording and summary; CME after passing the quiz.' },
  ]

  const reminderOptions: { key: keyof typeof reminders; icon: typeof Mail; label: string }[] = [
    { key: 'day', icon: Mail, label: 'Email the day before' },
    { key: 'hour', icon: Bell, label: 'Email 1 hour before' },
    { key: 'sms', icon: MessageSquareText, label: 'Text message 15 minutes before' },
  ]

  return (
    <CampusLayout {...layout}>
      <form onSubmit={submit} className="max-w-2xl mx-auto flex flex-col gap-5">
        <Card className="p-5 sm:p-6">
          <div className="flex gap-4">
            <DateBlock session={session} />
            <div className="min-w-0">
              <p className="text-sm text-[#5a6a84]">
                {session.weekday} · {session.time} · {session.minutes} min
              </p>
              <h2 className="font-serif text-xl leading-snug mt-0.5">{session.title}</h2>
            </div>
          </div>
          <div className="mt-4">
            <Speakers session={session} />
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="font-serif text-lg">Your details</h2>
          <dl className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
            {[
              ['Name', 'Dr. Ana Reyes'],
              ['Specialty', 'Internal Medicine'],
              ['Email', 'ana.reyes@clinic.com'],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-[#5a6a84]">{k}</dt>
                <dd className="font-semibold truncate">{v}</dd>
              </div>
            ))}
          </dl>
          <a href="#/profile" className="inline-block mt-3 text-sm font-semibold underline underline-offset-4 decoration-[#c9a84c]">
            Edit in profile
          </a>
        </Card>

        <Card className="p-5 sm:p-6">
          <fieldset>
            <legend className="font-serif text-lg">How will you attend?</legend>
            <div className="mt-3 grid sm:grid-cols-2 gap-2.5">
              {modes.map((m) => {
                const selected = mode === m.key
                const Icon = m.icon
                return (
                  <label
                    key={m.key}
                    className={cn(
                      'flex gap-3 rounded-xl border p-4 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#c9a84c]',
                      selected ? 'border-[#0d2147] bg-[#f5f6f8]' : 'border-[#d1d9e6] hover:border-[#0d2147]/40',
                    )}
                  >
                    <input type="radio" name="mode" checked={selected} onChange={() => setMode(m.key)} className="sr-only" />
                    <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', selected ? 'text-[#0d2147]' : 'text-[#5a6a84]')} />
                    <span>
                      <span className="block text-sm font-semibold">{m.title}</span>
                      <span className="block text-sm text-[#5a6a84] mt-0.5">{m.detail}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </Card>

        {mode === 'live' && (
          <Card className="p-5 sm:p-6">
            <fieldset>
              <legend className="font-serif text-lg">Reminders</legend>
              <div className="mt-3 flex flex-col gap-1">
                {reminderOptions.map((r) => {
                  const Icon = r.icon
                  return (
                    <label key={r.key} className="flex items-center gap-3 min-h-11 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reminders[r.key]}
                        onChange={(e) => setReminders((prev) => ({ ...prev, [r.key]: e.target.checked }))}
                        className="w-5 h-5"
                      />
                      <Icon className="w-4 h-4 text-[#5a6a84]" />
                      <span className="text-sm">{r.label}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </Card>
        )}

        <Card className="p-5 sm:p-6">
          <label htmlFor="question" className="font-serif text-lg">
            Ask the faculty in advance <span className="font-sans text-sm text-[#5a6a84]">(optional)</span>
          </label>
          <p className="text-sm text-[#5a6a84] mt-0.5">Advance questions are grouped by theme and answered during Q&amp;A.</p>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder="Do not include patient identifiers."
            className="mt-3 w-full rounded-xl border border-[#d1d9e6] bg-white p-4 text-[15px] leading-relaxed outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa] resize-y"
          />
          <label className="mt-2 flex items-center gap-3 min-h-11 cursor-pointer">
            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-5 h-5" />
            <span className="text-sm">Ask anonymously</span>
          </label>
        </Card>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <a href={sessionHref(session)} className={buttonSecondary}>
            Cancel
          </a>
          <button type="submit" className={buttonPrimary}>
            Confirm registration
          </button>
        </div>
      </form>
    </CampusLayout>
  )
}
