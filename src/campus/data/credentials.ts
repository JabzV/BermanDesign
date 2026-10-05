// Sample data for the Credentials prototype. IDs, scores and credit values are illustrative; the
// accrediting body for CME / CE is not yet decided (see PRODUCT.md), so no accreditation is claimed.

export interface Certificate {
  id: string
  credentialId: string
  title: string
  kind: 'Masterclass' | 'Free Education' | 'Certificate Course' | 'Advanced Certificate'
  issued: string
  cme: number
  hours: number
  signatories: string[]
  public: boolean
}

export const CERTIFICATES: Certificate[] = [
  { id: 'glp1-fundamentals', credentialId: 'BI-MC-2026-4417', title: 'GLP-1 Fundamentals', kind: 'Masterclass', issued: 'September 12, 2026', cme: 2, hours: 2, signatories: ['berman'], public: true },
  { id: 'clinical-updates-longevity', credentialId: 'BI-FE-2026-1093', title: 'Clinical Updates in Longevity', kind: 'Free Education', issued: 'July 30, 2026', cme: 1, hours: 1, signatories: ['berman'], public: false },
]

export const findCertificate = (id: string) => CERTIFICATES.find((c) => c.id === id)

export const LEARNER = { name: 'Ana Reyes, MD', specialty: 'Internal Medicine', licence: 'CA · A-128842 (sample)' }

export type RecordStatus = 'Completed' | 'In progress' | 'Attended' | 'Not started'

export interface RecordRow {
  period: string
  title: string
  type: string
  status: RecordStatus
  result?: string
  completed?: string
  cme?: number
}

export const ACADEMIC_RECORD: RecordRow[] = [
  { period: 'Fall 2026', title: 'Module 4 · Metabolic Flexibility', type: 'Advanced Certificate', status: 'In progress', result: '4 of 9 lessons' },
  { period: 'Fall 2026', title: 'Module 3 · Biomarkers & Biological Age', type: 'Advanced Certificate', status: 'Completed', result: 'Knowledge check 80%', completed: 'Sep 28, 2026', cme: 4 },
  { period: 'Fall 2026', title: 'Grand Rounds · Biological Age Clocks in Practice', type: 'Grand Rounds (replay)', status: 'Completed', result: 'Quiz 100%', completed: 'Sep 20, 2026', cme: 1.5 },
  { period: 'Fall 2026', title: 'GLP-1 Fundamentals', type: 'Masterclass', status: 'Completed', result: 'Assessment 95%', completed: 'Sep 12, 2026', cme: 2 },
  { period: 'Fall 2026', title: 'Module 2 · Metabolic Health', type: 'Advanced Certificate', status: 'Completed', result: 'Knowledge check 100%', completed: 'Sep 8, 2026', cme: 4 },
  { period: 'Fall 2026', title: 'Lesson · Insulin Sensitivity Beyond HOMA-IR', type: 'Lesson credit', status: 'Completed', completed: 'Sep 2, 2026', cme: 0.5 },
  { period: 'Fall 2026', title: 'Module 1 · Foundations of Longevity Medicine', type: 'Advanced Certificate', status: 'Completed', result: 'Knowledge check 90%', completed: 'Aug 21, 2026', cme: 4 },
  { period: 'Summer 2026', title: 'Grand Rounds · Peptide Medicine: Evidence and Hype', type: 'Grand Rounds (replay)', status: 'Completed', result: 'Quiz 80%', completed: 'Aug 2, 2026', cme: 1.5 },
  { period: 'Summer 2026', title: 'Clinical Updates in Longevity', type: 'Free Education', status: 'Attended', completed: 'Jul 30, 2026', cme: 1 },
  { period: 'Summer 2026', title: 'Grand Rounds · Hormones Across the Menopausal Transition', type: 'Grand Rounds (live)', status: 'Attended', completed: 'Jun 12, 2026' },
  { period: 'Summer 2026', title: 'Grand Rounds · Longevity Consults: Structure and Pitfalls', type: 'Grand Rounds (live)', status: 'Attended', completed: 'May 8, 2026' },
]

export const CME_CYCLE = { label: '2026 reporting year', goal: 50, ends: 'Dec 31, 2026' }

export const cmeEntries = () => ACADEMIC_RECORD.filter((r) => r.cme)
export const cmeTotal = () => cmeEntries().reduce((sum, r) => sum + (r.cme ?? 0), 0)

export const CME_BY_TYPE = () => {
  const groups = new Map<string, number>()
  for (const r of cmeEntries()) {
    const key = r.type.startsWith('Grand Rounds') ? 'Grand Rounds' : r.type
    groups.set(key, (groups.get(key) ?? 0) + (r.cme ?? 0))
  }
  return [...groups.entries()].sort((a, b) => b[1] - a[1])
}
