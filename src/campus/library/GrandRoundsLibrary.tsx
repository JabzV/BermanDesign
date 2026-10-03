import { Play, ArrowRight, CalendarDays } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, FacultyAvatar } from '../ui'
import { FACULTY } from '../data/learn'
import { LIBRARY } from '../data/library'
import { itemHref, topicLabel } from './parts'
import grandRoundsPhoto from '../../imports/aasagfg.png'

const ROUNDS = LIBRARY.filter((i) => i.type === 'grand-rounds')

export default function GrandRoundsLibrary({ onSignOut }: { onSignOut: () => void }) {
  const [latest, ...past] = ROUNDS
  return (
    <CampusLayout active="library" title="Grand Rounds Library" back={{ label: 'Clinical Library', href: '#/library' }} onSignOut={onSignOut}>
      <p className="text-[#5a6a84] max-w-2xl">
        Every monthly Grand Rounds session is recorded with its research update, case, faculty discussion and Q&amp;A, plus a written summary and a CME quiz.
      </p>

      <a href={itemHref(latest)} className="group mt-6 grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] rounded-2xl overflow-hidden bg-[#0d2147] text-white">
        <div className="relative aspect-video md:aspect-auto md:min-h-72 overflow-hidden">
          <img src={grandRoundsPhoto} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-white text-[#0d2147] flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] group-hover:bg-[#e2c575] transition-colors">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </span>
          </span>
        </div>
        <div className="p-5 sm:p-7 flex flex-col">
          <p className="text-sm text-white/75">Latest · {latest.date}</p>
          <h2 className="font-serif text-2xl leading-snug mt-1 text-balance">{latest.title}</h2>
          <p className="text-sm text-white/75 mt-2">{latest.summary}</p>
          <p className="text-sm text-white/75 mt-4 tabular-nums">
            {FACULTY[latest.faculty].name} + Guest Faculty · {latest.minutes} min · {latest.cme} CME
          </p>
          <span className="mt-6 md:mt-auto self-start inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-white text-[#0d2147] text-sm font-bold group-hover:bg-[#e2c575] transition-colors">
            Watch replay <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </a>

      <Card className="mt-4 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <CalendarDays className="w-5 h-5 text-[#8a6d22] shrink-0" />
        <p className="text-sm flex-1">
          <span className="font-semibold">Next live session: Oct 9.</span> <span className="text-[#5a6a84]">Recordings are added here within 48 hours.</span>
        </p>
        <a href="#/grand-rounds" className="text-sm font-semibold inline-flex items-center gap-1 hover:underline underline-offset-4">
          Upcoming sessions <ArrowRight className="w-4 h-4" />
        </a>
      </Card>

      <section className="mt-10">
        <h2 className="font-serif text-xl mb-4">Past sessions · 2026</h2>
        <Card className="divide-y divide-[#d1d9e6] overflow-hidden">
          {past.map((r) => {
            const [month, day] = r.date.split(' ')
            return (
              <a key={r.id} href={itemHref(r)} className="flex items-start sm:items-center gap-4 p-4 sm:p-5 hover:bg-[#f5f6f8] transition-colors group">
                <div className="w-12 shrink-0 text-center">
                  <div className="text-[11px] font-bold uppercase text-[#8a6d22]">{month}</div>
                  <div className="font-serif text-2xl leading-none mt-0.5">{day.replace(',', '')}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#8a6d22]">{topicLabel(r.topic)}</p>
                  <h3 className="text-sm sm:text-base font-semibold leading-snug mt-0.5 group-hover:underline underline-offset-4 decoration-[#c9a84c]">{r.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-[#5a6a84] tabular-nums">
                    <span className="inline-flex items-center gap-1.5">
                      <FacultyAvatar id={r.faculty} size="sm" />
                      {FACULTY[r.faculty].name}
                    </span>
                    <span>{r.minutes} min</span>
                    <span>{r.cme} CME</span>
                    <span>Summary · Quiz</span>
                  </div>
                </div>
                <Play className="hidden sm:block w-5 h-5 text-[#5a6a84] shrink-0" />
              </a>
            )
          })}
        </Card>
      </section>
    </CampusLayout>
  )
}
