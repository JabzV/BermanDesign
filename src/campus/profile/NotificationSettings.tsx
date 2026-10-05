import { useState } from 'react'
import { Mail, Bell, MessageSquareText, Moon } from 'lucide-react'
import { Card, Switch, inputClass } from '../ui'
import { ProfileLayout, SectionTitle, SaveBar, Row, useToast } from './parts'
import { cn } from '../../lib/utils'

type Channel = 'email' | 'app' | 'sms'
const CHANNELS: { key: Channel; label: string; icon: typeof Mail }[] = [
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'app', label: 'In-app', icon: Bell },
  { key: 'sms', label: 'Text', icon: MessageSquareText },
]

const GROUPS: { title: string; items: { key: string; label: string; description: string; sms?: boolean }[] }[] = [
  {
    title: 'Learning',
    items: [
      { key: 'deadlines', label: 'Program deadlines and progress', description: 'Module unlocks, knowledge checks and assessment windows', sms: true },
      { key: 'grandRounds', label: 'Grand Rounds reminders', description: 'For sessions you register for', sms: true },
      { key: 'credentials', label: 'Certificates and CME', description: 'When a certificate or credit is added to your record' },
    ],
  },
  {
    title: 'Community',
    items: [
      { key: 'replies', label: 'Replies to my discussions', description: 'Including threads you follow' },
      { key: 'faculty', label: 'Ask the Faculty answers', description: 'When faculty answer your question' },
      { key: 'cohort', label: 'Cohort posts and events', description: 'From the Fall 2026 cohort' },
    ],
  },
  {
    title: 'Research and institute',
    items: [
      { key: 'journalClub', label: 'Journal Club', description: 'New sessions and pre-reading' },
      { key: 'insights', label: 'Clinical insight review updates', description: 'Status changes on your submissions' },
      { key: 'news', label: 'Institute news', description: 'Announcements and new programs' },
    ],
  },
]

type Prefs = { channels: Record<string, Record<Channel, boolean>>; digest: string; quiet: boolean; quietFrom: string; quietTo: string }

const INITIAL: Prefs = {
  channels: {
    deadlines: { email: true, app: true, sms: false },
    grandRounds: { email: true, app: true, sms: true },
    credentials: { email: true, app: true, sms: false },
    replies: { email: false, app: true, sms: false },
    faculty: { email: true, app: true, sms: false },
    cohort: { email: false, app: true, sms: false },
    journalClub: { email: true, app: true, sms: false },
    insights: { email: true, app: true, sms: false },
    news: { email: true, app: false, sms: false },
  },
  digest: 'weekly',
  quiet: true,
  quietFrom: '21:00',
  quietTo: '07:00',
}

export default function NotificationSettings({ onSignOut }: { onSignOut: () => void }) {
  const [saved, setSaved] = useState(INITIAL)
  const [prefs, setPrefs] = useState(INITIAL)
  const { show, toast } = useToast()
  const dirty = JSON.stringify(prefs) !== JSON.stringify(saved)

  const toggle = (key: string, ch: Channel, v: boolean) => setPrefs((p) => ({ ...p, channels: { ...p.channels, [key]: { ...p.channels[key], [ch]: v } } }))

  return (
    <ProfileLayout section="notifications" onSignOut={onSignOut}>
      <SectionTitle title="Notifications" description="Choose what reaches you, and where. Account and security emails are always sent." />

      <div className="flex flex-col gap-5">
        {GROUPS.map((g) => (
          <Card key={g.title} className="overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3 bg-[#f5f6f8] border-b border-[#e8edf5]">
              <h3 className="font-serif text-lg">{g.title}</h3>
              <div className="hidden sm:grid grid-cols-3 w-[204px] text-center text-xs font-semibold text-[#5a6a84]" aria-hidden>
                {CHANNELS.map((c) => (
                  <span key={c.key}>{c.label}</span>
                ))}
              </div>
            </div>
            <ul className="divide-y divide-[#e8edf5]">
              {g.items.map((item) => (
                <li key={item.key} className="px-5 sm:px-6 py-3 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-sm text-[#5a6a84] mt-0.5">{item.description}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 grid grid-cols-3 sm:w-[204px] shrink-0">
                    {CHANNELS.map((c) => {
                      const available = c.key !== 'sms' || item.sms
                      const Icon = c.icon
                      return (
                        <div key={c.key} className="flex flex-col sm:flex-row items-center justify-center gap-0.5">
                          <span className="sm:hidden inline-flex items-center gap-1 text-[11px] text-[#5a6a84]">
                            <Icon className="w-3 h-3" /> {c.label}
                          </span>
                          {available ? (
                            <Switch checked={prefs.channels[item.key][c.key]} onChange={(v) => toggle(item.key, c.key, v)} label={`${item.label} by ${c.label}`} />
                          ) : (
                            <span className="min-h-11 flex items-center text-xs text-[#8392aa]" aria-label={`${c.label} not available for ${item.label}`}>
                              —
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Card className="px-5 sm:px-6 py-2 divide-y divide-[#e8edf5]">
          <Row label="Email digest" description="One summary of research, discussions and library additions.">
            <select
              aria-label="Email digest frequency"
              value={prefs.digest}
              onChange={(e) => setPrefs((p) => ({ ...p, digest: e.target.value }))}
              className={cn(inputClass(), 'w-36 min-h-11')}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="off">Off</option>
            </select>
          </Row>
          <div className="py-3">
            <Row label="Quiet hours" description="Pause in-app and text notifications overnight, in your time zone.">
              <Switch checked={prefs.quiet} onChange={(v) => setPrefs((p) => ({ ...p, quiet: v }))} label="Quiet hours" />
            </Row>
            {prefs.quiet && (
              <div className="flex flex-wrap items-center gap-3 pb-2">
                <Moon className="w-4 h-4 text-[#5a6a84]" />
                <label className="text-sm flex items-center gap-2">
                  From
                  <input type="time" value={prefs.quietFrom} onChange={(e) => setPrefs((p) => ({ ...p, quietFrom: e.target.value }))} className={cn(inputClass(), 'w-40 min-h-11 tabular-nums')} />
                </label>
                <label className="text-sm flex items-center gap-2">
                  to
                  <input type="time" value={prefs.quietTo} onChange={(e) => setPrefs((p) => ({ ...p, quietTo: e.target.value }))} className={cn(inputClass(), 'w-40 min-h-11 tabular-nums')} />
                </label>
              </div>
            )}
          </div>
        </Card>
      </div>

      <SaveBar
        dirty={dirty}
        onSave={() => {
          setSaved(prefs)
          show('Notification preferences saved')
        }}
        onDiscard={() => setPrefs(saved)}
      />
      {toast}
    </ProfileLayout>
  )
}
