import { useState, type FormEvent } from 'react'
import { Download, Eye, ArrowRight, Check, Copy, Link2, ShieldCheck, SearchX, GraduationCap, Info, FileSpreadsheet, Lock } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, TabChips, ProgressBar, buttonPrimary, buttonSecondary } from '../ui'
import { PROGRAM } from '../data/learn'
import { CERTIFICATES, ACADEMIC_RECORD, CME_CYCLE, CME_BY_TYPE, cmeEntries, cmeTotal, LEARNER, type RecordStatus } from '../data/credentials'
import { CertificateDocument } from './CertificateDocument'
import { cn } from '../../lib/utils'

export type CredentialsTab = 'certificates' | 'advanced' | 'record' | 'cme' | 'verification'

const TABS: { key: CredentialsTab; label: string }[] = [
  { key: 'certificates', label: 'Certificates' },
  { key: 'advanced', label: 'Advanced Credentials' },
  { key: 'record', label: 'Academic Record' },
  { key: 'cme', label: 'CME / CE Record' },
  { key: 'verification', label: 'Verification' },
]

const certHref = (id: string) => `#/credentials/certificate/${id}`

function CertificatesTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 md:grid-cols-2">
        {CERTIFICATES.map((c) => (
          <Card key={c.id} className="overflow-hidden flex flex-col">
            <a href={certHref(c.id)} className="block bg-[#eef1f6] p-5 sm:p-6 group" aria-label={`View certificate: ${c.title}`}>
              <div className="group-hover:-translate-y-0.5 transition-transform">
                <CertificateDocument cert={c} />
              </div>
            </a>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-xs font-semibold text-[#8a6d22]">{c.kind}</p>
              <h3 className="font-serif text-lg leading-snug mt-1">{c.title}</h3>
              <p className="text-sm text-[#5a6a84] mt-1 tabular-nums">
                Issued {c.issued} · {c.cme} CME
                <span className="block whitespace-nowrap">ID {c.credentialId}</span>
              </p>
              <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                <a href={certHref(c.id)} className={cn(buttonSecondary, 'px-3')}>
                  <Eye className="w-4 h-4" /> View
                </a>
                <button className={cn(buttonPrimary, 'px-3')}>
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <a href="#/credentials/advanced" className="group flex items-center gap-4 rounded-xl border border-dashed border-[#c5cfdf] p-5 hover:border-[#0d2147]/40 transition-colors">
        <GraduationCap className="w-6 h-6 text-[#8a6d22] shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Working toward: {PROGRAM.title}</p>
          <p className="text-sm text-[#5a6a84] tabular-nums">{PROGRAM.progress}% complete · expected {PROGRAM.targetCompletion}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-[#5a6a84] group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  )
}

const PATHWAY = [
  { label: 'Advanced Certificate', detail: 'Longevity & Metabolic Medicine', state: 'current' },
  { label: 'Professional Membership', detail: 'Unlocks when the Advanced Certificate is awarded', state: 'next' },
  { label: 'Professional Network', detail: 'Graduate community, Journal Club and research discussions', state: 'next' },
  { label: 'Faculty & Contributor pathway', detail: 'Teach, review clinical insights and present at Grand Rounds', state: 'next' },
  { label: 'Research collaboration', detail: 'Join institute studies as a contributing site', state: 'next' },
] as const

function AdvancedTab() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
      <div className="min-w-0 flex flex-col gap-6">
        <section className="relative bg-[#0d2147] text-white rounded-2xl p-5 sm:p-8 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-28 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-1 bg-white/10">In progress · {PROGRAM.cohort}</span>
            <h2 className="font-serif text-2xl sm:text-3xl leading-snug mt-4 max-w-xl text-balance">{PROGRAM.title}</h2>
            <p className="text-white/75 mt-2 max-w-xl">
              The institute's advanced credential. Awarded after all six modules, Grand Rounds attendance and a passed final assessment.
            </p>
            <div className="mt-6 max-w-xl">
              <div className="flex justify-between text-sm mb-2 tabular-nums">
                <span className="text-white/75">Progress</span>
                <span className="font-semibold">{PROGRAM.progress}%</span>
              </div>
              <ProgressBar value={PROGRAM.progress} tone="gold" />
            </div>
            <a href="#/learn/program/advanced-certificate" className="mt-6 inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-white text-[#0d2147] text-sm font-bold hover:bg-[#e2c575] transition-colors">
              Continue program <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <Card className="p-5 sm:p-6">
          <h2 className="font-serif text-lg">Requirements</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {PROGRAM.requirements.map((r) => (
              <li key={r.label} className="flex gap-3">
                <span className={cn('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', r.done ? 'bg-[#0d2147] text-[#c9a84c]' : 'border-2 border-[#d1d9e6]')}>
                  {r.done && <Check className="w-3 h-3" strokeWidth={3} />}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.label}</p>
                  <p className="text-xs text-[#5a6a84] mt-0.5">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <aside>
        <Card className="p-5">
          <h2 className="font-serif text-lg">Your professional pathway</h2>
          <p className="text-sm text-[#5a6a84] mt-1">Each credential opens the next stage of the institute.</p>
          <ol className="mt-5 relative">
            {PATHWAY.map((p, i) => (
              <li key={p.label} className="relative flex gap-3 pb-5 last:pb-0">
                {i < PATHWAY.length - 1 && <span aria-hidden className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-[#e8edf5]" />}
                <span
                  className={cn(
                    'relative w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center',
                    p.state === 'current' ? 'border-2 border-[#c9a84c] bg-white' : 'bg-[#e8edf5] text-[#5a6a84]',
                  )}
                >
                  {p.state === 'current' ? <span className="w-2 h-2 rounded-full bg-[#c9a84c]" /> : <Lock className="w-2.5 h-2.5" />}
                </span>
                <div>
                  <p className={cn('text-sm font-semibold', p.state !== 'current' && 'text-[#5a6a84]')}>{p.label}</p>
                  <p className="text-xs text-[#5a6a84] mt-0.5">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </aside>
    </div>
  )
}

const STATUS_STYLE: Record<RecordStatus, string> = {
  Completed: 'bg-emerald-50 text-emerald-700',
  Attended: 'bg-[#e8edf5] text-[#0d2147]',
  'In progress': 'bg-[#fbf7ec] text-[#8a6d22]',
  'Not started': 'bg-[#f5f6f8] text-[#5a6a84]',
}

function StatusPill({ status }: { status: RecordStatus }) {
  return <span className={cn('inline-block text-[11px] font-semibold rounded-full px-2 py-0.5 whitespace-nowrap', STATUS_STYLE[status])}>{status}</span>
}

function RecordTab() {
  const periods = [...new Set(ACADEMIC_RECORD.map((r) => r.period))]
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <dl className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-[#5a6a84]">Learner</dt>
            <dd className="font-semibold">{LEARNER.name}</dd>
          </div>
          <div>
            <dt className="text-[#5a6a84]">Specialty</dt>
            <dd className="font-semibold">{LEARNER.specialty}</dd>
          </div>
          <div>
            <dt className="text-[#5a6a84]">Licence</dt>
            <dd className="font-semibold">{LEARNER.licence}</dd>
          </div>
        </dl>
        <button className={cn(buttonPrimary, 'shrink-0')}>
          <Download className="w-4 h-4" /> Download transcript
        </button>
      </Card>

      {periods.map((period) => {
        const rows = ACADEMIC_RECORD.filter((r) => r.period === period)
        return (
          <section key={period}>
            <h2 className="font-serif text-xl mb-3">{period}</h2>
            {/* Table on wider screens */}
            <Card className="hidden md:block overflow-hidden">
              <table className="w-full text-sm table-fixed">
                <thead className="bg-[#f5f6f8] text-left text-xs text-[#5a6a84]">
                  <tr>
                    <th scope="col" className="font-semibold px-5 py-3">Activity</th>
                    <th scope="col" className="font-semibold px-3 py-3 w-32">Status</th>
                    <th scope="col" className="font-semibold px-3 py-3 w-48">Result</th>
                    <th scope="col" className="font-semibold px-3 py-3 w-36">Completed</th>
                    <th scope="col" className="font-semibold px-5 py-3 text-right w-20">CME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8edf5]">
                  {rows.map((r) => (
                    <tr key={r.title}>
                      <td className="px-5 py-3.5">
                        <p className="font-semibold leading-snug">{r.title}</p>
                        <p className="text-xs text-[#5a6a84] mt-0.5">{r.type}</p>
                      </td>
                      <td className="px-3 py-3.5">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-3 py-3.5 text-[#5a6a84]">{r.result ?? '—'}</td>
                      <td className="px-3 py-3.5 text-[#5a6a84] whitespace-nowrap tabular-nums">{r.completed ?? '—'}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums font-semibold">{r.cme ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            {/* Stacked rows on phones */}
            <Card className="md:hidden divide-y divide-[#e8edf5]">
              {rows.map((r) => (
                <div key={r.title} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-snug">{r.title}</p>
                    <StatusPill status={r.status} />
                  </div>
                  <p className="text-xs text-[#5a6a84] mt-1">{r.type}</p>
                  <p className="text-xs text-[#5a6a84] mt-2 tabular-nums">
                    {[r.result, r.completed, r.cme ? `${r.cme} CME` : undefined].filter(Boolean).join(' · ')}
                  </p>
                </div>
              ))}
            </Card>
          </section>
        )
      })}
    </div>
  )
}

function CmeTab() {
  const total = cmeTotal()
  const byType = CME_BY_TYPE()
  const max = Math.max(...byType.map(([, v]) => v))
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
      <div className="min-w-0 flex flex-col gap-6">
        <Card className="p-5 sm:p-6">
          <p className="text-sm text-[#5a6a84]">{CME_CYCLE.label}</p>
          <p className="mt-1">
            <span className="font-serif text-4xl tabular-nums">{total}</span>
            <span className="text-[#5a6a84] tabular-nums"> of {CME_CYCLE.goal} credit goal</span>
          </p>
          <ProgressBar value={(total / CME_CYCLE.goal) * 100} className="mt-4" />
          <p className="text-xs text-[#5a6a84] mt-2">Reporting year ends {CME_CYCLE.ends}. Your goal can be changed in Settings.</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <button className={buttonPrimary}>
              <Download className="w-4 h-4" /> CME certificate (PDF)
            </button>
            <button className={buttonSecondary}>
              <FileSpreadsheet className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </Card>

        <section>
          <h2 className="font-serif text-xl mb-3">Credit history</h2>
          <Card className="divide-y divide-[#e8edf5]">
            {cmeEntries().map((r) => (
              <div key={r.title} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug">{r.title}</p>
                  <p className="text-xs text-[#5a6a84] mt-0.5 tabular-nums">
                    {r.type} · {r.completed}
                  </p>
                </div>
                <span className="font-semibold tabular-nums shrink-0">+{r.cme}</span>
              </div>
            ))}
          </Card>
        </section>
      </div>
      <aside className="flex flex-col gap-4">
        <Card className="p-5">
          <h2 className="font-serif text-lg">By activity type</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {byType.map(([type, credits]) => (
              <li key={type}>
                <div className="flex justify-between text-sm tabular-nums">
                  <span>{type}</span>
                  <span className="font-semibold">{credits}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e8edf5] mt-1.5 overflow-hidden">
                  <div className="h-full rounded-full bg-[#1a3260]" style={{ width: `${(credits / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5 flex gap-3">
          <Info className="w-5 h-5 text-[#8a6d22] shrink-0" />
          <p className="text-sm text-[#5a6a84]">
            Accreditation statements and credit designations will appear on each record once the institute's accreditation details are confirmed.
          </p>
        </Card>
      </aside>
    </div>
  )
}

function VerificationTab() {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => Object.fromEntries(CERTIFICATES.map((c) => [c.id, c.public])))
  const [copied, setCopied] = useState<string | null>(null)
  const [lookup, setLookup] = useState('')
  const [result, setResult] = useState<'idle' | 'found' | 'missing'>('idle')
  const match = CERTIFICATES.find((c) => c.credentialId.toLowerCase() === lookup.trim().toLowerCase())

  const verify = (e: FormEvent) => {
    e.preventDefault()
    setResult(match ? 'found' : 'missing')
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
      <section className="min-w-0">
        <p className="text-[#5a6a84] max-w-2xl">
          Share a verification link with employers, credentialing committees or licensing boards. They see the credential, date and status, never your
          academic record.
        </p>
        <Card className="mt-5 divide-y divide-[#e8edf5]">
          {CERTIFICATES.map((c) => {
            const isPublic = visibility[c.id]
            return (
              <div key={c.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{c.title}</p>
                    <p className="text-xs text-[#5a6a84] mt-0.5 tabular-nums">
                      {c.kind} · <span className="whitespace-nowrap">{c.credentialId}</span>
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer shrink-0">
                    <span className="text-[#5a6a84]">{isPublic ? 'Verifiable' : 'Private'}</span>
                    <input
                      type="checkbox"
                      role="switch"
                      checked={isPublic}
                      onChange={(e) => setVisibility((v) => ({ ...v, [c.id]: e.target.checked }))}
                      aria-label={`Allow verification of ${c.title}`}
                      className="peer sr-only"
                    />
                    <span className="relative w-11 h-6 rounded-full bg-[#d1d9e6] peer-checked:bg-[#0d2147] peer-focus-visible:ring-2 peer-focus-visible:ring-[#c9a84c] transition-colors after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow-[0_1px_2px_rgba(0,0,0,0.2)] after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                </div>
                {isPublic ? (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f5f6f8] pl-3 pr-1 py-1">
                    <Link2 className="w-4 h-4 text-[#5a6a84] shrink-0" />
                    <span className="flex-1 min-w-0 text-xs text-[#5a6a84] truncate tabular-nums">bermaninstitute.com/verify/{c.credentialId}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(`https://bermaninstitute.com/verify/${c.credentialId}`).catch(() => {})
                        setCopied(c.id)
                      }}
                      className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-md text-xs font-semibold hover:bg-white transition-colors"
                    >
                      {copied === c.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === c.id ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-[#5a6a84]">Turn on to create a public verification link.</p>
                )}
              </div>
            )
          })}
        </Card>
      </section>

      <aside>
        <Card className="p-5 sm:p-6">
          <h2 className="font-serif text-lg">Verify a credential</h2>
          <p className="text-sm text-[#5a6a84] mt-1">This is what a third party sees when checking a Berman Institute credential ID.</p>
          <form onSubmit={verify} className="mt-4 flex flex-col gap-2">
            <label htmlFor="verify-id" className="text-sm font-semibold">
              Credential ID
            </label>
            <input
              id="verify-id"
              value={lookup}
              onChange={(e) => {
                setLookup(e.target.value)
                setResult('idle')
              }}
              placeholder="e.g. BI-MC-2026-4417"
              className="min-h-12 w-full rounded-xl border border-[#d1d9e6] bg-white px-4 text-[15px] tabular-nums outline-none focus:border-[#c9a84c] placeholder:text-[#8392aa]"
            />
            <button type="submit" disabled={!lookup.trim()} className={buttonPrimary}>
              Verify
            </button>
          </form>
          <div aria-live="polite">
            {result === 'found' && match && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Valid credential
                </p>
                <dl className="mt-2 text-sm grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  <dt className="text-[#5a6a84]">Holder</dt>
                  <dd>{LEARNER.name}</dd>
                  <dt className="text-[#5a6a84]">Credential</dt>
                  <dd>{match.title}</dd>
                  <dt className="text-[#5a6a84]">Issued</dt>
                  <dd>{match.issued}</dd>
                  <dt className="text-[#5a6a84]">Status</dt>
                  <dd>{visibility[match.id] ? 'Active' : 'Holder has made this credential private'}</dd>
                </dl>
              </div>
            )}
            {result === 'missing' && (
              <div className="mt-4 rounded-xl border border-[#e6b9b9] bg-[#fcf1f1] p-4 text-sm text-[#8f3a3a] flex gap-2">
                <SearchX className="w-4 h-4 shrink-0 mt-0.5" />
                No credential matches that ID. Check the characters and try again.
              </div>
            )}
          </div>
        </Card>
      </aside>
    </div>
  )
}

export default function CredentialsHub({ tab, onSignOut }: { tab: CredentialsTab; onSignOut: () => void }) {
  return (
    <CampusLayout active="credentials" title="Credentials" onSignOut={onSignOut}>
      <div className="mb-6">
        <TabChips label="Credentials sections" tabs={TABS.map((t) => ({ ...t, href: t.key === 'certificates' ? '#/credentials' : `#/credentials/${t.key}` }))} active={tab} />
      </div>
      {tab === 'certificates' && <CertificatesTab />}
      {tab === 'advanced' && <AdvancedTab />}
      {tab === 'record' && <RecordTab />}
      {tab === 'cme' && <CmeTab />}
      {tab === 'verification' && <VerificationTab />}
    </CampusLayout>
  )
}
