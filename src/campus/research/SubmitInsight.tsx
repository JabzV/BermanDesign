import { useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, buttonPrimary, buttonSecondary } from '../ui'
import { TOPICS } from '../data/library'
import { cn } from '../../lib/utils'

const KINDS = ['Clinical observation', 'Case series', 'Practice tip', 'Question for colleagues'] as const
const SUMMARY_MAX = 280

type Fields = {
  title: string
  topic: string
  kind: string
  summary: string
  body: string
  references: string
  deidentified: boolean
  disclosure: string
}
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { title: '', topic: '', kind: '', summary: '', body: '', references: '', deidentified: false, disclosure: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.title.trim().length < 10) e.title = 'Give your insight a title of at least 10 characters.'
  if (!f.topic) e.topic = 'Choose the topic that fits best.'
  if (!f.kind) e.kind = 'Choose the type of insight.'
  if (!f.summary.trim()) e.summary = 'Add a short summary readers will see in the feed.'
  else if (f.summary.length > SUMMARY_MAX) e.summary = `Shorten the summary to ${SUMMARY_MAX} characters or fewer.`
  if (f.body.trim().length < 100) e.body = 'Describe what you observed in at least 100 characters.'
  if (!f.deidentified) e.deidentified = 'Confirm that no patient can be identified before submitting.'
  if (!f.disclosure.trim()) e.disclosure = 'Enter your disclosures, or "None".'
  return e
}

const inputCls = (error?: string) =>
  cn(
    'mt-2 w-full rounded-xl border bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-[#8392aa]',
    error ? 'border-[#c25b5b] focus:border-[#c25b5b]' : 'border-[#d1d9e6] focus:border-[#c9a84c]',
  )

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-[#5a6a84] mt-0.5">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b04848] inline-flex items-start gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
        </p>
      )}
    </div>
  )
}

const REVIEW_STEPS = [
  { label: 'Submitted', detail: 'Today', done: true },
  { label: 'Editorial review', detail: 'Usually within 5 business days', done: false },
  { label: 'Faculty review', detail: 'For clinical accuracy and safety', done: false },
  { label: 'Published to members', detail: 'With your name and specialty', done: false },
]

