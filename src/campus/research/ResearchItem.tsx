import { useState, type FormEvent } from 'react'
import { Download, Copy, Check, CalendarDays, MapPin, Users, BadgeCheck, FileSearch, MessageSquare, Bell, BellRing } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, buttonPrimary, buttonSecondary } from '../ui'
import { findResearch, RESEARCH, RESEARCH_TYPE_LABEL, DETAIL_SECTIONS, COMMENTS, type ResearchItem as Item } from '../data/research'
import { topicLabel } from '../library/parts'
import { AuthorAvatar, ResearchList, STATUS_STYLE } from './parts'
import { cn } from '../../lib/utils'

const BACK: Record<Item['type'], { label: string; href: string }> = {
  brief: { label: 'Research Feed', href: '#/research' },
  'journal-club': { label: 'Journal Club', href: '#/research/journal-club' },
  insight: { label: 'Clinical Insights', href: '#/research/insights' },
  publication: { label: 'Publications', href: '#/research/publications' },
  project: { label: 'Active Projects', href: '#/research/projects' },
  discussion: { label: 'Discussions', href: '#/research/discussions' },
}

function SideCard({ item }: { item: Item }) {
  const [copied, setCopied] = useState(false)
  const [toggled, setToggled] = useState(false)

  if (item.type === 'publication')
    return (
      <Card className="p-5">
        <h2 className="text-sm font-semibold">Cite this</h2>
        <p className="text-sm text-[#5a6a84] italic mt-2">{item.citation}</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className={cn(buttonPrimary, 'px-3')}>
            <Download className="w-4 h-4" /> PDF
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(item.citation ?? '').catch(() => {})
              setCopied(true)
            }}
            className={cn(buttonSecondary, 'px-3')}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </Card>
    )

  if (item.type === 'project')
    return (
      <Card className="p-5">
        <span className={cn('text-xs font-semibold rounded-full px-2.5 py-1', STATUS_STYLE[item.status!])}>{item.status}</span>
        <dl className="mt-4 flex flex-col gap-2 text-sm tabular-nums">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#5a6a84]" />
            <dt className="sr-only">Sites</dt>
            <dd>{item.sites} member sites</dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5a6a84]" />
            <dt className="sr-only">Participants</dt>
            <dd>{item.participants}</dd>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#5a6a84]" />
            <dt className="sr-only">Started</dt>
            <dd>{item.date}</dd>
          </div>
        </dl>
        <button
          onClick={() => setToggled((t) => !t)}
          aria-pressed={toggled}
          className={cn(item.status === 'Recruiting' && !toggled ? buttonPrimary : buttonSecondary, 'mt-5 w-full')}
        >
          {item.status === 'Recruiting' ? (
            toggled ? (
              <>
                <Check className="w-4 h-4" /> Interest sent
              </>
            ) : (
              'Join as a site'
            )
          ) : toggled ? (
            <>
              <BellRing className="w-4 h-4" /> Following
            </>
          ) : (
            <>
              <Bell className="w-4 h-4" /> Follow updates
            </>
          )}
        </button>
      </Card>
    )

  if (item.type === 'journal-club')
    return (
      <Card className="p-5">
        <h2 className="text-sm font-semibold">{item.upcoming ? 'Live session' : 'Session held'}</h2>
        <p className="text-sm mt-1 inline-flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#5a6a84]" /> {item.sessionDate}
        </p>
        <p className="text-sm text-[#5a6a84] italic mt-3">{item.paper}</p>
        {item.upcoming ? (
          <button onClick={() => setToggled((t) => !t)} aria-pressed={toggled} className={cn(toggled ? buttonSecondary : buttonPrimary, 'mt-5 w-full')}>
            {toggled ? (
              <>
                <Check className="w-4 h-4" /> Registered
              </>
            ) : (
              'Register'
            )}
          </button>
        ) : (
          <a href="#/library/grand-rounds" className={cn(buttonSecondary, 'mt-5 w-full')}>
            Watch the recording
          </a>
        )}
      </Card>
    )

  if (item.type === 'insight')
    return (
      <Card className="p-5 flex gap-3">
        <BadgeCheck className="w-5 h-5 text-[#8a6d22] shrink-0" />
        <p className="text-sm text-[#5a6a84]">
          <span className="font-semibold text-[#0d2147]">Editorially reviewed.</span> Clinical insights are member observations reviewed for safety and clarity. They are
          not peer-reviewed research.
        </p>
      </Card>
    )

  if (item.type === 'brief')
    return (
      <Card className="p-5">
        <h2 className="text-sm font-semibold">Full brief</h2>
        <p className="text-sm text-[#5a6a84] mt-1">Includes the evidence table and references.</p>
        <button className={cn(buttonPrimary, 'mt-4 w-full')}>
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </Card>
    )

  return null
}

