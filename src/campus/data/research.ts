// Sample data for the Research prototype. Studies, citations and figures are illustrative, not real publications.
import type { TopicKey } from './library'

export type ResearchType = 'brief' | 'journal-club' | 'insight' | 'publication' | 'project' | 'discussion'

export const RESEARCH_TYPE_LABEL: Record<ResearchType, string> = {
  brief: 'Research brief',
  'journal-club': 'Journal Club',
  insight: 'Clinical insight',
  publication: 'Publication',
  project: 'Research project',
  discussion: 'Discussion',
}

export interface Author {
  name: string
  role: string
  /** faculty id from learn data, when the author is faculty */
  faculty?: string
  initials: string
}

const A = {
  chen: { name: 'Dr. Sarah Chen', role: 'Faculty · Director of Research', faculty: 'chen', initials: 'SC' },
  berman: { name: 'Dr. Dean Berman', role: 'Faculty · Medical Director', faculty: 'berman', initials: 'DB' },
  torres: { name: 'Dr. Marcus Torres', role: 'Faculty · Clinical', faculty: 'torres', initials: 'MT' },
  patel: { name: 'Dr. Priya Patel', role: 'Member · Family Medicine', initials: 'PP' },
  okafor: { name: 'Dr. James Okafor', role: 'Member · Cardiology', initials: 'JO' },
  lindqvist: { name: 'Dr. Emma Lindqvist', role: 'Member · Endocrinology', initials: 'EL' },
  research: { name: 'Berman Research Team', role: 'Institute', initials: 'BR' },
} satisfies Record<string, Author>

export interface ResearchItem {
  id: string
  type: ResearchType
  title: string
  summary: string
  topic: TopicKey
  author: Author
  date: string
  minutes: number
  comments: number
  isNew?: boolean
  /** publication */
  citation?: string
  pubKind?: 'Peer-reviewed' | 'Position statement' | 'Institute report'
  /** project */
  status?: 'Recruiting' | 'Data collection' | 'Analysis'
  sites?: number
  participants?: string
  /** journal club */
  paper?: string
  sessionDate?: string
  upcoming?: boolean
}

