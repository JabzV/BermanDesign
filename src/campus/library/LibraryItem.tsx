import { useState } from 'react'
import { Bookmark, BookmarkCheck, Download, Eye, MessageSquare, Lightbulb, ArrowRight, Award, FileSearch, ClipboardCheck } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import VideoPlayer from '../VideoPlayer'
import { Card, EmptyState, FacultyAvatar, buttonPrimary, buttonSecondary } from '../ui'
import { FACULTY } from '../data/learn'
import {
  findItem,
  relatedItems,
  TYPE_LABEL,
  ARTICLE_BODY,
  ARTICLE_REFERENCES,
  CASE_DETAIL,
  GRAND_ROUNDS_AGENDA,
  GRAND_ROUNDS_SUMMARY,
  type LibraryItem as Item,
} from '../data/library'
import { ItemList, topicLabel } from './parts'
import { cn } from '../../lib/utils'
import grandRoundsPhoto from '../../imports/aasagfg.png'

function Header({ item }: { item: Item }) {
  const [saved, setSaved] = useState(false)
  const f = FACULTY[item.faculty]
  return (
    <header>
      <p className="text-sm font-semibold text-[#8a6d22]">
        {topicLabel(item.topic)} · {TYPE_LABEL[item.type]}
      </p>
      <h2 className="font-serif text-2xl sm:text-3xl leading-snug mt-1 text-balance max-w-3xl">{item.title}</h2>
      <p className="text-[#5a6a84] mt-2 max-w-2xl">{item.summary}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-5">
        <div className="flex items-center gap-3">
          <FacultyAvatar id={item.faculty} />
          <div className="leading-tight">
            <p className="text-sm font-semibold">
              {f.name}
              {item.type === 'grand-rounds' && ' + Guest Faculty'}
            </p>
            <p className="text-xs text-[#5a6a84] tabular-nums">
              {item.date} · {item.minutes} min
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          {item.cme && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a6d22] bg-[#fbf7ec] rounded-full px-3 min-h-9 tabular-nums">
              <Award className="w-3.5 h-3.5" /> {item.cme} CME
            </span>
          )}
          <button
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            className={cn(
              'inline-flex items-center gap-2 min-h-11 px-4 rounded-full border text-sm font-semibold transition-colors',
              saved ? 'border-[#c9a84c] bg-[#fbf7ec] text-[#8a6d22]' : 'border-[#d1d9e6] bg-white hover:border-[#0d2147]',
            )}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </header>
  )
}

