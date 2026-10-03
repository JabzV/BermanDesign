import { useMemo, useState } from 'react'
import { Search, X, ArrowRight, Stethoscope, SearchX, Play } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, TopicTile, EmptyState, TabChips, SectionHeader, buttonSecondary } from '../ui'
import { LIBRARY, TOPICS, TYPE_LABEL, type ItemType, type TopicKey } from '../data/library'
import { FACULTY } from '../data/learn'
import { ItemList, FilterChips } from './parts'
import grandRoundsPhoto from '../../imports/aasagfg.png'

type TypeFilter = 'all' | ItemType
const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: 'all', label: 'All types' },
  { key: 'video', label: 'Videos' },
  { key: 'article', label: 'Articles' },
  { key: 'case', label: 'Cases' },
  { key: 'grand-rounds', label: 'Grand Rounds' },
  { key: 'protocol', label: 'Protocols' },
]

function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-[#d1d9e6] rounded-full pl-5 pr-2 min-h-13 focus-within:border-[#c9a84c] transition-colors">
      <Search className="w-5 h-5 text-[#5a6a84] shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search the Clinical Library"
        placeholder="Search topics, cases, faculty…"
        className="flex-1 min-w-0 bg-transparent text-[15px] outline-none placeholder:text-[#5a6a84] [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button onClick={() => onChange('')} aria-label="Clear search" className="w-10 h-10 rounded-full flex items-center justify-center text-[#5a6a84] hover:bg-[#f5f6f8]">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

function Collections() {
  const latest = LIBRARY.find((i) => i.type === 'grand-rounds')!
  const caseCount = LIBRARY.filter((i) => i.type === 'case').length
  const roundsCount = LIBRARY.filter((i) => i.type === 'grand-rounds').length
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <a href="#/library/grand-rounds" className="group relative block rounded-2xl overflow-hidden bg-[#0d2147] text-white min-h-64">
        <img src={grandRoundsPhoto} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.03] transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d2147] via-[#0d2147]/60 to-[#0d2147]/10" />
        <div className="relative h-full flex flex-col justify-end p-5 sm:p-7">
          <p className="text-sm text-white/75">Grand Rounds Library · {roundsCount} recordings</p>
          <h2 className="font-serif text-2xl sm:text-[28px] leading-snug mt-1 max-w-lg text-balance">{latest.title}</h2>
          <p className="text-sm text-white/75 mt-2">
            Latest replay · {FACULTY[latest.faculty].name} + Guest Faculty · {latest.minutes} min
          </p>
          <span className="mt-5 self-start inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-white text-[#0d2147] text-sm font-bold group-hover:bg-[#e2c575] transition-colors">
            <Play className="w-4 h-4" fill="currentColor" /> Browse recordings
          </span>
        </div>
      </a>
      <a href="#/library/cases" className="group block">
        <Card className="h-full p-5 sm:p-7 flex flex-col group-hover:border-[#0d2147]/40 transition-colors">
          <span className="w-12 h-12 rounded-xl bg-[#0d2147] text-[#c9a84c] flex items-center justify-center">
            <Stethoscope className="w-6 h-6" strokeWidth={1.6} />
          </span>
          <h2 className="font-serif text-2xl mt-5">Clinical Cases</h2>
          <p className="text-sm text-[#5a6a84] mt-2">
            Real-world presentations with labs, a faculty discussion and teaching points. Work through them before reading the answer.
          </p>
          <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold">
            {caseCount} cases <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Card>
      </a>
    </div>
  )
}

function TopicGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {TOPICS.map((t) => {
        const count = LIBRARY.filter((i) => i.topic === t.key).length
        return (
          <a key={t.key} href={`#/library/topic/${t.key}`} className="group">
            <Card className="h-full p-4 flex flex-col gap-3 group-hover:border-[#0d2147]/40 transition-colors">
              <TopicTile icon={t.icon} tone={t.tone} className="w-11 h-11 rounded-lg" iconClassName="w-5 h-5" />
              <div>
                <h3 className="text-sm font-semibold">{t.label}</h3>
                <p className="text-xs text-[#5a6a84] mt-0.5 line-clamp-2">{t.blurb}</p>
              </div>
              <p className="text-xs text-[#5a6a84] mt-auto tabular-nums">{count} {count === 1 ? 'item' : 'items'}</p>
            </Card>
          </a>
        )
      })}
    </div>
  )
}

export default function LibraryHome({ topic, onSignOut }: { topic?: TopicKey; onSignOut: () => void }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<TypeFilter>('all')
  const topicInfo = TOPICS.find((t) => t.key === topic)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LIBRARY.filter((i) => {
      if (topic && i.topic !== topic) return false
      if (type !== 'all' && i.type !== type) return false
      if (!q) return true
      return [i.title, i.summary, FACULTY[i.faculty].name, TYPE_LABEL[i.type], TOPICS.find((t) => t.key === i.topic)?.label]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [query, topic, type])

  const browsing = !topic && !query.trim()
  const topicTabs = [{ key: 'all', label: 'All topics', href: '#/library' }, ...TOPICS.map((t) => ({ key: t.key, label: t.label, href: `#/library/topic/${t.key}` }))]

  return (
    <CampusLayout
      active="library"
      title={topicInfo ? topicInfo.label : 'Clinical Library'}
      back={topicInfo ? { label: 'Clinical Library', href: '#/library' } : undefined}
      onSignOut={onSignOut}
    >
      <SearchField value={query} onChange={setQuery} />
      <div className="mt-4">
        <TabChips label="Topics" tabs={topicTabs} active={topic ?? 'all'} />
      </div>

      {browsing ? (
        <div className="flex flex-col gap-10 mt-8">
          <Collections />
          <section>
            <SectionHeader title="New this month" />
            <ItemList items={LIBRARY.filter((i) => i.isNew)} />
          </section>
          <section>
            <SectionHeader title="Browse by topic" />
            <TopicGrid />
          </section>
        </div>
      ) : (
        <section className="mt-8">
          {topicInfo && !query.trim() && <p className="text-[#5a6a84] mb-5 max-w-2xl">{topicInfo.blurb}.</p>}
          <FilterChips options={TYPE_FILTERS} value={type} onChange={setType} label="Filter by type" />
          <p className="text-sm text-[#5a6a84] mt-5 mb-3 tabular-nums" aria-live="polite">
            {results.length} {results.length === 1 ? 'result' : 'results'}
            {query.trim() && <> for “{query.trim()}”</>}
          </p>
          {results.length > 0 ? (
            <ItemList items={results} />
          ) : (
            <EmptyState
              icon={SearchX}
              title="No matches"
              body="Try a broader term, another topic, or clear the type filter."
              action={
                <button
                  onClick={() => {
                    setQuery('')
                    setType('all')
                  }}
                  className={buttonSecondary}
                >
                  Clear filters
                </button>
              }
            />
          )}
        </section>
      )}
    </CampusLayout>
  )
}
