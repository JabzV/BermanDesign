import { useMemo, useState } from 'react'
import { Search, X, SearchX, ShieldAlert, CalendarDays, ArrowRight, MessageCircleQuestion, Users, BookOpenCheck, BadgeCheck } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, TabChips, FilterChips, EmptyState, SectionHeader, FacultyAvatar, buttonSecondary } from '../ui'
import { MEMBERS, THREADS, COHORT, ME, findMember, type Thread } from '../data/network'
import { FACULTY } from '../data/learn'
import { TOPICS, type TopicKey } from '../data/library'
import { ThreadList, MemberCard, Composer, Byline, MemberAvatar, threadHref } from './parts'
import { cn } from '../../lib/utils'

export type NetworkTab = 'community' | 'cohort' | 'ask-faculty' | 'journal-club' | 'clinical' | 'directory'

const TABS: { key: NetworkTab; label: string }[] = [
  { key: 'community', label: 'Community' },
  { key: 'cohort', label: 'My Cohort' },
  { key: 'ask-faculty', label: 'Ask the Faculty' },
  { key: 'journal-club', label: 'Journal Club' },
  { key: 'clinical', label: 'Clinical Discussions' },
  { key: 'directory', label: 'Member Directory' },
]

type TopicFilter = 'all' | TopicKey
const topicOptions = (threads: Thread[]): { key: TopicFilter; label: string }[] => [
  { key: 'all', label: 'All topics' },
  ...TOPICS.filter((t) => threads.some((th) => th.topic === t.key)).map((t) => ({ key: t.key as TopicFilter, label: t.label })),
]

function newThread(kind: Thread['kind'], p: { title: string; body: string; topic: TopicKey; anonymous: boolean }, extra: Partial<Thread> = {}): Thread {
  return { id: `new-${Date.now()}`, kind, author: ME, date: 'Just now', replies: 0, helpful: 0, ...p, ...extra }
}

function Guidelines() {
  return (
    <Card className="p-5 flex gap-3">
      <ShieldAlert className="w-5 h-5 text-[#8a6d22] shrink-0" />
      <div className="text-sm">
        <p className="font-semibold">Verified clinicians only</p>
        <p className="text-[#5a6a84] mt-1">
          Discussions are visible to verified members. Never include names, dates of birth, images or other details that could identify a patient.
        </p>
      </div>
    </Card>
  )
}

function CohortMini() {
  const cohort = MEMBERS.filter((m) => m.standing === 'Fall 2026 Cohort')
  return (
    <Card className="p-5">
      <SectionHeader title="My Cohort" action="Open" href="#/network/cohort" />
      <p className="text-sm text-[#5a6a84] -mt-2">
        {COHORT.name} · {COHORT.members} clinicians
      </p>
      <div className="flex -space-x-1 mt-4">
        {cohort.slice(0, 6).map((m) => (
          <span key={m.id} className="rounded-full ring-2 ring-white">
            <MemberAvatar member={m} />
          </span>
        ))}
        <span className="w-10 h-10 rounded-full ring-2 ring-white bg-[#e8edf5] text-xs font-semibold flex items-center justify-center tabular-nums">
          +{COHORT.members - 6}
        </span>
      </div>
      <p className="text-sm mt-4">
        <span className="font-semibold">Next: </span>
        {COHORT.events[0].title} · <span className="text-[#5a6a84]">{COHORT.events[0].when}</span>
      </p>
    </Card>
  )
}

function CommunityTab() {
  const [threads, setThreads] = useState(THREADS.filter((t) => t.kind === 'community'))
  const [topic, setTopic] = useState<TopicFilter>('all')
  const shown = threads.filter((t) => topic === 'all' || t.topic === topic).sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned))
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
      <div className="min-w-0 flex flex-col gap-4">
        <Composer prompt="Start a discussion with the community…" onPost={(p) => setThreads((prev) => [newThread('community', p), ...prev])} />
        <FilterChips options={topicOptions(threads)} value={topic} onChange={setTopic} label="Filter by topic" />
        <ThreadList threads={shown} />
      </div>
      <aside className="flex flex-col gap-4">
        <CohortMini />
        <Card className="p-5">
          <MessageCircleQuestion className="w-5 h-5 text-[#8a6d22]" />
          <h2 className="font-serif text-lg mt-3">Have a question for faculty?</h2>
          <p className="text-sm text-[#5a6a84] mt-1">Faculty answer member questions each week. Answers are shared with everyone.</p>
          <a href="#/network/ask-faculty" className={cn(buttonSecondary, 'mt-4 w-full')}>
            Ask the Faculty
          </a>
        </Card>
        <Guidelines />
      </aside>
    </div>
  )
}

