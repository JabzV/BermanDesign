import { Hammer } from 'lucide-react'
import CampusLayout, { type CampusSection } from './CampusLayout'
import CampusDashboard from './CampusDashboard'
import LearnHub, { type LearnTab } from './learn/LearnHub'
import ProgramOverview from './learn/ProgramOverview'
import ModulePage from './learn/ModulePage'
import LessonPlayer from './learn/LessonPlayer'
import Assessment from './learn/Assessment'
import LibraryHome from './library/LibraryHome'
import ClinicalCases from './library/ClinicalCases'
import GrandRoundsLibrary from './library/GrandRoundsLibrary'
import LibraryItem from './library/LibraryItem'
import { TOPICS, type TopicKey } from './data/library'
import { EmptyState, buttonPrimary } from './ui'
import { useHashRoute } from './router'

const LEARN_TABS: LearnTab[] = ['programs', 'courses', 'masterclasses', 'intensives', 'saved', 'completed']

const SECTION_TITLES: Record<CampusSection, string> = {
  home: 'Home',
  learn: 'Learn',
  library: 'Clinical Library',
  research: 'Research',
  'grand-rounds': 'Grand Rounds',
  network: 'Network',
  credentials: 'Credentials',
  profile: 'Profile',
}

function ComingSoon({ section, onSignOut }: { section: CampusSection; onSignOut: () => void }) {
  return (
    <CampusLayout active={section} title={SECTION_TITLES[section]} onSignOut={onSignOut}>
      <EmptyState
        icon={Hammer}
        title={`${SECTION_TITLES[section]} is being designed`}
        body="This section of My Campus is next on the design list."
        action={
          <a href="#/learn" className={buttonPrimary}>
            Go to Learn
          </a>
        }
      />
    </CampusLayout>
  )
}

export default function CampusApp({ onSignOut }: { onSignOut: () => void }) {
  const path = useHashRoute()
  const parts = path.split('/').filter(Boolean)
  const [section = 'home', ...rest] = parts

  if (section === 'learn') {
    const [kind, a, b, c] = rest
    if (!kind) return <LearnHub tab="programs" onSignOut={onSignOut} />
    if (LEARN_TABS.includes(kind as LearnTab)) return <LearnHub tab={kind as LearnTab} onSignOut={onSignOut} />
    if (kind === 'program' && b === 'module' && c) return <ModulePage key={c} number={Number(c)} onSignOut={onSignOut} />
    if (kind === 'program' && a) return <ProgramOverview onSignOut={onSignOut} />
    if (kind === 'lesson' && a) return <LessonPlayer key={a} id={a} onSignOut={onSignOut} />
    if (kind === 'assessment' && a) return <Assessment key={a} id={a} onSignOut={onSignOut} />
    return <LearnHub tab="programs" onSignOut={onSignOut} />
  }

  if (section === 'library') {
    const [kind, a] = rest
    if (kind === 'cases') return <ClinicalCases onSignOut={onSignOut} />
    if (kind === 'grand-rounds') return <GrandRoundsLibrary onSignOut={onSignOut} />
    if (kind === 'item' && a) return <LibraryItem key={a} id={a} onSignOut={onSignOut} />
    const topic = kind === 'topic' && TOPICS.some((t) => t.key === a) ? (a as TopicKey) : undefined
    return <LibraryHome key={topic ?? 'all'} topic={topic} onSignOut={onSignOut} />
  }

  if (section === 'home' || !(section in SECTION_TITLES)) return <CampusDashboard onSignOut={onSignOut} />
  return <ComingSoon section={section as CampusSection} onSignOut={onSignOut} />
}
