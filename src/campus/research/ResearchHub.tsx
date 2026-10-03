import { useState } from 'react'
import { CalendarDays, Check, ArrowRight, PenLine, Bell, BellRing, MapPin, Users, Send, Clock, AlertCircle, Plus, BookOpenCheck } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, TabChips, FilterChips, SectionHeader, buttonPrimary, buttonSecondary } from '../ui'
import { RESEARCH, MY_SUBMISSIONS, type ResearchItem } from '../data/research'
import { TOPICS, type TopicKey } from '../data/library'
import { ResearchList, AuthorLine, researchHref, STATUS_STYLE } from './parts'
import { topicLabel } from '../library/parts'
import { cn } from '../../lib/utils'

export type ResearchTab = 'feed' | 'journal-club' | 'discussions' | 'projects' | 'insights' | 'publications'

const byType = (type: ResearchItem['type']) => RESEARCH.filter((r) => r.type === type)

const TABS: { key: ResearchTab; label: string }[] = [
  { key: 'feed', label: 'Research Feed' },
  { key: 'journal-club', label: 'Journal Club' },
  { key: 'discussions', label: 'Discussions' },
  { key: 'projects', label: 'Active Projects' },
  { key: 'insights', label: 'Clinical Insights' },
  { key: 'publications', label: 'Publications' },
]