export const RESEARCH: ResearchItem[] = [
  { id: 'jc-oct', type: 'journal-club', title: 'Lean Mass Loss on GLP-1 Agonists: How Much Is Too Much?', summary: 'We review a body-composition sub-study and debate what proportion of lean loss is acceptable, and how to protect it.', topic: 'glp1', author: A.chen, date: 'Oct 1, 2026', minutes: 60, comments: 18, isNew: true, upcoming: true, sessionDate: 'Thu, Oct 16 · 7:00 PM ET', paper: 'Sample et al. Body composition changes during GLP-1 receptor agonist therapy. Sample Journal of Obesity. 2026.' },
  { id: 'rb-clocks', type: 'brief', title: 'Biological Age Testing: Which Clocks Perform Best in Clinical Practice', summary: 'A comparison of second- and third-generation epigenetic clocks on reliability, cost and what the results change.', topic: 'biomarkers', author: A.research, date: 'Sep 30, 2026', minutes: 5, comments: 12, isNew: true },
  { id: 'ci-cgm-lean', type: 'insight', title: 'CGM Unmasks Post-Meal Dysglycemia in Lean Patients With Normal A1c', summary: 'In 31 lean patients with normal A1c, 2-week CGM showed peaks above 160 mg/dL in nearly half. A practice observation.', topic: 'metabolic', author: A.patel, date: 'Sep 28, 2026', minutes: 4, comments: 27, isNew: true },
  { id: 'disc-apob', type: 'discussion', title: 'Should ApoB replace LDL-C as the primary target in primary prevention?', summary: 'Members debate discordance, cost and how they explain ApoB to patients.', topic: 'biomarkers', author: A.okafor, date: 'Sep 27, 2026', minutes: 3, comments: 46, isNew: true },
  { id: 'rb-mito', type: 'brief', title: 'Mitochondrial Biogenesis Protocols: Evidence from Recent Trials', summary: 'What exercise, nutrition and supplement trials actually show about increasing mitochondrial capacity.', topic: 'metabolic', author: A.torres, date: 'Sep 23, 2026', minutes: 6, comments: 9 },
  { id: 'pr-flex', type: 'project', title: 'Metabolic Flexibility Registry', summary: 'A multi-site registry tracking RER, CGM and body composition in patients treated for metabolic inflexibility.', topic: 'metabolic', author: A.chen, date: 'Started Mar 2026', minutes: 4, comments: 14, status: 'Recruiting', sites: 12, participants: '418 patients enrolled' },
  { id: 'pr-glp1-muscle', type: 'project', title: 'GLP-1 Muscle Preservation Study', summary: 'Pragmatic comparison of resistance training plus protein targets versus usual care during GLP-1 therapy.', topic: 'glp1', author: A.berman, date: 'Started Jan 2026', minutes: 4, comments: 22, status: 'Data collection', sites: 8, participants: '260 patients enrolled' },
  { id: 'pr-peptide-safety', type: 'project', title: 'Peptide Safety Surveillance Network', summary: 'Structured adverse-event reporting from member clinics prescribing therapeutic peptides.', topic: 'peptides', author: A.torres, date: 'Started 2025', minutes: 3, comments: 8, status: 'Analysis', sites: 21, participants: '1,140 reports' },
  { id: 'ci-hrt-sleep', type: 'insight', title: 'Treating Sleep First Changed My Testosterone Referrals', summary: 'After adding a sleep intervention before TRT, a third of borderline patients no longer met criteria at re-test.', topic: 'hormones', author: A.okafor, date: 'Sep 19, 2026', minutes: 3, comments: 31 },
  { id: 'ci-protein', type: 'insight', title: 'Protein Targets on GLP-1: What Patients Actually Reach', summary: 'Food logs from 40 patients show most fall short of 1.2 g/kg. Practical prompts that helped.', topic: 'glp1', author: A.lindqvist, date: 'Sep 10, 2026', minutes: 4, comments: 19 },
  { id: 'jc-sep', type: 'journal-club', title: 'Epigenetic Clocks: Ready for the Clinic?', summary: 'Faculty-moderated review of a validation study comparing four clocks against clinical outcomes.', topic: 'biomarkers', author: A.chen, date: 'Sep 18, 2026', minutes: 60, comments: 34, sessionDate: 'Sep 18, 2026', paper: 'Sample et al. Clinical validity of epigenetic age estimators. Sample Aging Journal. 2025.' },
  { id: 'jc-aug', type: 'journal-club', title: 'Zone 2 Training and Fat Oxidation: Reading the Evidence', summary: 'Do the trials support Zone 2 as a distinct training intensity? Members compare protocols.', topic: 'metabolic', author: A.torres, date: 'Aug 21, 2026', minutes: 60, comments: 29, sessionDate: 'Aug 21, 2026', paper: 'Sample et al. Low-intensity endurance training and substrate oxidation. Sample Sports Med. 2025.' },
  { id: 'disc-zone2', type: 'discussion', title: 'How are you prescribing Zone 2 to patients who hate exercise?', summary: 'Practical tips on walking pads, heart-rate apps and minimum effective doses.', topic: 'metabolic', author: A.patel, date: 'Sep 15, 2026', minutes: 2, comments: 38 },
  { id: 'disc-peptide-sourcing', type: 'discussion', title: 'Peptide sourcing: what standards do your clinics require?', summary: 'Compounding pharmacies, certificates of analysis and documentation.', topic: 'peptides', author: A.lindqvist, date: 'Sep 8, 2026', minutes: 2, comments: 25 },
  { id: 'pub-consensus', type: 'publication', title: 'Clinical Use of Biological Age Testing: A Berman Institute Position Statement', summary: 'Recommendations on when biological age testing is appropriate and how results should guide care.', topic: 'biomarkers', author: A.chen, date: 'Jun 2026', minutes: 12, comments: 7, pubKind: 'Position statement', citation: 'Chen S, Berman D, et al. Berman Institute Position Statement. 2026.' },
  { id: 'pub-flex', type: 'publication', title: 'Metabolic Flexibility in Primary Care: A Practical Assessment Framework', summary: 'A stepwise framework for identifying and monitoring metabolic inflexibility using accessible tests.', topic: 'metabolic', author: A.berman, date: 'Mar 2026', minutes: 15, comments: 11, pubKind: 'Peer-reviewed', citation: 'Berman D, Torres M, Chen S. Sample Journal of Metabolic Medicine. 2026;12(3):145–158.' },
  { id: 'pub-report', type: 'publication', title: 'Longevity Medicine Practice Survey 2025', summary: 'How 600 clinicians integrate longevity care: tests ordered, interventions used and barriers.', topic: 'longevity', author: A.research, date: 'Jan 2026', minutes: 10, comments: 5, pubKind: 'Institute report', citation: 'Berman Institute Research Team. Practice Survey Report. 2026.' },
  { id: 'pub-glp1', type: 'publication', title: 'Preserving Lean Mass During GLP-1 Therapy: A Narrative Review', summary: 'Evidence for resistance training, protein and monitoring strategies during incretin-based treatment.', topic: 'glp1', author: A.berman, date: 'Nov 2025', minutes: 14, comments: 16, pubKind: 'Peer-reviewed', citation: 'Berman D, Lindqvist E, et al. Sample Obesity Reviews. 2025;8(4):301–318.' },
]