function CaseBody({ item }: { item: Item }) {
  const [revealed, setRevealed] = useState(false)
  const [plan, setPlan] = useState('')
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5 sm:p-6">
        <h3 className="font-serif text-lg">Presentation</h3>
        <p className="text-[15px] leading-relaxed mt-2 max-w-prose">{CASE_DETAIL.presentation}</p>
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="font-serif text-lg">Findings</h3>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {CASE_DETAIL.findings.map((f) => (
            <div key={f.label} className="flex items-center justify-between gap-4 py-2.5 border-b border-[#e8edf5]">
              <dt className="text-sm text-[#5a6a84]">{f.label}</dt>
              <dd className={cn('text-sm tabular-nums inline-flex items-center gap-2', f.flag ? 'font-semibold' : '')}>
                {f.value}
                {f.flag && (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d22] bg-[#fbf7ec] rounded px-1.5 py-0.5">Above optimal</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className={cn('p-5 sm:p-6', !revealed && 'border-[#c9a84c]')}>
        <h3 className="font-serif text-lg">Your assessment</h3>
        <label htmlFor="case-plan" className="block text-sm text-[#5a6a84] mt-1">
          {CASE_DETAIL.question}
        </label>
        <textarea
          id="case-plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          rows={4}
          placeholder="Working diagnosis, next tests, first-line plan…"
          className="mt-3 w-full rounded-xl border border-[#d1d9e6] bg-white p-4 text-[15px] leading-relaxed outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa] resize-y"
        />
        {!revealed && (
          <button onClick={() => setRevealed(true)} className={cn(buttonPrimary, 'mt-4 w-full sm:w-auto')}>
            <Eye className="w-4 h-4" /> Reveal faculty discussion
          </button>
        )}
      </Card>

      {revealed && (
        <>
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <FacultyAvatar id={item.faculty} />
              <div>
                <h3 className="font-serif text-lg leading-tight">Faculty discussion</h3>
                <p className="text-xs text-[#5a6a84]">{FACULTY[item.faculty].name}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 max-w-prose">
              {CASE_DETAIL.discussion.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Card>
          <Card className="p-5 sm:p-6 bg-[#fbf7ec] border-[#ecdcae]">
            <h3 className="font-serif text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#8a6d22]" /> Teaching points
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {CASE_DETAIL.teachingPoints.map((t) => (
                <li key={t} className="flex gap-3 text-[15px]">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#8a6d22] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
          <a href="#/network/clinical" className="flex items-center gap-3 rounded-xl border border-[#d1d9e6] bg-white p-4 hover:border-[#0d2147]/40 transition-colors">
            <MessageSquare className="w-5 h-5 text-[#5a6a84]" />
            <span className="flex-1 text-sm">
              <span className="font-semibold">Join the case discussion</span>
              <span className="text-[#5a6a84]"> · {item.discussion ?? 0} clinicians commented</span>
            </span>
            <ArrowRight className="w-4 h-4 text-[#5a6a84]" />
          </a>
        </>
      )}
    </div>
  )
}

function GrandRoundsBody({ item }: { item: Item }) {
  return (
    <div className="flex flex-col gap-6">
      <VideoPlayer minutes={item.minutes} poster={grandRoundsPhoto} label="Play Grand Rounds recording" />
      <Card className="p-5 sm:p-6">
        <h3 className="font-serif text-lg">Session chapters</h3>
        <ol className="mt-3 -mx-2">
          {GRAND_ROUNDS_AGENDA.map((a) => (
            <li key={a.time}>
              <button className="w-full flex gap-4 p-2 rounded-lg text-left hover:bg-[#f5f6f8] transition-colors">
                <span className="text-xs font-semibold text-[#8a6d22] tabular-nums w-12 shrink-0 pt-0.5">{a.time}</span>
                <span>
                  <span className="block text-sm font-semibold">{a.label}</span>
                  <span className="block text-sm text-[#5a6a84]">{a.detail}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="p-5 sm:p-6">
        <h3 className="font-serif text-lg">Session summary</h3>
        <ul className="mt-3 flex flex-col gap-2 max-w-prose">
          {GRAND_ROUNDS_SUMMARY.map((s) => (
            <li key={s} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </Card>
      <div className="grid sm:grid-cols-2 gap-3">
        <a href="#/learn/assessment/m4-quiz" className={cn(buttonPrimary, 'w-full')}>
          <ClipboardCheck className="w-4 h-4" /> Take the CME quiz
        </a>
        <button className={cn(buttonSecondary, 'w-full')}>
          <Download className="w-4 h-4" /> Research brief (PDF)
        </button>
      </div>
    </div>
  )
}

function VideoBody({ item }: { item: Item }) {
  return (
    <div className="flex flex-col gap-6">
      <VideoPlayer minutes={item.minutes} label={`Play ${item.title}`} />
      <div className="flex flex-col sm:flex-row gap-3">
        <button className={buttonSecondary}>
          <Download className="w-4 h-4" /> Lecture slides
        </button>
        <button className={buttonSecondary}>
          <FileSearch className="w-4 h-4" /> Transcript
        </button>
      </div>
    </div>
  )
}

function ArticleBody() {
  return (
    <article className="max-w-prose">
      {ARTICLE_BODY.map((s) => (
        <section key={s.heading} className="mt-8 first:mt-0">
          <h3 className="font-serif text-xl">{s.heading}</h3>
          <p className="text-[16px] leading-[1.75] mt-3">{s.text}</p>
        </section>
      ))}
      <section className="mt-10 pt-6 border-t border-[#d1d9e6]">
        <h3 className="text-sm font-semibold">References</h3>
        <ol className="mt-3 flex flex-col gap-2 list-decimal pl-5 text-sm text-[#5a6a84]">
          {ARTICLE_REFERENCES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>
    </article>
  )
}

function ProtocolBody() {
  const steps = ['Baseline intake: activity history, HR max estimate, current fatigue', 'Set Zone 2 heart-rate range (talk test + 60–70% HRmax)', 'Weeks 1–4: 3 × 30 min sessions', 'Weeks 5–8: 3–4 × 40 min sessions', 'Weeks 9–12: 4 × 45 min sessions, add one interval session', 'Re-test fasting RER, triglycerides and waist at week 12']
  return (
    <Card className="p-5 sm:p-6">
      <h3 className="font-serif text-lg">Protocol outline</h3>
      <ol className="mt-4 flex flex-col gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-[15px]">
            <span className="w-6 h-6 rounded-full bg-[#e8edf5] text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <button className={cn(buttonPrimary, 'mt-6 w-full sm:w-auto')}>
        <Download className="w-4 h-4" /> Download protocol (PDF)
      </button>
    </Card>
  )
}

export default function LibraryItem({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const item = findItem(id)
  const back =
    item?.type === 'case'
      ? { label: 'Clinical Cases', href: '#/library/cases' }
      : item?.type === 'grand-rounds'
        ? { label: 'Grand Rounds Library', href: '#/library/grand-rounds' }
        : { label: 'Clinical Library', href: '#/library' }

  if (!item) {
    return (
      <CampusLayout active="library" title="Clinical Library" back={back} onSignOut={onSignOut}>
        <EmptyState
          icon={FileSearch}
          title="Item not found"
          body="It may have been moved or retired from the library."
          action={
            <a href="#/library" className={buttonPrimary}>
              Back to library
            </a>
          }
        />
      </CampusLayout>
    )
  }

  return (
    <CampusLayout active="library" title={TYPE_LABEL[item.type]} back={back} onSignOut={onSignOut}>
      <Header item={item} />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 mt-8">
        <div className="min-w-0">
          {item.type === 'case' && <CaseBody item={item} />}
          {item.type === 'grand-rounds' && <GrandRoundsBody item={item} />}
          {item.type === 'video' && <VideoBody item={item} />}
          {item.type === 'article' && <ArticleBody />}
          {item.type === 'protocol' && <ProtocolBody />}
        </div>
        <aside>
          <h2 className="font-serif text-lg mb-3">Related</h2>
          <ItemList items={relatedItems(item)} />
        </aside>
      </div>
    </CampusLayout>
  )
}
