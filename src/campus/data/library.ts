// Sample data for the Clinical Library prototype. Titles, cases and figures are illustrative only.
import type { Tone, TopicIcon } from './learn'

export type TopicKey = 'longevity' | 'metabolic' | 'glp1' | 'peptides' | 'biomarkers' | 'hormones' | 'aesthetics'
export type ItemType = 'video' | 'article' | 'case' | 'grand-rounds' | 'protocol'

export const TOPICS: { key: TopicKey; label: string; icon: TopicIcon; tone: Tone; blurb: string }[] = [
  { key: 'longevity', label: 'Longevity', icon: 'leaf', tone: 'navy', blurb: 'Hallmarks of aging, healthspan and prevention' },
  { key: 'metabolic', label: 'Metabolic Health', icon: 'activity', tone: 'gold', blurb: 'Insulin resistance, lipids and metabolic flexibility' },
  { key: 'glp1', label: 'GLP-1', icon: 'syringe', tone: 'navy', blurb: 'Prescribing, titration and complex patients' },
  { key: 'peptides', label: 'Peptides', icon: 'flask', tone: 'mist', blurb: 'Evidence, safety and protocols' },
  { key: 'biomarkers', label: 'Biomarkers', icon: 'dna', tone: 'mist', blurb: 'Panels, clocks and interpretation' },
  { key: 'hormones', label: 'Hormones', icon: 'heart', tone: 'gold', blurb: 'Menopause, andropause and thyroid' },
  { key: 'aesthetics', label: 'Aesthetics', icon: 'sparkles', tone: 'navy', blurb: 'Regenerative and aesthetic medicine' },
]

export const TYPE_LABEL: Record<ItemType, string> = {
  video: 'Video',
  article: 'Article',
  case: 'Clinical case',
  'grand-rounds': 'Grand Rounds',
  protocol: 'Protocol',
}

export interface LibraryItem {
  id: string
  type: ItemType
  title: string
  summary: string
  topic: TopicKey
  faculty: string
  minutes: number
  date: string
  cme?: number
  isNew?: boolean
  /** Case-only: one-line patient presentation and difficulty */
  patient?: string
  level?: 'Foundational' | 'Intermediate' | 'Advanced'
  discussion?: number
}