export function findResearch(id: string) {
  return RESEARCH.find((r) => r.id === id)
}

export const MY_SUBMISSIONS = [
  { id: 'sub-1', title: 'Ferritin as an Early Marker in Metabolically Inflexible Women', status: 'Under editorial review' as const, date: 'Submitted Sep 29, 2026' },
  { id: 'sub-2', title: 'Shared Medical Visits for GLP-1 Titration', status: 'Changes requested' as const, date: 'Submitted Sep 12, 2026' },
]

export const DETAIL_SECTIONS: Record<ResearchType, { heading: string; text: string }[]> = {
  brief: [
    { heading: 'Key findings', text: 'Third-generation clocks trained on outcomes (mortality, morbidity) show stronger associations with clinical events than first-generation clocks trained on chronological age. Test–retest reliability varies widely between vendors.' },
    { heading: 'What it means for practice', text: 'Use biological age as a conversation and motivation tool, not a diagnostic. Re-test no sooner than 6–12 months, with the same vendor, and interpret change alongside conventional risk markers.' },
    { heading: 'Limitations', text: 'Most validation cohorts are older and of European ancestry. Few studies show that changing a clock value changes outcomes.' },
  ],
  insight: [
    { heading: 'Observation', text: 'Over 18 months I offered a 2-week CGM trial to lean patients (BMI under 25) with normal A1c who reported fatigue or post-meal sleepiness. Nearly half showed repeated peaks above 160 mg/dL after typical meals.' },
    { heading: 'What I changed', text: 'These patients now receive the same lifestyle prescription I use for overt insulin resistance: resistance training, carbohydrate timing after activity and a re-test at 12 weeks.' },
    { heading: 'Questions for colleagues', text: 'Is anyone seeing similar patterns? I would value input on thresholds and whether to repeat CGM before intervening.' },
  ],
  'journal-club': [
    { heading: 'The paper', text: 'A body-composition sub-study measuring DEXA lean mass before and after 68 weeks of therapy, reporting lean mass as a proportion of total weight lost.' },
    { heading: 'Discussion questions', text: '1. Is lean mass by DEXA a fair proxy for muscle function? 2. What proportion of lean loss should prompt intervention? 3. Which patients need grip strength or chair-stand testing at baseline?' },
    { heading: 'Moderator notes', text: 'Read the methods and the supplementary body-composition tables before the session. We will spend 20 minutes on methods and 30 on clinical application.' },
  ],
  publication: [
    { heading: 'Abstract', text: 'Metabolic inflexibility often precedes abnormal glycemic markers. We propose a stepwise framework using fasting insulin, triglyceride-to-HDL ratio, CGM and, where available, indirect calorimetry to identify and monitor inflexibility in primary care.' },
    { heading: 'Recommendations', text: 'Screen patients with central adiposity or a family history of diabetes regardless of BMI. Re-assess at 12 weeks after intervention. Reserve indirect calorimetry for unclear or high-performance cases.' },
  ],
  project: [
    { heading: 'Aim', text: 'To describe how metabolic flexibility markers change with treatment in routine practice, and which patient factors predict response.' },
    { heading: 'What participation involves', text: 'Participating clinics enter de-identified baseline and 12-week data through a secure form. The institute provides training, data definitions and quarterly reports to each site.' },
    { heading: 'Eligibility for sites', text: 'Verified members who treat at least 10 eligible patients per quarter and can complete a short data-governance agreement.' },
  ],
  discussion: [
    { heading: 'Opening post', text: 'In my clinic about 1 in 5 patients have ApoB and LDL-C pointing in different directions. I now lead with ApoB, but I find it harder to explain. How are others handling discordance, and has anyone had pushback from cardiology colleagues?' },
  ],
}

export const COMMENTS = [
  { author: A.lindqvist, date: '2 days ago', text: 'Similar experience here. I repeat CGM only when the first trial overlaps with illness or travel; otherwise I act on it.' },
  { author: A.chen, date: '1 day ago', text: 'Useful observation. If you can share de-identified data, this would fit the Metabolic Flexibility Registry, and we can look at thresholds across sites.' },
  { author: A.okafor, date: '5 hours ago', text: 'Do you record sleep and activity during the trial? Short sleep alone can explain some of the excursions I see.' },
]
