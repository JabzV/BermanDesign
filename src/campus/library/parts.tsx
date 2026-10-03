import { PlayCircle, FileText, Stethoscope, Radio, ClipboardList, MessageSquare, type LucideIcon } from 'lucide-react'
import { Card, FacultyAvatar } from '../ui'
import { FACULTY } from '../data/learn'
import { TOPICS, TYPE_LABEL, type ItemType, type LibraryItem } from '../data/library'
import { cn } from '../../lib/utils'

export const TYPE_ICON: Record<ItemType, LucideIcon> = {
  video: PlayCircle,
  article: FileText,
  case: Stethoscope,
  'grand-rounds': Radio,
  protocol: ClipboardList,
}

export const topicLabel = (key: string) => TOPICS.find((t) => t.key === key)?.label ?? key

export function itemHref(item: LibraryItem) {
  return `#/library/item/${item.id}`
}

export function ItemMeta({ item, className }: { item: LibraryItem; className?: string }) {
  return (
    <p className={cn('text-xs text-[#5a6a84] tabular-nums', className)}>
      {TYPE_LABEL[item.type]} · {item.minutes} min{item.cme ? ` · ${item.cme} CME` : ''}
    </p>
  )
}

/** Compact list row used for search results, topic lists and "new this week". */
export function ItemRow({ item }: { item: LibraryItem }) {
  const Icon = TYPE_ICON[item.type]
  return (
    <a href={itemHref(item)} className="flex items-start gap-4 p-4 hover:bg-[#f5f6f8] transition-colors group">
      <span className="w-10 h-10 rounded-full bg-[#e8edf5] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#0d2147]" strokeWidth={1.8} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#8a6d22]">{topicLabel(item.topic)}</p>
        <h3 className="text-sm font-semibold leading-snug mt-0.5 group-hover:underline underline-offset-4 decoration-[#c9a84c]">{item.title}</h3>
        <p className="text-sm text-[#5a6a84] mt-1 line-clamp-2">{item.summary}</p>
        <div className="flex items-start gap-2 mt-2">
          <FacultyAvatar id={item.faculty} size="sm" />
          <p className="text-xs text-[#5a6a84] tabular-nums leading-relaxed pt-1">
            {FACULTY[item.faculty].name} · {TYPE_LABEL[item.type]} · {item.minutes} min
            {item.cme ? ` · ${item.cme} CME` : ''}
          </p>
        </div>
      </div>
    </a>
  )
}

export function ItemList({ items }: { items: LibraryItem[] }) {
  return (
    <Card className="divide-y divide-[#d1d9e6] overflow-hidden">
      {items.map((i) => (
        <ItemRow key={i.id} item={i} />
      ))}
    </Card>
  )
}

/** Case card: the patient one-liner leads, because that is how clinicians scan cases. */
export function CaseCard({ item }: { item: LibraryItem }) {
  return (
    <a href={itemHref(item)} className="group block h-full">
      <Card className="p-5 h-full flex flex-col group-hover:border-[#0d2147]/40 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-[#8a6d22]">{topicLabel(item.topic)}</span>
          {item.level && <span className="text-xs text-[#5a6a84]">{item.level}</span>}
        </div>
        <p className="font-serif text-lg leading-snug mt-3">{item.patient}</p>
        <h3 className="text-sm font-semibold mt-3">{item.title}</h3>
        <p className="text-sm text-[#5a6a84] mt-1">{item.summary}</p>
        <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-[#5a6a84] tabular-nums">
          <span>{item.minutes} min</span>
          {item.cme && <span>{item.cme} CME</span>}
          {item.discussion !== undefined && (
            <span className="inline-flex items-center gap-1 ml-auto">
              <MessageSquare className="w-3.5 h-3.5" /> {item.discussion}
            </span>
          )}
        </div>
      </Card>
    </a>
  )
}
