import { useState, type FormEvent } from 'react'
import { BadgeCheck, MessageSquare, ThumbsUp, Pin, AlertCircle } from 'lucide-react'
import { Card, FacultyAvatar, buttonPrimary, buttonSecondary } from '../ui'
import { findMember, THREAD_KIND_LABEL, type Member, type Thread } from '../data/network'
import { FACULTY } from '../data/learn'
import { TOPICS } from '../data/library'
import { topicLabel } from '../library/parts'
import { cn } from '../../lib/utils'

export const memberHref = (id: string) => `#/network/member/${id}`
export const threadHref = (t: Thread) => `#/network/thread/${t.id}`

export function MemberAvatar({ member, size = 'md' }: { member?: Member; size?: 'sm' | 'md' | 'lg' }) {
  if (member?.faculty) {
    if (size !== 'lg') return <FacultyAvatar id={member.faculty} size={size} />
    const photo = FACULTY[member.faculty].photo
    if (photo) return <img src={photo} alt="" className="w-20 h-20 rounded-full object-cover object-top bg-[#e8edf5] shrink-0" />
  }
  const dim = size === 'sm' ? 'w-7 h-7 text-[10px]' : size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-10 h-10 text-xs'
  return (
    <span className={cn(dim, 'rounded-full bg-[#0d2147] text-[#e2c575] font-serif flex items-center justify-center shrink-0')}>
      {member ? member.initials : '?'}
    </span>
  )
}

export function StandingTag({ member }: { member: Member }) {
  if (member.standing === 'Faculty')
    return <span className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d22] bg-[#fbf7ec] rounded px-1.5 py-0.5">Faculty</span>
  return null
}

export function VerifiedMark({ member }: { member: Member }) {
  if (!member.verified) return null
  return <BadgeCheck className="w-4 h-4 text-[#1a3260] shrink-0" aria-label="Verified clinician" />
}

/** Name + verification + specialty, linking to the member profile. */
export function Byline({ memberId, anonymous, date, className }: { memberId: string; anonymous?: boolean; date?: string; className?: string }) {
  const m = findMember(memberId)
  if (!m || anonymous)
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <MemberAvatar size="sm" />
        <p className="text-xs text-[#5a6a84]">
          Anonymous member{date && <> · {date}</>}
        </p>
      </div>
    )
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <MemberAvatar member={m} size="sm" />
      <p className="text-xs text-[#5a6a84] leading-relaxed pt-1">
        <a href={memberHref(m.id)} className="text-[#0d2147] font-medium hover:underline underline-offset-4">
          {m.name}
        </a>
        {m.verified && <BadgeCheck className="inline w-3.5 h-3.5 ml-1 -mt-0.5 text-[#1a3260]" aria-label="Verified clinician" />} · {m.specialty}
        {date && <> · {date}</>}
      </p>
    </div>
  )
}

export function ThreadRow({ thread, showKind = false }: { thread: Thread; showKind?: boolean }) {
  return (
    <div className="p-4 sm:p-5 hover:bg-[#f5f6f8] transition-colors">
      <p className="text-xs font-semibold text-[#8a6d22] flex items-center gap-1.5">
        {thread.pinned && <Pin className="w-3.5 h-3.5" />}
        {showKind ? `${THREAD_KIND_LABEL[thread.kind]} · ` : ''}
        {topicLabel(thread.topic)}
        {thread.cohort && <span className="text-[#5a6a84] font-normal">· Cohort</span>}
      </p>
      <a href={threadHref(thread)} className="group block mt-0.5">
        <h3 className="text-sm sm:text-[15px] font-semibold leading-snug group-hover:underline underline-offset-4 decoration-[#c9a84c]">{thread.title}</h3>
        <p className="text-sm text-[#5a6a84] mt-1 line-clamp-2">{thread.body}</p>
      </a>
      <div className="flex items-end justify-between gap-3 mt-3">
        <Byline memberId={thread.author} anonymous={thread.anonymous} date={thread.date} />
        <span className="flex items-center gap-3 text-xs text-[#5a6a84] tabular-nums shrink-0 pb-1">
          <span className="inline-flex items-center gap-1" aria-label={`${thread.helpful} found helpful`}>
            <ThumbsUp className="w-3.5 h-3.5" /> {thread.helpful}
          </span>
          <span className="inline-flex items-center gap-1" aria-label={`${thread.replies} replies`}>
            <MessageSquare className="w-3.5 h-3.5" /> {thread.replies}
          </span>
        </span>
      </div>
    </div>
  )
}

