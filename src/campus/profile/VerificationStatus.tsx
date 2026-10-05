import { useRef, useState } from 'react'
import { ShieldCheck, Check, Clock, AlertTriangle, Upload, FileText, Info } from 'lucide-react'
import { Card, buttonSecondary } from '../ui'
import { ProfileLayout, SectionTitle, useToast } from './parts'
import { cn } from '../../lib/utils'

type CheckState = 'verified' | 'review' | 'action'

const CHECKS: { label: string; detail: string; state: CheckState; meta?: string }[] = [
  { label: 'Identity', detail: 'Government ID matched to your account', state: 'verified', meta: 'Verified Aug 1, 2026' },
  { label: 'Medical licence', detail: 'California · A-128842 (sample) · Active, no restrictions', state: 'verified', meta: 'Expires Mar 31, 2028' },
  { label: 'NPI', detail: 'National Provider Identifier matched to licence', state: 'verified', meta: 'Verified Aug 1, 2026' },
  { label: 'Board certification', detail: 'Internal Medicine · certificate uploaded Sep 30, 2026', state: 'review', meta: 'Usually 3–5 business days' },
]

const STATE_STYLE: Record<CheckState, { icon: typeof Check; label: string; cls: string }> = {
  verified: { icon: Check, label: 'Verified', cls: 'bg-emerald-50 text-emerald-700' },
  review: { icon: Clock, label: 'Under review', cls: 'bg-[#fbf7ec] text-[#8a6d22]' },
  action: { icon: AlertTriangle, label: 'Action needed', cls: 'bg-[#fcf1f1] text-[#b04848]' },
}

const UNLOCKS = ['Professional network and Member Directory', 'Clinical discussions and case submissions', 'Advanced Certificate assessments and credential', 'CME / CE certificates in your name']

export default function VerificationStatus({ onSignOut }: { onSignOut: () => void }) {
  const [documents, setDocuments] = useState([
    { name: 'California medical licence.pdf', uploaded: 'Jul 28, 2026', status: 'Accepted' },
    { name: 'Board certificate – ABIM.pdf', uploaded: 'Sep 30, 2026', status: 'In review' },
  ])
  const fileRef = useRef<HTMLInputElement>(null)
  const { show, toast } = useToast()

  return (
    <ProfileLayout section="verification" onSignOut={onSignOut}>
      <SectionTitle title="Verification Status" description="Berman Institute verifies every member's identity and licence before granting clinical access." />

      <div className="flex flex-col gap-5">
        <Card className="p-5 sm:p-6 flex items-start gap-4">
          <span className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </span>
          <div>
            <h3 className="font-serif text-xl">Verified clinician</h3>
            <p className="text-sm text-[#5a6a84] mt-1">
              Full access since Aug 1, 2026. One additional document is under review; your access does not change while it is checked.
            </p>
          </div>
        </Card>

        <Card className="divide-y divide-[#e8edf5]">
          {CHECKS.map((c) => {
            const s = STATE_STYLE[c.state]
            const Icon = s.icon
            return (
              <div key={c.label} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="text-sm text-[#5a6a84] mt-0.5">{c.detail}</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 shrink-0">
                  <span className={cn('inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1', s.cls)}>
                    <Icon className="w-3.5 h-3.5" /> {s.label}
                  </span>
                  {c.meta && <span className="text-xs text-[#5a6a84]">{c.meta}</span>}
                </div>
              </div>
            )
          })}
        </Card>

        <Card className="p-5 sm:p-6 flex gap-3 border-[#ecdcae] bg-[#fbf7ec]">
          <Info className="w-5 h-5 text-[#8a6d22] shrink-0" />
          <p className="text-sm">
            <span className="font-semibold">Licence renewal reminder.</span> We will ask you to upload your renewed licence 60 days before it expires on Mar 31, 2028.
          </p>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg">Documents</h3>
              <p className="text-sm text-[#5a6a84] mt-0.5">PDF, JPG or PNG up to 10 MB. Stored securely and seen only by the verification team.</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,image/png,image/jpeg"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setDocuments((d) => [{ name: file.name, uploaded: 'Just now', status: 'In review' }, ...d])
                show('Document uploaded for review')
                e.target.value = ''
              }}
            />
            <button type="button" onClick={() => fileRef.current?.click()} className={cn(buttonSecondary, 'shrink-0')}>
              <Upload className="w-4 h-4" /> Upload document
            </button>
          </div>
          <ul className="mt-4 divide-y divide-[#e8edf5] border-t border-[#e8edf5]">
            {documents.map((d, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <FileText className="w-5 h-5 text-[#5a6a84] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{d.name}</p>
                  <p className="text-xs text-[#5a6a84]">Uploaded {d.uploaded}</p>
                </div>
                <span className={cn('text-xs font-semibold rounded-full px-2.5 py-1 shrink-0', d.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-[#fbf7ec] text-[#8a6d22]')}>
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="font-serif text-lg">What verification unlocks</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {UNLOCKS.map((u) => (
              <li key={u} className="flex gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" /> {u}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      {toast}
    </ProfileLayout>
  )
}