export default function SubmitInsight({ onSignOut }: { onSignOut: () => void }) {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setF((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }
  const describedBy = (id: keyof Fields, hint = false) => [hint && `${id}-hint`, errors[id] && `${id}-error`].filter(Boolean).join(' ') || undefined

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next = validate(f)
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) document.getElementById(first)?.focus()
    else setSubmitted(true)
  }

  const layout = { active: 'research' as const, title: 'Submit a Clinical Insight', back: { label: 'Clinical Insights', href: '#/research/insights' }, onSignOut }

  if (submitted) {
    return (
      <CampusLayout {...layout}>
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            <h2 className="font-serif text-2xl mt-4">Submitted for editorial review</h2>
            <p className="text-[#5a6a84] mt-2">
              Thank you. “{f.title}” is with the editorial team. We will email you if changes are needed, and you can track it under My submissions.
            </p>
            <ol className="mt-6 flex flex-col gap-4">
              {REVIEW_STEPS.map((s) => (
                <li key={s.label} className="flex gap-3">
                  <span className={cn('w-5 h-5 rounded-full mt-0.5 shrink-0 border-2', s.done ? 'bg-[#0d2147] border-[#0d2147]' : 'border-[#d1d9e6]')} />
                  <div>
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-xs text-[#5a6a84]">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={() => {
                  setF(EMPTY)
                  setSubmitted(false)
                }}
                className={buttonSecondary}
              >
                Submit another
              </button>
              <a href="#/research/insights" className={buttonPrimary}>
                View my submissions
              </a>
            </div>
          </Card>
        </div>
      </CampusLayout>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <CampusLayout {...layout}>
      <div className="max-w-2xl mx-auto">
        <p className="text-[#5a6a84]">
          Share an observation from your practice. Insights are reviewed by the editorial team and faculty before publication to verified members.
        </p>

        {errorCount > 0 && (
          <div role="alert" className="mt-6 rounded-xl border border-[#e6b9b9] bg-[#fcf1f1] p-4 text-sm text-[#8f3a3a] flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {errorCount === 1 ? '1 field needs attention.' : `${errorCount} fields need attention.`}
          </div>
        )}

        <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-6">
          <Card className="p-5 sm:p-7 flex flex-col gap-6">
            <Field id="title" label="Title" error={errors.title}>
              <input
                id="title"
                value={f.title}
                onChange={(e) => set('title', e.target.value)}
                aria-invalid={!!errors.title}
                aria-describedby={describedBy('title')}
                placeholder="e.g. CGM unmasks dysglycemia in lean patients"
                className={cn(inputCls(errors.title), 'min-h-12')}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-6">
              <Field id="topic" label="Topic" error={errors.topic}>
                <select
                  id="topic"
                  value={f.topic}
                  onChange={(e) => set('topic', e.target.value)}
                  aria-invalid={!!errors.topic}
                  aria-describedby={describedBy('topic')}
                  className={cn(inputCls(errors.topic), 'min-h-12', !f.topic && 'text-[#8392aa]')}
                >
                  <option value="">Select a topic</option>
                  {TOPICS.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="kind" label="Type of insight" error={errors.kind}>
                <select
                  id="kind"
                  value={f.kind}
                  onChange={(e) => set('kind', e.target.value)}
                  aria-invalid={!!errors.kind}
                  aria-describedby={describedBy('kind')}
                  className={cn(inputCls(errors.kind), 'min-h-12', !f.kind && 'text-[#8392aa]')}
                >
                  <option value="">Select a type</option>
                  {KINDS.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="summary" label="Summary" hint="Shown in the research feed. One or two sentences." error={errors.summary}>
              <textarea
                id="summary"
                value={f.summary}
                onChange={(e) => set('summary', e.target.value)}
                aria-invalid={!!errors.summary}
                aria-describedby={describedBy('summary', true)}
                rows={3}
                className={cn(inputCls(errors.summary), 'py-3 leading-relaxed resize-y')}
              />
              <p className={cn('text-xs mt-1 text-right tabular-nums', f.summary.length > SUMMARY_MAX ? 'text-[#b04848]' : 'text-[#5a6a84]')}>
                {f.summary.length} / {SUMMARY_MAX}
              </p>
            </Field>

            <Field id="body" label="Your insight" hint="What you observed, in which patients, what you changed, and what you would like colleagues to weigh in on." error={errors.body}>
              <textarea
                id="body"
                value={f.body}
                onChange={(e) => set('body', e.target.value)}
                aria-invalid={!!errors.body}
                aria-describedby={describedBy('body', true)}
                rows={9}
                className={cn(inputCls(errors.body), 'py-3 leading-relaxed resize-y')}
              />
            </Field>

            <Field id="references" label="References (optional)" hint="One per line. DOIs or links are fine.">
              <textarea
                id="references"
                value={f.references}
                onChange={(e) => set('references', e.target.value)}
                aria-describedby="references-hint"
                rows={3}
                className={cn(inputCls(), 'py-3 leading-relaxed resize-y')}
              />
            </Field>
          </Card>

          <Card className="p-5 sm:p-7 flex flex-col gap-6">
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="deidentified"
                  type="checkbox"
                  checked={f.deidentified}
                  onChange={(e) => set('deidentified', e.target.checked)}
                  aria-invalid={!!errors.deidentified}
                  aria-describedby={describedBy('deidentified')}
                  className="mt-0.5 w-5 h-5 shrink-0"
                />
                <span className="text-sm">
                  <span className="font-semibold inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8a6d22]" /> No patient can be identified
                  </span>
                  <span className="block text-[#5a6a84] mt-0.5">
                    I have removed names, dates of birth, exact dates, locations and images that could identify a patient.
                  </span>
                </span>
              </label>
              {errors.deidentified && (
                <p id="deidentified-error" className="mt-1.5 ml-8 text-sm text-[#b04848] inline-flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {errors.deidentified}
                </p>
              )}
            </div>
            <Field id="disclosure" label="Conflicts of interest" hint='Relevant financial relationships, or "None".' error={errors.disclosure}>
              <input
                id="disclosure"
                value={f.disclosure}
                onChange={(e) => set('disclosure', e.target.value)}
                aria-invalid={!!errors.disclosure}
                aria-describedby={describedBy('disclosure', true)}
                className={cn(inputCls(errors.disclosure), 'min-h-12')}
              />
            </Field>
          </Card>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <a href="#/research/insights" className={buttonSecondary}>
              Cancel
            </a>
            <button type="submit" className={buttonPrimary}>
              Submit for review
            </button>
          </div>
        </form>
      </div>
    </CampusLayout>
  )
}