function NextJournalClub() {
  const jc = RESEARCH.find((r) => r.type === 'journal-club' && r.upcoming)!
  const [registered, setRegistered] = useState(false)
  return (
    <section className="relative bg-[#0d2147] text-white rounded-2xl p-5 sm:p-8 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-28 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
      />
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:items-end">
        <div>
          <p className="text-sm text-white/75 inline-flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-[#e2c575]" /> Next Journal Club · {jc.sessionDate}
          </p>
          <h2 className="font-serif text-2xl sm:text-[28px] leading-snug mt-2 max-w-2xl text-balance">{jc.title}</h2>
          <p className="text-sm text-white/75 mt-3 max-w-2xl">{jc.paper}</p>
          <p className="text-sm text-white/75 mt-3">Moderated by {jc.author.name}</p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <button
            onClick={() => setRegistered((r) => !r)}
            aria-pressed={registered}
            className={cn(
              'inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full text-sm font-bold transition-colors',
              registered ? 'bg-white/10 text-white border border-white/30' : 'bg-white text-[#0d2147] hover:bg-[#e2c575]',
            )}
          >
            {registered ? (
              <>
                <Check className="w-4 h-4" /> Registered
              </>
            ) : (
              <>
                <CalendarDays className="w-4 h-4" /> Register
              </>
            )}
          </button>
          <a href={researchHref(jc)} className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors">
            Read the paper <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function SubmitCta() {
  return (
    <Card className="p-5 sm:p-6">
      <span className="w-11 h-11 rounded-xl bg-[#fbf7ec] text-[#8a6d22] flex items-center justify-center">
        <PenLine className="w-5 h-5" />
      </span>
      <h2 className="font-serif text-lg mt-4">Share what you are seeing in practice</h2>
      <p className="text-sm text-[#5a6a84] mt-1">
        Clinical insights are reviewed by the editorial team and published to members with your name and specialty.
      </p>
      <a href="#/research/submit" className={cn(buttonPrimary, 'mt-5 w-full')}>
        Submit a clinical insight
      </a>
    </Card>
  )
}

function ProjectCard({ item }: { item: ResearchItem }) {
  const [following, setFollowing] = useState(false)
  const [interested, setInterested] = useState(false)
  return (
    <Card className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between gap-3">
        <span className={cn('text-xs font-semibold rounded-full px-2.5 py-1', STATUS_STYLE[item.status!])}>{item.status}</span>
        <span className="text-xs text-[#5a6a84]">{item.date}</span>
      </div>
      <a href={researchHref(item)} className="group">
        <h3 className="font-serif text-lg leading-snug mt-4 group-hover:underline underline-offset-4 decoration-[#c9a84c]">{item.title}</h3>
      </a>
      <p className="text-sm text-[#5a6a84] mt-2">{item.summary}</p>
      <dl className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-xs text-[#5a6a84] tabular-nums">
        <div className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          <dt className="sr-only">Sites</dt>
          <dd>{item.sites} member sites</dd>
        </div>
        <div className="inline-flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <dt className="sr-only">Participants</dt>
          <dd>{item.participants}</dd>
        </div>
      </dl>
      <AuthorLine author={item.author} className="mt-4" />
      <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => setFollowing((f) => !f)}
          aria-pressed={following}
          className={cn(buttonSecondary, 'px-3', following && 'border-[#c9a84c] bg-[#fbf7ec] text-[#8a6d22]')}
        >
          {following ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          {following ? 'Following' : 'Follow'}
        </button>
        {item.status === 'Recruiting' ? (
          <button onClick={() => setInterested(true)} disabled={interested} className={cn(buttonPrimary, 'px-3')}>
            {interested ? (
              <>
                <Check className="w-4 h-4" /> Interest sent
              </>
            ) : (
              'Join as a site'
            )}
          </button>
        ) : (
          <a href={researchHref(item)} className={cn(buttonSecondary, 'px-3')}>
            Details
          </a>
        )}
      </div>
    </Card>
  )
}

function FeedTab() {
  const latest = RESEARCH.filter((r) => r.isNew && !r.upcoming)
  const earlier = RESEARCH.filter((r) => !r.isNew && (r.type === 'brief' || r.type === 'insight' || r.type === 'discussion'))
  return (
    <div className="flex flex-col gap-10">
      <NextJournalClub />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
        <div className="flex flex-col gap-10 min-w-0">
          <section>
            <SectionHeader title="This week" />
            <ResearchList items={latest} />
          </section>
          <section>
            <SectionHeader title="Earlier" />
            <ResearchList items={earlier} />
          </section>
        </div>
        <aside className="flex flex-col gap-4">
          <SubmitCta />
          <Card className="p-5">
            <SectionHeader title="Active projects" action="All" href="#/research/projects" />
            <ul className="flex flex-col gap-4">
              {byType('project').map((p) => (
                <li key={p.id}>
                  <a href={researchHref(p)} className="group block">
                    <span className={cn('text-[11px] font-semibold rounded-full px-2 py-0.5', STATUS_STYLE[p.status!])}>{p.status}</span>
                    <p className="text-sm font-semibold mt-1.5 group-hover:underline underline-offset-4 decoration-[#c9a84c]">{p.title}</p>
                    <p className="text-xs text-[#5a6a84] mt-0.5 tabular-nums">
                      {p.sites} sites · {p.participants}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function JournalClubTab() {
  const past = byType('journal-club').filter((j) => !j.upcoming)
  return (
    <div className="flex flex-col gap-10">
      <NextJournalClub />
      <section>
        <h2 className="font-serif text-xl">Past sessions</h2>
        <p className="text-sm text-[#5a6a84] mt-1 mb-4">Each session keeps its paper, moderator notes and member discussion.</p>
        <ResearchList items={past} showType={false} />
      </section>
    </div>
  )
}

type TopicFilter = 'all' | TopicKey
function DiscussionsTab() {
  const all = byType('discussion').sort((a, b) => b.comments - a.comments)
  const topics: { key: TopicFilter; label: string }[] = [
    { key: 'all', label: 'All topics' },
    ...TOPICS.filter((t) => all.some((d) => d.topic === t.key)).map((t) => ({ key: t.key as TopicFilter, label: t.label })),
  ]
  const [topic, setTopic] = useState<TopicFilter>('all')
  const items = all.filter((d) => topic === 'all' || d.topic === topic)
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <FilterChips options={topics} value={topic} onChange={setTopic} label="Filter by topic" />
        <button className={cn(buttonPrimary, 'shrink-0')}>
          <Plus className="w-4 h-4" /> Start a discussion
        </button>
      </div>
      <ResearchList items={items} showType={false} />
    </div>
  )
}

function ProjectsTab() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[#5a6a84] max-w-2xl">
        Institute-led studies run across member clinics. Follow a project for updates, or apply to contribute data as a site.
      </p>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {byType('project').map((p) => (
          <ProjectCard key={p.id} item={p} />
        ))}
      </div>
    </div>
  )
}

const SUBMISSION_STYLE = {
  'Under editorial review': { icon: Clock, cls: 'bg-[#e8edf5] text-[#0d2147]' },
  'Changes requested': { icon: AlertCircle, cls: 'bg-[#fbf7ec] text-[#8a6d22]' },
}

function InsightsTab() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
      <section className="min-w-0">
        <h2 className="font-serif text-xl mb-4">Published insights</h2>
        <ResearchList items={byType('insight')} showType={false} />
      </section>
      <aside className="flex flex-col gap-4">
        <SubmitCta />
        <Card className="p-5">
          <h2 className="font-serif text-lg">My submissions</h2>
          <ul className="mt-3 flex flex-col divide-y divide-[#e8edf5]">
            {MY_SUBMISSIONS.map((s) => {
              const st = SUBMISSION_STYLE[s.status]
              const Icon = st.icon
              return (
                <li key={s.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-semibold leading-snug">{s.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5', st.cls)}>
                      <Icon className="w-3 h-3" /> {s.status}
                    </span>
                    <span className="text-xs text-[#5a6a84]">{s.date}</span>
                  </div>
                  {s.status === 'Changes requested' && (
                    <a href="#/research/submit" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold hover:underline underline-offset-4">
                      <Send className="w-3.5 h-3.5" /> Revise and resubmit
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </Card>
      </aside>
    </div>
  )
}

type PubFilter = 'all' | NonNullable<ResearchItem['pubKind']>
const PUB_FILTERS: { key: PubFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Peer-reviewed', label: 'Peer-reviewed' },
  { key: 'Position statement', label: 'Position statements' },
  { key: 'Institute report', label: 'Institute reports' },
]

function PublicationsTab() {
  const [kind, setKind] = useState<PubFilter>('all')
  const pubs = byType('publication').filter((p) => kind === 'all' || p.pubKind === kind)
  return (
    <div className="flex flex-col gap-5">
      <FilterChips options={PUB_FILTERS} value={kind} onChange={setKind} label="Filter publications" />
      <div className="flex flex-col gap-3">
        {pubs.map((p) => (
          <a key={p.id} href={researchHref(p)} className="group">
            <Card className="p-5 sm:p-6 group-hover:border-[#0d2147]/40 transition-colors">
              <p className="text-xs font-semibold text-[#8a6d22]">
                {p.pubKind} · {topicLabel(p.topic)} · {p.date}
              </p>
              <h3 className="font-serif text-lg leading-snug mt-1.5">{p.title}</h3>
              <p className="text-sm text-[#5a6a84] mt-1.5">{p.summary}</p>
              <p className="text-xs text-[#5a6a84] mt-3 italic">{p.citation}</p>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function ResearchHub({ tab, onSignOut }: { tab: ResearchTab; onSignOut: () => void }) {
  return (
    <CampusLayout active="research" title="Research" onSignOut={onSignOut}>
      <div className="mb-6">
        <TabChips label="Research sections" tabs={TABS.map((t) => ({ ...t, href: t.key === 'feed' ? '#/research' : `#/research/${t.key}` }))} active={tab} />
      </div>
      {tab === 'feed' && <FeedTab />}
      {tab === 'journal-club' && <JournalClubTab />}
      {tab === 'discussions' && <DiscussionsTab />}
      {tab === 'projects' && <ProjectsTab />}
      {tab === 'insights' && <InsightsTab />}
      {tab === 'publications' && <PublicationsTab />}
    </CampusLayout>
  )
}