export function ThreadList({ threads, showKind }: { threads: Thread[]; showKind?: boolean }) {
  return (
    <Card className="divide-y divide-[#d1d9e6] overflow-hidden">
      {threads.map((t) => (
        <ThreadRow key={t.id} thread={t} showKind={showKind} />
      ))}
    </Card>
  )
}

export function MemberCard({ member }: { member: Member }) {
  return (
    <a href={memberHref(member.id)} className="group block h-full">
      <Card className="h-full p-4 flex items-start gap-3 group-hover:border-[#0d2147]/40 transition-colors">
        <MemberAvatar member={member} />
        <div className="min-w-0">
          <p className="text-sm font-semibold flex items-center gap-1.5">
            <span className="truncate">{member.name}</span>
            <VerifiedMark member={member} />
          </p>
          <p className="text-xs text-[#5a6a84] mt-0.5">{member.specialty}</p>
          <p className="text-xs text-[#5a6a84] truncate">{member.location}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <StandingTag member={member} />
            {member.standing !== 'Faculty' && <span className="text-[11px] text-[#5a6a84] bg-[#f5f6f8] rounded px-1.5 py-0.5">{member.standing}</span>}
          </div>
        </div>
      </Card>
    </a>
  )
}

const inputCls = (error?: boolean) =>
  cn(
    'w-full rounded-xl border bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-[#8392aa]',
    error ? 'border-[#c25b5b]' : 'border-[#d1d9e6] focus:border-[#c9a84c]',
  )

/** Collapsed "start a discussion" prompt that expands into a title/topic/body form. */
export function Composer({
  prompt,
  submitLabel = 'Post',
  allowAnonymous = false,
  onPost,
}: {
  prompt: string
  submitLabel?: string
  allowAnonymous?: boolean
  onPost: (p: { title: string; body: string; topic: Thread['topic']; anonymous: boolean }) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [topic, setTopic] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [tried, setTried] = useState(false)
  const errors = { title: title.trim().length < 8, topic: !topic }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (errors.title || errors.topic) return
    onPost({ title: title.trim(), body: body.trim(), topic: topic as Thread['topic'], anonymous })
    setTitle('')
    setBody('')
    setTopic('')
    setAnonymous(false)
    setTried(false)
    setOpen(false)
  }

  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="w-full flex items-center gap-3 rounded-xl border border-[#d1d9e6] bg-white p-3 sm:p-4 text-left hover:border-[#0d2147]/40 transition-colors">
        <MemberAvatar member={findMember('reyes')} />
        <span className="flex-1 text-[15px] text-[#5a6a84]">{prompt}</span>
      </button>
    )

  return (
    <Card className="p-4 sm:p-5">
      <form onSubmit={submit} noValidate className="flex flex-col gap-3">
        <div>
          <label htmlFor="composer-title" className="sr-only">
            Title
          </label>
          <input
            id="composer-title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            aria-invalid={tried && errors.title}
            className={cn(inputCls(tried && errors.title), 'min-h-12 font-semibold')}
          />
          {tried && errors.title && (
            <p className="mt-1 text-sm text-[#b04848] inline-flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Add a title of at least 8 characters.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="composer-body" className="sr-only">
            Details
          </label>
          <textarea
            id="composer-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Add context. Do not include patient identifiers."
            className={cn(inputCls(), 'py-3 leading-relaxed resize-y')}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="sm:w-56">
            <label htmlFor="composer-topic" className="sr-only">
              Topic
            </label>
            <select
              id="composer-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              aria-invalid={tried && errors.topic}
              className={cn(inputCls(tried && errors.topic), 'min-h-11', !topic && 'text-[#8392aa]')}
            >
              <option value="">Choose a topic</option>
              {TOPICS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          {allowAnonymous && (
            <label className="flex items-center gap-2 text-sm cursor-pointer min-h-11">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-4 h-4" />
              Ask anonymously
            </label>
          )}
          <div className="flex gap-2 sm:ml-auto">
            <button type="button" onClick={() => setOpen(false)} className={cn(buttonSecondary, 'flex-1 sm:flex-none')}>
              Cancel
            </button>
            <button type="submit" className={cn(buttonPrimary, 'flex-1 sm:flex-none')}>
              {submitLabel}
            </button>
          </div>
        </div>
        {tried && errors.topic && (
          <p className="text-sm text-[#b04848] inline-flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Choose a topic.
          </p>
        )}
      </form>
    </Card>
  )
}