export const LIBRARY: LibraryItem[] = [
  { id: 'gr-2026-09', type: 'grand-rounds', title: 'After the Weight Loss: GLP-1 Maintenance and Tapering', summary: 'What happens when patients stop, how to taper, and protecting lean mass along the way.', topic: 'glp1', faculty: 'berman', minutes: 74, date: 'Sep 11, 2026', cme: 1.5, isNew: true },
  { id: 'v-glp1-titration', type: 'video', title: 'Titration Strategies for Complex Patients', summary: 'Stepwise dosing when GI effects, polypharmacy or low BMI complicate treatment.', topic: 'glp1', faculty: 'berman', minutes: 22, date: 'Sep 29, 2026', cme: 0.5, isNew: true },
  { id: 'c-lean-ir', type: 'case', title: 'Insulin Resistance in a Lean 42-Year-Old', summary: 'Normal BMI and A1c, but fatigue, rising triglycerides and a family history of diabetes.', topic: 'metabolic', faculty: 'torres', minutes: 15, date: 'Sep 26, 2026', cme: 0.5, isNew: true, patient: '42-year-old woman, BMI 22, fatigue and afternoon crashes', level: 'Intermediate', discussion: 23 },
  { id: 'a-perimenopause', type: 'article', title: 'Perimenopause and Metabolic Health', summary: 'Why insulin sensitivity, visceral fat and lipids shift in the menopausal transition, and what to monitor.', topic: 'hormones', faculty: 'chen', minutes: 9, date: 'Sep 24, 2026', isNew: true },
  { id: 'gr-2026-08', type: 'grand-rounds', title: 'Biological Age Clocks in Practice', summary: 'Which epigenetic clocks are clinically useful, and how to explain results to patients.', topic: 'biomarkers', faculty: 'chen', minutes: 68, date: 'Aug 14, 2026', cme: 1.5 },
  { id: 'c-athlete', type: 'case', title: 'The Inflexible Endurance Athlete', summary: 'A marathon runner with a fasting RER of 0.91 and unexplained fatigue.', topic: 'metabolic', faculty: 'torres', minutes: 14, date: 'Aug 30, 2026', cme: 0.5, patient: '38-year-old man, 60 km/week runner, fatigue and poor recovery', level: 'Advanced', discussion: 41 },
  { id: 'p-zone2', type: 'protocol', title: 'Zone 2 Prescription Protocol', summary: 'Intake, heart-rate targets and 12-week progression for metabolically inflexible patients.', topic: 'metabolic', faculty: 'torres', minutes: 6, date: 'Aug 20, 2026' },
  { id: 'v-hallmarks', type: 'video', title: 'The Hallmarks of Aging, Clinically', summary: 'Translating the twelve hallmarks into what you can measure and change in clinic.', topic: 'longevity', faculty: 'berman', minutes: 26, date: 'Aug 9, 2026', cme: 0.5 },
  { id: 'c-peptide-msk', type: 'case', title: 'Peptides After a Rotator Cuff Repair', summary: 'A patient asking for BPC-157 after surgery: evidence, sourcing and safety.', topic: 'peptides', faculty: 'torres', minutes: 12, date: 'Aug 2, 2026', cme: 0.5, patient: '51-year-old man, 6 weeks after rotator cuff repair', level: 'Intermediate', discussion: 37 },
  { id: 'gr-2026-07', type: 'grand-rounds', title: 'Peptide Medicine: Evidence and Hype', summary: 'A frank review of the evidence for common peptides and how to counsel patients.', topic: 'peptides', faculty: 'torres', minutes: 71, date: 'Jul 10, 2026', cme: 1.5 },
  { id: 'a-apob', type: 'article', title: 'ApoB Before LDL-C: A Practical Guide', summary: 'When ApoB changes management, and how to explain discordant results.', topic: 'biomarkers', faculty: 'chen', minutes: 7, date: 'Jul 22, 2026' },
  { id: 'c-testosterone', type: 'case', title: 'Low Testosterone or Low Sleep?', summary: 'A 45-year-old executive requesting TRT with borderline labs and 5 hours of sleep.', topic: 'hormones', faculty: 'chen', minutes: 13, date: 'Jul 18, 2026', patient: '45-year-old man, low libido, total T 310 ng/dL', level: 'Foundational', discussion: 52 },
  { id: 'v-regen-aesthetics', type: 'video', title: 'Regenerative Approaches in Aesthetic Practice', summary: 'Evidence for PRP, exosomes and collagen stimulators, and where they fit.', topic: 'aesthetics', faculty: 'nouri', minutes: 24, date: 'Jul 6, 2026', cme: 0.5 },
  { id: 'gr-2026-06', type: 'grand-rounds', title: 'Hormones Across the Menopausal Transition', summary: 'Case-based discussion of HRT decisions in metabolically high-risk women.', topic: 'hormones', faculty: 'chen', minutes: 66, date: 'Jun 12, 2026', cme: 1.5 },
  { id: 'c-glp1-sarcopenia', type: 'case', title: 'GLP-1 and Muscle Loss in a 68-Year-Old', summary: 'Excellent weight loss, but grip strength is falling. What now?', topic: 'glp1', faculty: 'berman', minutes: 16, date: 'Jun 28, 2026', cme: 0.5, patient: '68-year-old woman, 14% weight loss on semaglutide', level: 'Advanced', discussion: 64 },
  { id: 'gr-2026-05', type: 'grand-rounds', title: 'Longevity Consults: Structure and Pitfalls', summary: 'How faculty run a first longevity consult, from intake to follow-up plan.', topic: 'longevity', faculty: 'berman', minutes: 62, date: 'May 8, 2026', cme: 1.5 },
]

export function findItem(id: string) {
  return LIBRARY.find((i) => i.id === id)
}

export function relatedItems(item: LibraryItem, count = 3) {
  return LIBRARY.filter((i) => i.id !== item.id && i.topic === item.topic)
    .concat(LIBRARY.filter((i) => i.id !== item.id && i.topic !== item.topic && i.type === item.type))
    .slice(0, count)
}

