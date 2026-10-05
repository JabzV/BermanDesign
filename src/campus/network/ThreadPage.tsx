import { useState, type FormEvent } from 'react'
import { ThumbsUp, Bell, BellRing, Link2, Check, MessagesSquare } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, FacultyAvatar, buttonPrimary, buttonSecondary } from '../ui'
import { FACULTY } from '../data/learn'
import { findThread, findMember, THREADS, REPLIES, THREAD_KIND_LABEL, ME, type Thread } from '../data/network'
import { topicLabel } from '../library/parts'
import { Byline, MemberAvatar, StandingTag, VerifiedMark, ThreadList, memberHref } from './parts'
import { cn } from '../../lib/utils'

const BACK: Record<Thread['kind'], { label: string; href: string }> = {
  community: { label: 'Community', href: '#/network' },
  clinical: { label: 'Clinical Discussions', href: '#/network/clinical' },
  'journal-club': { label: 'Journal Club', href: '#/network/journal-club' },
  'faculty-question': { label: 'Ask the Faculty', href: '#/network/ask-faculty' },
}

function HelpfulButton({ count }: { count: number }) {
  const [on, setOn] = useState(false)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className={cn(
        'inline-flex items-center gap-1.5 min-h-9 px-3 rounded-full text-sm transition-colors tabular-nums',
        on ? 'bg-[#0d2147] text-white' : 'bg-[#f5f6f8] text-[#0d2147] hover:bg-[#e8edf5]',
      )}
    >
      <ThumbsUp className="w-4 h-4" fill={on ? 'currentColor' : 'none'} /> Helpful · {count + (on ? 1 : 0)}
    </button>
  )
}

export default function ThreadPage({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const thread = findThread(id)
  const [following, setFollowing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [replies, setReplies] = useState(REPLIES)
  const [draft, setDraft] = useState('')

  if (!thread)
    return (
      <CampusLayout active="network" title="Discussion" back={{ label: 'Network', href: '#/network' }} onSignOut={onSignOut}>
        <EmptyState
          icon={MessagesSquare}
          title="Discussion not found"
          body="It may have been removed by moderators or by its author."
          action={
            <a href="#/network" className={buttonPrimary}>
              Back to Network
            </a>
          }
        />
      </CampusLayout>
    )

  const author = thread.anonymous ? undefined : findMember(thread.author)
  const related = THREADS.filter((t) => t.id !== thread.id && t.kind === thread.kind).slice(0, 3)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    setReplies((r) => [...r, { author: ME, date: 'Just now', text: draft.trim(), helpful: 0 }])
    setDraft('')
  }

  return (
    <CampusLayout active="network" title={THREAD_KIND_LABEL[thread.kind]} back={BACK[thread.kind]} onSignOut={onSignOut}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
        <div className="min-w-0">
          <Card className="p-5 sm:p-7">
            <p className="text-sm font-semibold text-[#8a6d22]">
              {THREAD_KIND_LABEL[thread.kind]} · {topicLabel(thread.topic)}
              {thread.session && <span className="font-normal text-[#5a6a84]"> · {thread.session}</span>}
            </p>
            <h2 className="font-serif text-2xl sm:text-[28px] leading-snug mt-2 text-balance">{thread.title}</h2>
            <Byline memberId={thread.author} anonymous={thread.anonymous} date={thread.date} className="mt-4" />
            <p className="text-[16px] leading-[1.75] mt-5 max-w-prose">{thread.body}</p>
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <HelpfulButton count={thread.helpful} />
              <button
                onClick={() => setFollowing((f) => !f)}
                aria-pressed={following}
                className={cn('inline-flex items-center gap-1.5 min-h-9 px-3 rounded-full text-sm transition-colors', following ? 'bg-[#fbf7ec] text-[#8a6d22]' : 'bg-[#f5f6f8] hover:bg-[#e8edf5]')}
              >
                {following ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />} {following ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href).catch(() => {})
                  setCopied(true)
                }}
                className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-full text-sm bg-[#f5f6f8] hover:bg-[#e8edf5] transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />} {copied ? 'Link copied' : 'Copy link'}
              </button>
            </div>
          </Card>

          {thread.answer && (
            <Card className="mt-4 p-5 sm:p-6 border-[#ecdcae] bg-[#fbf7ec]">
              <div className="flex items-center gap-3">
                <FacultyAvatar id={thread.answeredBy!} />
                <div>
                  <p className="text-sm font-semibold">{FACULTY[thread.answeredBy!].name}</p>
                  <p className="text-xs text-[#5a6a84]">Faculty answer</p>
                </div>
              </div>
              <p className="text-[16px] leading-[1.75] mt-4 max-w-prose">{thread.answer}</p>
            </Card>
          )}

          <section className="mt-8">
            <h2 className="font-serif text-xl">
              Replies <span className="text-[#5a6a84] text-base tabular-nums">({thread.replies - REPLIES.length + replies.length})</span>
            </h2>
            <p className="text-sm text-[#5a6a84] mt-1">Showing the most recent.</p>
            <ol className="mt-4 flex flex-col gap-3">
              {replies.map((r, i) => {
                const m = findMember(r.author)!
                const isFaculty = m.standing === 'Faculty'
                return (
                  <li key={i}>
                    <Card className={cn('p-4 sm:p-5', isFaculty && 'border-[#ecdcae]')}>
                      <div className="flex items-center gap-3">
                        <MemberAvatar member={m} />
                        <div className="leading-tight min-w-0">
                          <p className="text-sm font-semibold flex items-center gap-1.5">
                            <a href={memberHref(m.id)} className="hover:underline underline-offset-4 truncate">
                              {m.name}
                            </a>
                            <VerifiedMark member={m} />
                            <StandingTag member={m} />
                          </p>
                          <p className="text-xs text-[#5a6a84]">
                            {m.specialty} · {r.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-[15px] leading-relaxed mt-3">{r.text}</p>
                      <div className="mt-3">
                        <HelpfulButton count={r.helpful} />
                      </div>
                    </Card>
                  </li>
                )
              })}
            </ol>
            <form onSubmit={submit} className="mt-4">
              <label htmlFor="thread-reply" className="text-sm font-semibold">
                Your reply
              </label>
              <textarea
                id="thread-reply"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                placeholder="Share your experience. Do not include patient identifiers."
                className="mt-2 w-full rounded-xl border border-[#d1d9e6] bg-white p-4 text-[15px] leading-relaxed outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa] resize-y"
              />
              <div className="flex justify-end mt-2">
                <button type="submit" disabled={!draft.trim()} className={buttonPrimary}>
                  Post reply
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          {author && (
            <Card className="p-5">
              <p className="text-xs text-[#5a6a84]">Started by</p>
              <div className="flex items-center gap-3 mt-2">
                <MemberAvatar member={author} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    {author.name} <VerifiedMark member={author} />
                  </p>
                  <p className="text-xs text-[#5a6a84]">{author.specialty}</p>
                </div>
              </div>
              <p className="text-sm text-[#5a6a84] mt-3 line-clamp-3">{author.bio}</p>
              <a href={memberHref(author.id)} className={cn(buttonSecondary, 'mt-4 w-full')}>
                View profile
              </a>
            </Card>
          )}
          {related.length > 0 && (
            <div>
              <h2 className="font-serif text-lg mb-3">More in {BACK[thread.kind].label}</h2>
              <ThreadList threads={related} />
            </div>
          )}
        </aside>
      </div>
    </CampusLayout>
  )
}
