import { useState } from 'react'
import { Download, Link2, Check, Printer, FileX, ShieldCheck, Share2 } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, EmptyState, buttonPrimary, buttonSecondary } from '../ui'
import { findCertificate } from '../data/credentials'
import { CertificateDocument } from './CertificateDocument'
import { cn } from '../../lib/utils'

export default function CertificateView({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const cert = findCertificate(id)
  const [copied, setCopied] = useState(false)
  const back = { label: 'Certificates', href: '#/credentials' }

  if (!cert)
    return (
      <CampusLayout active="credentials" title="Certificate" back={back} onSignOut={onSignOut}>
        <EmptyState
          icon={FileX}
          title="Certificate not found"
          body="It may have been reissued under a new ID."
          action={
            <a href="#/credentials" className={buttonPrimary}>
              All certificates
            </a>
          }
        />
      </CampusLayout>
    )

  const verifyUrl = `https://bermaninstitute.com/verify/${cert.credentialId}`

  return (
    <CampusLayout active="credentials" title={cert.title} back={back} onSignOut={onSignOut}>
      <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-8">
        <div className="rounded-2xl bg-[#e8edf5] p-3 sm:p-8 lg:p-10">
          <CertificateDocument cert={cert} className="max-w-4xl mx-auto" />
        </div>

        <aside className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex flex-col gap-2">
              <button className={cn(buttonPrimary, 'w-full')}>
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(verifyUrl).catch(() => {})
                  setCopied(true)
                }}
                className={cn(buttonSecondary, 'w-full')}
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copied ? 'Verification link copied' : 'Copy verification link'}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className={cn(buttonSecondary, 'px-3')}>
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button onClick={() => window.print()} className={cn(buttonSecondary, 'px-3')}>
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-lg">Details</h2>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-[#5a6a84]">Type</dt>
              <dd>{cert.kind}</dd>
              <dt className="text-[#5a6a84]">Issued</dt>
              <dd>{cert.issued}</dd>
              <dt className="text-[#5a6a84]">Credits</dt>
              <dd className="tabular-nums">{cert.cme} CME / CE</dd>
              <dt className="text-[#5a6a84]">Credential ID</dt>
              <dd className="tabular-nums break-all">{cert.credentialId}</dd>
            </dl>
            <p className="mt-4 pt-4 border-t border-[#e8edf5] text-sm flex gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="text-[#5a6a84]">
                {cert.public ? 'Anyone with the ID can verify this certificate.' : 'Verification is turned off.'}{' '}
                <a href="#/credentials/verification" className="font-semibold text-[#0d2147] underline underline-offset-4 decoration-[#c9a84c]">
                  Manage
                </a>
              </span>
            </p>
          </Card>
        </aside>
      </div>
    </CampusLayout>
  )
}
