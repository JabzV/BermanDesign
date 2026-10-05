import { useState } from 'react'
import { BadgeCheck, MapPin, Building2, UserPlus, UserCheck, Award, Pencil, Eye, UserX, CalendarDays } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, buttonPrimary, buttonSecondary } from '../ui'
import { findMember, THREADS, ME, type Member } from '../data/network'
import { topicLabel } from '../library/parts'
import { ThreadList, MemberAvatar } from './parts'
import { cn } from '../../lib/utils'

function credentialsFor(m: Member) {
  if (m.standing === 'Faculty') return [{ title: 'Faculty, Berman Institute', detail: `Since ${m.joined}` }]
  if (m.standing === 'Graduate')
    return [
      { title: 'Advanced Certificate in Longevity & Metabolic Medicine', detail: `Awarded ${Number(m.joined) + 1}` },
      { title: 'Professional Member', detail: 'Berman Institute Network' },
    ]
  if (m.standing === 'Fall 2026 Cohort') return [{ title: 'Advanced Certificate in Longevity & Metabolic Medicine', detail: 'In progress · Fall 2026 cohort' }]
  return [{ title: 'Professional Member', detail: 'Berman Institute Network' }]
}

export default function MemberProfile({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const member = findMember(id)
  const [following, setFollowing] = useState(false)
  const back = { label: 'Member Directory', href: '#/network/directory' }

  if (!member)
    return (
      <CampusLayout active="network" title="Member" back={back} onSignOut={onSignOut}>
        <EmptyState
          icon={UserX}
          title="Member not found"
          body="This profile may be private or no longer active."
          action={
            <a href="#/network/directory" className={buttonPrimary}>
              Browse the directory
            </a>
          }
        />
      </CampusLayout>
    )

  const isMe = member.id === ME
  const activity = THREADS.filter((t) => t.author === member.id && !t.anonymous)

  return (
    <CampusLayout active="network" title="Member profile" back={back} onSignOut={onSignOut}>
      {isMe && (
        <div className="mb-4 rounded-xl bg-[#e8edf5] p-4 flex items-start sm:items-center gap-3 text-sm">
          <Eye className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
          <p className="flex-1">This is how other verified members see your profile.</p>
        </div>
      )}
      <Card className="p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
          <MemberAvatar member={member} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-2xl sm:text-3xl leading-snug">{member.name}</h2>
            <p className="text-[#5a6a84] mt-1">{member.specialty}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {member.verified ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3260] bg-[#e8edf5] rounded-full px-2.5 py-1">
                  <BadgeCheck className="w-3.5 h-3.5" /> Verified clinician
                </span>
              ) : (
                <span className="text-xs text-[#5a6a84] bg-[#f5f6f8] rounded-full px-2.5 py-1">Verification pending</span>
              )}
              <span className={cn('text-xs font-semibold rounded-full px-2.5 py-1', member.standing === 'Faculty' ? 'bg-[#fbf7ec] text-[#8a6d22]' : 'bg-[#f5f6f8] text-[#0d2147]')}>
                {member.standing}
              </span>
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#5a6a84]">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> {member.organization}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {member.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" /> Member since {member.joined}
              </span>
            </p>
          </div>
          <div className="sm:shrink-0">
            {isMe ? (
              <a href="#/profile" className={cn(buttonSecondary, 'w-full sm:w-auto')}>
                <Pencil className="w-4 h-4" /> Edit profile
              </a>
            ) : (
              <button
                onClick={() => setFollowing((f) => !f)}
                aria-pressed={following}
                className={cn(following ? buttonSecondary : buttonPrimary, 'w-full sm:w-auto')}
              >
                {following ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {following ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 mt-8">
        <div className="min-w-0 flex flex-col gap-8">
          <section>
            <h2 className="font-serif text-xl">About</h2>
            <p className="text-[16px] leading-[1.75] mt-3 max-w-prose">{member.bio}</p>
          </section>
          <section>
            <h2 className="font-serif text-xl mb-4">Recent discussions</h2>
            {activity.length > 0 ? (
              <ThreadList threads={activity} showKind />
            ) : (
              <p className="text-sm text-[#5a6a84]">No public discussions yet.</p>
            )}
          </section>
        </div>
        <aside className="flex flex-col gap-4">
          <Card className="p-5">
            <h2 className="font-serif text-lg">Credentials</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {credentialsFor(member).map((c) => (
                <li key={c.title} className="flex gap-3">
                  <Award className="w-5 h-5 text-[#8a6d22] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold leading-snug">{c.title}</p>
                    <p className="text-xs text-[#5a6a84] mt-0.5">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-lg">Areas of interest</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.interests.map((t) => (
                <a key={t} href={`#/library/topic/${t}`} className="text-sm rounded-full border border-[#d1d9e6] px-3 min-h-9 inline-flex items-center hover:border-[#0d2147] transition-colors">
                  {topicLabel(t)}
                </a>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </CampusLayout>
  )
}
