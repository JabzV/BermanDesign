import { useState } from 'react'
import { Stethoscope } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { EmptyState, buttonSecondary } from '../ui'
import { LIBRARY, TOPICS, type TopicKey, type LibraryItem } from '../data/library'
import { CaseCard, FilterChips } from './parts'

type TopicFilter = 'all' | TopicKey
type LevelFilter = 'all' | NonNullable<LibraryItem['level']>

const CASES = LIBRARY.filter((i) => i.type === 'case')
const TOPIC_FILTERS: { key: TopicFilter; label: string }[] = [
  { key: 'all', label: 'All topics' },
  ...TOPICS.filter((t) => CASES.some((c) => c.topic === t.key)).map((t) => ({ key: t.key as TopicFilter, label: t.label })),
]
const LEVEL_FILTERS: { key: LevelFilter; label: string }[] = [
  { key: 'all', label: 'Any level' },
  { key: 'Foundational', label: 'Foundational' },
  { key: 'Intermediate', label: 'Intermediate' },
  { key: 'Advanced', label: 'Advanced' },
]

export default function ClinicalCases({ onSignOut }: { onSignOut: () => void }) {
  const [topic, setTopic] = useState<TopicFilter>('all')
  const [level, setLevel] = useState<LevelFilter>('all')
  const cases = CASES.filter((c) => (topic === 'all' || c.topic === topic) && (level === 'all' || c.level === level))

  return (
    <CampusLayout active="library" title="Clinical Cases" back={{ label: 'Clinical Library', href: '#/library' }} onSignOut={onSignOut}>
      <p className="text-[#5a6a84] max-w-2xl">
        Each case gives you the presentation and findings first. Commit to your own plan, then reveal the faculty discussion and compare.
      </p>
      <div className="flex flex-col gap-3 mt-6">
        <FilterChips options={TOPIC_FILTERS} value={topic} onChange={setTopic} label="Filter by topic" />
        <FilterChips options={LEVEL_FILTERS} value={level} onChange={setLevel} label="Filter by level" />
      </div>
      <p className="text-sm text-[#5a6a84] mt-6 mb-3 tabular-nums" aria-live="polite">
        {cases.length} {cases.length === 1 ? 'case' : 'cases'}
      </p>
      {cases.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Stethoscope}
          title="No cases match"
          body="Try another topic or level."
          action={
            <button
              onClick={() => {
                setTopic('all')
                setLevel('all')
              }}
              className={buttonSecondary}
            >
              Clear filters
            </button>
          }
        />
      )}
    </CampusLayout>
  )
}