function Discussion({ item }: { item: Item }) {
  const [comments, setComments] = useState(COMMENTS)
  const [draft, setDraft] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    setComments((c) => [...c, { author: { name: 'Dr. Ana Reyes', role: 'Member · Internal Medicine', initials: 'AR' }, date: 'Just now', text: draft.trim() }])
    setDraft('')
  }
  const total = item.comments - COMMENTS.length + comments.length
  return (
    <section id="discussion" className="mt-10">
      <h2 className="font-serif text-xl inline-flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#5a6a84]" /> Discussion <span className="text-[#5a6a84] text-base tabular-nums">({total})</span>
      </h2>
      <p className="text-sm text-[#5a6a84] mt-1">Showing the latest replies.</p>
      <ol className="mt-4 flex flex-col gap-3">
        {comments.map((c, i) => (
          <li key={i}>
            <Card className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <AuthorAvatar author={c.author} size="md" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{c.author.name}</p>
                  <p className="text-xs text-[#5a6a84]">
                    {c.author.role} · {c.date}
                  </p>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed mt-3">{c.text}</p>
            </Card>
          </li>
        ))}
      </ol>
      <form onSubmit={submit} className="mt-4">
        <label htmlFor="reply" className="text-sm font-semibold">
          Add to the discussion
        </label>
        <textarea
          id="reply"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Share your experience or a question. Do not include patient identifiers."
          className="mt-2 w-full rounded-xl border border-[#d1d9e6] bg-white p-4 text-[15px] leading-relaxed outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa] resize-y"
        />
        <div className="flex justify-end mt-2">
          <button type="submit" disabled={!draft.trim()} className={buttonPrimary}>
            Post reply
          </button>
        </div>
      </form>
    </section>
  )
}

export default function ResearchItem({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const item = findResearch(id)
  if (!item)
    return (
      <CampusLayout active="research" title="Research" back={{ label: 'Research Feed', href: '#/research' }} onSignOut={onSignOut}>
        <EmptyState
          icon={FileSearch}
          title="Not found"
          body="This item may have been moved or archived."
          action={
            <a href="#/research" className={buttonPrimary}>
              Back to Research
            </a>
          }
        />
      </CampusLayout>
    )

  const related = RESEARCH.filter((r) => r.id !== item.id && r.topic === item.topic).slice(0, 3)

  return (
    <CampusLayout active="research" title={RESEARCH_TYPE_LABEL[item.type]} back={BACK[item.type]} onSignOut={onSignOut}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
        <div className="min-w-0">
          <header>
            <p className="text-sm font-semibold text-[#8a6d22]">
              {item.type === 'publication' ? item.pubKind : RESEARCH_TYPE_LABEL[item.type]} · {topicLabel(item.topic)}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl leading-snug mt-1 text-balance">{item.title}</h2>
            <p className="text-[#5a6a84] mt-2 max-w-2xl">{item.summary}</p>
            <div className="flex items-center gap-3 mt-5">
              <AuthorAvatar author={item.author} size="md" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{item.author.name}</p>
                <p className="text-xs text-[#5a6a84] tabular-nums">
                  {item.author.role} · {item.date}
                  {item.type !== 'project' && item.type !== 'journal-club' && ` · ${item.minutes} min read`}
                </p>
              </div>
            </div>
          </header>

          <div className="lg:hidden mt-6">
            <SideCard item={item} />
          </div>

          <article className="mt-8 max-w-prose">
            {DETAIL_SECTIONS[item.type].map((s) => (
              <section key={s.heading} className="mt-8 first:mt-0">
                <h3 className="font-serif text-xl">{s.heading}</h3>
                <p className="text-[16px] leading-[1.75] mt-3">{s.text}</p>
              </section>
            ))}
          </article>

          <Discussion item={item} />
        </div>

        <aside className="flex flex-col gap-6">
          <div className="hidden lg:block">
            <SideCard item={item} />
          </div>
          {related.length > 0 && (
            <div>
              <h2 className="font-serif text-lg mb-3">Related</h2>
              <ResearchList items={related} />
            </div>
          )}
        </aside>
      </div>
    </CampusLayout>
  )
}