// Detail content shared across items of the same type (prototype only).
export const ARTICLE_BODY = [
  { heading: 'Why it matters', text: 'The menopausal transition is accompanied by a shift toward central adiposity, a fall in insulin sensitivity and a more atherogenic lipid profile. These changes often begin years before the final menstrual period and are easy to miss when standard labs are still within range.' },
  { heading: 'What changes', text: 'Declining estradiol reduces skeletal muscle glucose uptake and favors visceral fat storage. ApoB and triglycerides typically rise, while HDL function may decline even when HDL-C appears stable. Sleep disruption from vasomotor symptoms compounds insulin resistance.' },
  { heading: 'What to monitor', text: 'Consider fasting insulin, ApoB and triglycerides alongside A1c, and track waist circumference rather than weight alone. A CGM trial can reveal post-meal excursions that standard labs miss, particularly in symptomatic patients.' },
  { heading: 'Clinical approach', text: 'Resistance training and protein-forward nutrition protect lean mass through the transition. Hormone therapy decisions should weigh metabolic benefits against individual risk; discuss timing, route and monitoring with each patient.' },
]

export const ARTICLE_REFERENCES = [
  'Sample reference — Journal of Clinical Endocrinology & Metabolism, 2024.',
  'Sample reference — Menopause, 2023.',
  'Sample reference — Diabetes Care, 2022.',
]

export const CASE_DETAIL = {
  presentation:
    'A 42-year-old woman presents with fatigue, afternoon energy crashes and difficulty losing 3 kg gained over two years. She exercises three times weekly and eats a "healthy" diet. Her mother developed type 2 diabetes at 55.',
  findings: [
    { label: 'BMI', value: '22.4 kg/m²' },
    { label: 'Waist', value: '84 cm' },
    { label: 'Fasting glucose', value: '94 mg/dL' },
    { label: 'A1c', value: '5.5%' },
    { label: 'Fasting insulin', value: '14 µIU/mL', flag: true },
    { label: 'Triglycerides', value: '168 mg/dL', flag: true },
    { label: 'HDL-C', value: '48 mg/dL' },
    { label: 'ApoB', value: '108 mg/dL', flag: true },
  ],
  question: 'Before reading the faculty discussion: what would you order next, and what is your working diagnosis?',
  discussion: [
    'Her glycemic labs are normal, but a fasting insulin of 14 with a triglyceride-to-HDL ratio above 3 suggests early insulin resistance. A normal BMI does not rule this out; her waist circumference and family history matter more.',
    'I would add a two-week CGM trial and, if available, indirect calorimetry. In our clinic, patients with this profile commonly show post-meal peaks above 160 mg/dL and an elevated fasting RER.',
    'Management starts with resistance training twice weekly, Zone 2 work three times weekly, and moving most carbohydrates to after training. Re-test insulin, triglycerides and ApoB at 12 weeks.',
  ],
  teachingPoints: [
    'Normal BMI and A1c do not exclude insulin resistance.',
    'Fasting insulin and TG:HDL are inexpensive early signals.',
    'Waist circumference and family history outweigh BMI in lean patients.',
    'Re-test at 12 weeks to confirm the intervention is working.',
  ],
}

export const GRAND_ROUNDS_AGENDA = [
  { time: '00:00', label: 'Research update', detail: 'New cardiometabolic outcome data and what changed in guidelines.' },
  { time: '14:30', label: 'Clinical case presentation', detail: 'Three patients with difficult titration and side-effect profiles.' },
  { time: '38:10', label: 'Faculty discussion', detail: 'Dr. Berman and guest faculty on muscle preservation and dosing.' },
  { time: '57:45', label: 'Q&A', detail: 'Questions submitted live by members.' },
]

export const GRAND_ROUNDS_SUMMARY = [
  'Prioritize protein intake and resistance training from the first dose to limit lean mass loss.',
  'Slower titration reduces GI discontinuation without meaningfully delaying results.',
  'Reassess the goal at 6 months: weight, waist, grip strength and patient-reported function.',
]
