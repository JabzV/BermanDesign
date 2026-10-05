import { useState } from 'react'
import { Check, Lock, CreditCard, Download, GraduationCap, ArrowRight } from 'lucide-react'
import { Card, ProgressBar, Switch, buttonSecondary } from '../ui'
import { PROGRAM } from '../data/learn'
import { ProfileLayout, SectionTitle, Row, useToast } from './parts'
import { cn } from '../../lib/utils'

const CURRENT_BENEFITS = [
  'Full Advanced Certificate curriculum and assessments',
  'Live Grand Rounds and the replay library',
  'Clinical Library, Research and Journal Club',
  'Cohort community and Ask the Faculty',
  'CME / CE record and certificates',
]

const MEMBERSHIP_BENEFITS = [
  'Continued access to Grand Rounds, the Clinical Library and Research',
  'Graduate professional network and Member Directory listing',
  'Faculty and contributor pathway applications',
  'Research collaboration as a contributing site',
]

const INVOICES = [
  { id: 'INV-2026-0804', date: 'Aug 4, 2026', description: 'Advanced Certificate · Fall 2026 tuition', status: 'Paid' },
  { id: 'INV-2026-0612', date: 'Jun 12, 2026', description: 'GLP-1 Fundamentals masterclass', status: 'Paid' },
]

export default function Membership({ onSignOut }: { onSignOut: () => void }) {
  const [notify, setNotify] = useState(true)
  const { show, toast } = useToast()

  return (
    <ProfileLayout section="membership" onSignOut={onSignOut}>
      <SectionTitle title="Membership" description="Your current access, what comes next, and billing." />

      <div className="flex flex-col gap-5">
        <section className="relative bg-[#0d2147] text-white rounded-2xl p-5 sm:p-7 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-28 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
          />
          <div className="relative">
            <p className="text-sm text-white/75">Current plan</p>
            <h3 className="font-serif text-2xl mt-1">Advanced Certificate Enrollment</h3>
            <p className="text-sm text-white/75 mt-1">{PROGRAM.cohort} · Access through Aug 2027</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {CURRENT_BENEFITS.map((b) => (
                <li key={b} className="flex gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#e2c575] shrink-0 mt-0.5" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-xl bg-[#e8edf5] text-[#5a6a84] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl">Professional Membership</h3>
              <p className="text-sm text-[#5a6a84] mt-1">
                Offered to graduates when the Advanced Certificate is awarded. Membership keeps you connected to the institute after your program ends.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-2 tabular-nums">
              <span className="text-[#5a6a84]">Advanced Certificate progress</span>
              <span className="font-semibold">{PROGRAM.progress}%</span>
            </div>
            <ProgressBar value={PROGRAM.progress} />
          </div>
          <ul className="mt-5 flex flex-col gap-2">
            {MEMBERSHIP_BENEFITS.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-[#5a6a84]">
                <GraduationCap className="w-4 h-4 text-[#8a6d22] shrink-0 mt-0.5" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-[#e8edf5] flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-sm text-[#5a6a84]">Membership plans and pricing are shared with each graduating cohort.</p>
            <a href="#/learn/program/advanced-certificate" className="inline-flex items-center gap-1 text-sm font-semibold shrink-0 hover:underline underline-offset-4">
              Continue program <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Card>

        <Card className="px-5 sm:px-6 py-2">
          <Row label="Tell me when membership opens" description="Email when your cohort's membership options are announced.">
            <Switch
              checked={notify}
              onChange={(v) => {
                setNotify(v)
                show(v ? 'We will let you know' : 'Reminder turned off')
              }}
              label="Tell me when membership opens"
            />
          </Row>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="font-serif text-lg">Billing</h3>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-[#d1d9e6] p-4">
            <CreditCard className="w-6 h-6 text-[#5a6a84] shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold tabular-nums">Visa ending 4242 (sample)</p>
              <p className="text-xs text-[#5a6a84]">Expires 09/2029 · Ana Reyes</p>
            </div>
            <button className={cn(buttonSecondary, 'self-start sm:self-auto')}>Update card</button>
          </div>

          <h4 className="text-sm font-semibold mt-6">Invoices</h4>
          <ul className="mt-2 divide-y divide-[#e8edf5] border-t border-[#e8edf5]">
            {INVOICES.map((inv) => (
              <li key={inv.id} className="flex items-center gap-3 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{inv.description}</p>
                  <p className="text-xs text-[#5a6a84] tabular-nums">
                    {inv.date} · {inv.id}
                  </p>
                </div>
                <span className="text-xs font-semibold rounded-full px-2.5 py-1 bg-emerald-50 text-emerald-700 shrink-0">{inv.status}</span>
                <button aria-label={`Download invoice ${inv.id}`} className="w-11 h-11 rounded-full flex items-center justify-center text-[#5a6a84] hover:bg-[#f5f6f8] shrink-0">
                  <Download className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      {toast}
    </ProfileLayout>
  )
}
