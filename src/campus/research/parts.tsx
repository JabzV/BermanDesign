import { FileText, BookOpenCheck, Lightbulb, ScrollText, FlaskConical, MessagesSquare, MessageSquare, type LucideIcon } from 'lucide-react'
import { Card, FacultyAvatar } from '../ui'
import { RESEARCH_TYPE_LABEL, type Author, type ResearchItem, type ResearchType } from '../data/research'
import { topicLabel } from '../library/parts'
import { cn } from '../../lib/utils'

export const RESEARCH_ICON: Record<ResearchType, LucideIcon> = {
  brief: FileText,
  'journal-club': BookOpenCheck,
  insight: Lightbulb,
  publication: ScrollText,
  project: FlaskConical,
  discussion: MessagesSquare,
}

export const researchHref = (item: ResearchItem) => `#/research/item/${item.id}`

export function AuthorAvatar({ author, size = 'sm' }: { author: Author; size?: 'sm' | 'md' }) {
  if (author.faculty) return <FacultyAvatar id={author.faculty} size={size} />
  const dim = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-10 h-10 text-xs'
  return <span className={cn(dim, 'rounded-full bg-[#0d2147] text-[#e2c575] font-serif flex items-center justify-center shrink-0')}>{author.initials}</span>
}

export function AuthorLine({ author, date, className }: { author: Author; date?: string; className?: string }) {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <AuthorAvatar author={author} />
      <p className="text-xs text-[#5a6a84] leading-relaxed pt-1">
        <span className="text-[#0d2147] font-medium">{author.name}</span> · {author.role}
        {date && <> · {date}</>}
      </p>
    </div>
  )
}

/** Generic feed row for any research item. */
export function ResearchRow({ item, showType = true }: { item: ResearchItem; showType?: boolean }) {
  const Icon = RESEARCH_ICON[item.type]
  return (
    <a href={researchHref(item)} className="flex items-start gap-4 p-4 sm:p-5 hover:bg-[#f5f6f8] transition-colors group">
      <span className="w-10 h-10 rounded-full bg-[#e8edf5] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#0d2147]" strokeWidth={1.8} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#8a6d22]">
          {showType ? `${RESEARCH_TYPE_LABEL[item.type]} · ` : ''}
          {topicLabel(item.topic)}
        </p>
        <h3 className="text-sm sm:text-[15px] font-semibold leading-snug mt-0.5 group-hover:underline underline-offset-4 decoration-[#c9a84c]">{item.title}</h3>
        <p className="text-sm text-[#5a6a84] mt-1 line-clamp-2">{item.summary}</p>
        <div className="flex items-end justify-between gap-3 mt-3">
          <AuthorLine author={item.author} date={item.date} />
          <span className="inline-flex items-center gap-1 text-xs text-[#5a6a84] tabular-nums shrink-0 pb-1">
            <MessageSquare className="w-3.5 h-3.5" /> {item.comments}
          </span>
        </div>
      </div>
    </a>
  )
}

export function ResearchList({ items, showType }: { items: ResearchItem[]; showType?: boolean }) {
  return (
    <Card className="divide-y divide-[#d1d9e6] overflow-hidden">
      {items.map((i) => (
        <ResearchRow key={i.id} item={i} showType={showType} />
      ))}
    </Card>
  )
}

export const STATUS_STYLE: Record<NonNullable<ResearchItem['status']>, string> = {
  Recruiting: 'bg-emerald-50 text-emerald-700',
  'Data collection': 'bg-[#e8edf5] text-[#0d2147]',
  Analysis: 'bg-[#fbf7ec] text-[#8a6d22]',
}