function CohortTab() {
  const cohort = MEMBERS.filter((m) => m.standing === 'Fall 2026 Cohort')
  const [threads, setThreads] = useState(THREADS.filter((t) => t.cohort))
  return (
    <div className="flex flex-col gap-8">
      <Card className="p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="w-12 h-12 rounded-xl bg-[#0d2147] text-[#c9a84c] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" strokeWidth={1.6} />
          </span>
          <div className="flex-1">
            <h2 className="font-serif text-2xl leading-snug">{COHORT.name}</h2>
            <p className="text-sm text-[#5a6a84]">
              {COHORT.program} · {COHORT.members} clinicians · Started {COHORT.started}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FacultyAvatar id={COHORT.lead} size="sm" />
            <span>
              Cohort lead <span className="font-semibold">{FACULTY[COHORT.lead].name}</span>
            </span>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
        <section className="min-w-0 flex flex-col gap-4">
          <h2 className="font-serif text-xl">Cohort discussions</h2>
          <Composer prompt="Post to your cohort…" onPost={(p) => setThreads((prev) => [newThread('community', p, { cohort: true }), ...prev])} />
          <ThreadList threads={threads} />
        </section>
        <aside className="flex flex-col gap-4">
          <Card className="p-5">
            <h2 className="font-serif text-lg">Upcoming</h2>
            <ul className="mt-3 flex flex-col gap-4">
              {COHORT.events.map((e) => (
                <li key={e.title} className="flex gap-3">
                  <CalendarDays className="w-4 h-4 text-[#8a6d22] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{e.title}</p>
                    <p className="text-xs text-[#5a6a84] mt-0.5">
                      {e.when} · {e.host}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>

      <section>
        <SectionHeader title="Cohort members" action={`All ${COHORT.members}`} href="#/network/directory" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {cohort.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </section>
    </div>
  )
}

type FqFilter = 'answered' | 'awaiting' | 'mine'
function AskFacultyTab() {
  const [threads, setThreads] = useState(THREADS.filter((t) => t.kind === 'faculty-question'))
  const [filter, setFilter] = useState<FqFilter>('answered')
  const shown = threads.filter((t) => (filter === 'answered' ? !!t.answer : filter === 'awaiting' ? !t.answer : t.author === ME))
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
      <div className="min-w-0 flex flex-col gap-4">
        <Composer
          prompt="Ask the faculty a clinical question…"
          submitLabel="Send question"
          allowAnonymous
          onPost={(p) => {
            setThreads((prev) => [newThread('faculty-question', p), ...prev])
            setFilter('mine')
          }}
        />
        <FilterChips
          options={[
            { key: 'answered', label: 'Answered' },
            { key: 'awaiting', label: 'Awaiting answer' },
            { key: 'mine', label: 'My questions' },
          ]}
          value={filter}
          onChange={setFilter}
          label="Filter questions"
        />
        {shown.length === 0 ? (
          <EmptyState icon={MessageCircleQuestion} title="Nothing here yet" body="Questions you ask appear here until faculty answer them." />
        ) : (
          <div className="flex flex-col gap-3">
            {shown.map((t) => (
              <Card key={t.id} className="p-4 sm:p-5">
                <a href={threadHref(t)} className="group block">
                  <h3 className="text-[15px] font-semibold leading-snug group-hover:underline underline-offset-4 decoration-[#c9a84c]">{t.title}</h3>
                </a>
                <Byline memberId={t.author} anonymous={t.anonymous} date={t.date} className="mt-2" />
                {t.answer ? (
                  <div className="mt-4 rounded-xl bg-[#fbf7ec] p-4">
                    <div className="flex items-center gap-2">
                      <FacultyAvatar id={t.answeredBy!} size="sm" />
                      <p className="text-xs">
                        <span className="font-semibold">{FACULTY[t.answeredBy!].name}</span> <span className="text-[#5a6a84]">answered</span>
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed mt-2">{t.answer}</p>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-[#5a6a84]">Faculty usually answer within a week.</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      <aside className="flex flex-col gap-4">
        <Card className="p-5">
          <h2 className="font-serif text-lg">Answering this month</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {['berman', 'chen', 'torres'].map((id) => (
              <li key={id} className="flex items-center gap-3">
                <FacultyAvatar id={id} />
                <div>
                  <p className="text-sm font-semibold">{FACULTY[id].name}</p>
                  <p className="text-xs text-[#5a6a84]">{FACULTY[id].title}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Guidelines />
      </aside>
    </div>
  )
}

function JournalClubTab() {
  const threads = THREADS.filter((t) => t.kind === 'journal-club')
  const sessions = [...new Set(threads.map((t) => t.session!))]
  return (
    <div className="flex flex-col gap-8">
      <p className="text-[#5a6a84] max-w-2xl">
        Discussion continues before and after each Journal Club session. Read the paper and moderator notes in{' '}
        <a href="#/research/journal-club" className="font-semibold text-[#0d2147] underline underline-offset-4 decoration-[#c9a84c]">
          Research
        </a>
        .
      </p>
      {sessions.map((s, i) => {
        const [date, title] = s.split(' · ')
        return (
          <section key={s}>
            <div className="flex items-start gap-3 mb-3">
              <BookOpenCheck className="w-5 h-5 text-[#8a6d22] shrink-0 mt-1" />
              <div>
                <p className="text-sm text-[#5a6a84]">
                  {i === 0 ? 'Upcoming' : 'Session'} · {date}
                </p>
                <h2 className="font-serif text-xl leading-snug">{title}</h2>
              </div>
            </div>
            <ThreadList threads={threads.filter((t) => t.session === s)} />
          </section>
        )
      })}
    </div>
  )
}

function ClinicalTab() {
  const [threads, setThreads] = useState(THREADS.filter((t) => t.kind === 'clinical'))
  const [topic, setTopic] = useState<TopicFilter>('all')
  const shown = threads.filter((t) => topic === 'all' || t.topic === topic)
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
      <div className="min-w-0 flex flex-col gap-4">
        <Composer prompt="Present a case or practice question…" onPost={(p) => setThreads((prev) => [newThread('clinical', p), ...prev])} />
        <FilterChips options={topicOptions(threads)} value={topic} onChange={setTopic} label="Filter by topic" />
        <ThreadList threads={shown} />
      </div>
      <aside className="flex flex-col gap-4">
        <Guidelines />
        <Card className="p-5">
          <h2 className="font-serif text-lg">Presenting a case well</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-[#5a6a84]">
            {['Age range, sex and relevant history only', 'Key labs with units and dates relative to treatment', 'What you have tried and what you are weighing', 'The specific question you want answered'].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Card>
      </aside>
    </div>
  )
}

type StandingFilter = 'all' | 'Faculty' | 'Graduate' | 'Fall 2026 Cohort'
function DirectoryTab() {
  const [query, setQuery] = useState('')
  const [standing, setStanding] = useState<StandingFilter>('all')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MEMBERS.filter(
      (m) =>
        (standing === 'all' || m.standing === standing) &&
        (!verifiedOnly || m.verified) &&
        (!q || [m.name, m.specialty, m.location, m.organization].join(' ').toLowerCase().includes(q)),
    )
  }, [query, standing, verifiedOnly])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 bg-white border border-[#d1d9e6] rounded-full pl-5 pr-2 min-h-13 focus-within:border-[#c9a84c] transition-colors">
        <Search className="w-5 h-5 text-[#5a6a84] shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search members"
          placeholder="Search by name, specialty or city…"
          className="flex-1 min-w-0 bg-transparent text-[15px] outline-none placeholder:text-[#5a6a84] [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Clear search" className="w-10 h-10 rounded-full flex items-center justify-center text-[#5a6a84] hover:bg-[#f5f6f8]">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <FilterChips
          options={[
            { key: 'all', label: 'Everyone' },
            { key: 'Faculty', label: 'Faculty' },
            { key: 'Graduate', label: 'Graduates' },
            { key: 'Fall 2026 Cohort', label: 'My cohort' },
          ]}
          value={standing}
          onChange={setStanding}
          label="Filter members"
        />
        <label className="flex items-center gap-2 text-sm cursor-pointer min-h-10 sm:ml-auto">
          <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="w-4 h-4" />
          <BadgeCheck className="w-4 h-4 text-[#1a3260]" /> Verified only
        </label>
      </div>
      <p className="text-sm text-[#5a6a84] tabular-nums" aria-live="polite">
        {results.length} {results.length === 1 ? 'member' : 'members'}
      </p>
      {results.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No members found"
          body="Try a different name, specialty or city."
          action={
            <button
              onClick={() => {
                setQuery('')
                setStanding('all')
                setVerifiedOnly(false)
              }}
              className={buttonSecondary}
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  )
}

export default function NetworkHub({ tab, onSignOut }: { tab: NetworkTab; onSignOut: () => void }) {
  const me = findMember(ME)!
  return (
    <CampusLayout active="network" title="Network" onSignOut={onSignOut}>
      <div className="mb-6 flex items-center gap-4">
        <TabChips label="Network sections" tabs={TABS.map((t) => ({ ...t, href: t.key === 'community' ? '#/network' : `#/network/${t.key}` }))} active={tab} />
        <a href={`#/network/member/${me.id}`} className="hidden xl:inline-flex items-center gap-2 ml-auto text-sm text-[#5a6a84] hover:text-[#0d2147] shrink-0">
          View my public profile <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      {tab === 'community' && <CommunityTab />}
      {tab === 'cohort' && <CohortTab />}
      {tab === 'ask-faculty' && <AskFacultyTab />}
      {tab === 'journal-club' && <JournalClubTab />}
      {tab === 'clinical' && <ClinicalTab />}
      {tab === 'directory' && <DirectoryTab />}
    </CampusLayout>
  )
}

