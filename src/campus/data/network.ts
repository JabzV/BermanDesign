// Sample data for the Network prototype. Members, posts and organizations are fictional.
import type { TopicKey } from './library'

export interface Member {
  id: string
  name: string
  initials: string
  specialty: string
  organization: string
  location: string
  /** faculty id from learn data, when the member is faculty */
  faculty?: string
  standing: 'Faculty' | 'Graduate' | 'Fall 2026 Cohort' | 'Member'
  verified: boolean
  bio: string
  interests: TopicKey[]
  joined: string
}

export const MEMBERS: Member[] = [
  { id: 'berman', name: 'Dr. Dean Berman', initials: 'DB', specialty: 'Longevity Medicine', organization: 'Berman Institute', location: 'Miami, FL', faculty: 'berman', standing: 'Faculty', verified: true, bio: 'Founder and Medical Director of the Berman Institute. Focused on metabolic health, GLP-1 therapy and building longevity care into everyday practice.', interests: ['longevity', 'metabolic', 'glp1'], joined: '2022' },
  { id: 'chen', name: 'Dr. Sarah Chen', initials: 'SC', specialty: 'Research & Biomarkers', organization: 'Berman Institute', location: 'Boston, MA', faculty: 'chen', standing: 'Faculty', verified: true, bio: 'Director of Research. Leads the Metabolic Flexibility Registry and the monthly Journal Club.', interests: ['biomarkers', 'hormones', 'metabolic'], joined: '2022' },
  { id: 'torres', name: 'Dr. Marcus Torres', initials: 'MT', specialty: 'Sports & Regenerative Medicine', organization: 'Berman Institute', location: 'Austin, TX', faculty: 'torres', standing: 'Faculty', verified: true, bio: 'Clinical faculty for peptide medicine and exercise prescription.', interests: ['peptides', 'metabolic'], joined: '2023' },
  { id: 'reyes', name: 'Dr. Ana Reyes', initials: 'AR', specialty: 'Internal Medicine', organization: 'Bayview Medical Group', location: 'San Diego, CA', standing: 'Fall 2026 Cohort', verified: true, bio: 'Internist building a metabolic health clinic within a primary care group.', interests: ['metabolic', 'glp1', 'biomarkers'], joined: '2026' },
  { id: 'patel', name: 'Dr. Priya Patel', initials: 'PP', specialty: 'Family Medicine', organization: 'Northside Family Health', location: 'Chicago, IL', standing: 'Graduate', verified: true, bio: 'Family physician using CGM and lifestyle prescriptions with lean, insulin-resistant patients.', interests: ['metabolic', 'longevity'], joined: '2024' },
  { id: 'okafor', name: 'Dr. James Okafor', initials: 'JO', specialty: 'Cardiology', organization: 'Lakeshore Heart Institute', location: 'Cleveland, OH', standing: 'Graduate', verified: true, bio: 'Preventive cardiologist interested in ApoB, Lp(a) and lifestyle medicine.', interests: ['biomarkers', 'metabolic'], joined: '2024' },
  { id: 'lindqvist', name: 'Dr. Emma Lindqvist', initials: 'EL', specialty: 'Endocrinology', organization: 'Fjord Endocrine Clinic', location: 'Seattle, WA', standing: 'Graduate', verified: true, bio: 'Endocrinologist focused on GLP-1 therapy and lean mass preservation.', interests: ['glp1', 'hormones'], joined: '2025' },
  { id: 'nguyen', name: 'Dr. Linh Nguyen', initials: 'LN', specialty: 'Internal Medicine', organization: 'Harbor Primary Care', location: 'Portland, OR', standing: 'Fall 2026 Cohort', verified: true, bio: 'Primary care internist starting a longevity consult service.', interests: ['longevity', 'biomarkers'], joined: '2026' },
  { id: 'adeyemi', name: 'Tolu Adeyemi, NP', initials: 'TA', specialty: 'Nurse Practitioner', organization: 'Vitality Health Partners', location: 'Atlanta, GA', standing: 'Fall 2026 Cohort', verified: true, bio: 'NP running GLP-1 and metabolic programs for a multi-site practice.', interests: ['glp1', 'metabolic'], joined: '2026' },
  { id: 'rossi', name: 'Dr. Marco Rossi', initials: 'MR', specialty: 'Sports Medicine', organization: 'Peak Performance Clinic', location: 'Denver, CO', standing: 'Fall 2026 Cohort', verified: true, bio: 'Sports physician interested in peptides, recovery and metabolic flexibility in athletes.', interests: ['peptides', 'metabolic'], joined: '2026' },
  { id: 'kaur', name: 'Dr. Simran Kaur', initials: 'SK', specialty: 'Obstetrics & Gynecology', organization: 'Women’s Health Collective', location: 'Toronto, ON', standing: 'Member', verified: true, bio: 'OB-GYN focused on the menopausal transition and metabolic risk.', interests: ['hormones', 'metabolic'], joined: '2025' },
  { id: 'brooks', name: 'Hannah Brooks, PA-C', initials: 'HB', specialty: 'Physician Assistant', organization: 'Clearwater Aesthetics', location: 'Tampa, FL', standing: 'Fall 2026 Cohort', verified: false, bio: 'PA in aesthetic and regenerative medicine.', interests: ['aesthetics', 'peptides'], joined: '2026' },
]

export const findMember = (id: string) => MEMBERS.find((m) => m.id === id)
export const ME = 'reyes'

export type ThreadKind = 'community' | 'clinical' | 'journal-club' | 'faculty-question'

export const THREAD_KIND_LABEL: Record<ThreadKind, string> = {
  community: 'Community',
  clinical: 'Clinical discussion',
  'journal-club': 'Journal Club',
  'faculty-question': 'Ask the Faculty',
}

export interface Thread {
  id: string
  kind: ThreadKind
  title: string
  body: string
  author: string
  topic: TopicKey
  date: string
  replies: number
  helpful: number
  cohort?: boolean
  pinned?: boolean
  /** faculty question */
  answeredBy?: string
  answer?: string
  anonymous?: boolean
  /** journal club */
  session?: string
}

export const THREADS: Thread[] = [
  { id: 't-welcome', kind: 'community', title: 'Welcome, Fall 2026 cohort: introduce yourself', body: 'Share your specialty, where you practice and what you hope to change in your clinic by the end of the program.', author: 'chen', topic: 'longevity', date: 'Aug 4', replies: 31, helpful: 44, cohort: true, pinned: true },
  { id: 't-cgm-billing', kind: 'community', title: 'How are you structuring CGM trials for non-diabetic patients?', body: 'Interested in how others handle device sourcing, interpretation visits and follow-up. Do you bundle it into a program or bill per visit?', author: 'nguyen', topic: 'metabolic', date: '2h ago', replies: 14, helpful: 22, cohort: true },
  { id: 't-study-group', kind: 'community', title: 'Module 4 study group: Thursday 8 PM ET', body: 'A few of us are meeting to work through the RER and CGM cases before the knowledge check. All cohort members welcome.', author: 'adeyemi', topic: 'metabolic', date: 'Yesterday', replies: 9, helpful: 15, cohort: true },
  { id: 't-longevity-consult', kind: 'community', title: 'What does your first longevity consult include?', body: 'Trying to fit history, labs review and a plan into 60 minutes. Curious how others structure the first visit and what they defer.', author: 'patel', topic: 'longevity', date: '3 days ago', replies: 27, helpful: 39 },
  { id: 't-case-lean', kind: 'clinical', title: 'Lean 34-year-old with fasting insulin 18 and normal A1c: next steps?', body: 'BMI 21, active, but fatigue and TG 190. A1c 5.3. Family history of T2D in both parents. CGM shows peaks to 175. Would you add indirect calorimetry or treat empirically?', author: 'okafor', topic: 'metabolic', date: '5h ago', replies: 18, helpful: 26 },
  { id: 't-case-glp1-gi', kind: 'clinical', title: 'Persistent nausea at the second dose step: slow down or switch?', body: 'Patient tolerated the starting dose well but has had two weeks of nausea since stepping up. Weight loss is on track. What is your threshold for holding versus switching agents?', author: 'lindqvist', topic: 'glp1', date: 'Yesterday', replies: 23, helpful: 31 },
  { id: 't-case-hrt', kind: 'clinical', title: 'Perimenopausal patient with rising ApoB: HRT first or lipid therapy first?', body: '49-year-old, ApoB 125 up from 98 over two years, severe vasomotor symptoms, no CVD history. How are you sequencing?', author: 'kaur', topic: 'hormones', date: '2 days ago', replies: 16, helpful: 20 },
  { id: 't-case-peptide', kind: 'clinical', title: 'Documenting peptide prescriptions: what do your consent forms cover?', body: 'Reviewing our consent process for off-label peptides. What do you include about evidence level, sourcing and adverse event reporting?', author: 'rossi', topic: 'peptides', date: '4 days ago', replies: 12, helpful: 17 },
  { id: 't-jc-lean-1', kind: 'journal-club', title: 'Pre-session: is DEXA lean mass a fair proxy for muscle function?', body: 'Before Thursday: the paper reports lean mass, not strength. Should we be measuring grip or chair-stand instead?', author: 'chen', topic: 'glp1', date: 'Today', replies: 11, helpful: 19, session: 'Oct 16 · Lean Mass Loss on GLP-1 Agonists' },
  { id: 't-jc-lean-2', kind: 'journal-club', title: 'Methods question: how was "lean mass" defined in the sub-study?', body: 'The supplement suggests appendicular lean mass was used for some analyses and total lean mass for others. Did anyone else notice?', author: 'okafor', topic: 'glp1', date: 'Yesterday', replies: 7, helpful: 9, session: 'Oct 16 · Lean Mass Loss on GLP-1 Agonists' },
  { id: 't-jc-clocks-1', kind: 'journal-club', title: 'Follow-up: which clock would you actually order?', body: 'After last month’s session, curious what members have changed. Has anyone stopped ordering first-generation clocks?', author: 'patel', topic: 'biomarkers', date: 'Sep 20', replies: 24, helpful: 30, session: 'Sep 18 · Epigenetic Clocks: Ready for the Clinic?' },
  { id: 't-jc-zone2-1', kind: 'journal-club', title: 'Zone 2 by heart rate or by lactate?', body: 'The paper used lactate thresholds. In clinic I use heart rate and talk test. How far off are we?', author: 'rossi', topic: 'metabolic', date: 'Aug 22', replies: 19, helpful: 21, session: 'Aug 21 · Zone 2 Training and Fat Oxidation' },
  { id: 't-fq-1', kind: 'faculty-question', title: 'When do you re-test biological age after an intervention?', body: 'Patients want to see change quickly. What interval do you recommend, and do you use the same vendor?', author: 'nguyen', topic: 'biomarkers', date: 'Sep 26', replies: 6, helpful: 28, answeredBy: 'chen', answer: 'No sooner than 6 months, ideally 12, and always with the same vendor and clock. Test–retest variability can exceed the change you are trying to measure, so pair it with conventional markers that move faster.' },
  { id: 't-fq-2', kind: 'faculty-question', title: 'Protein targets for older adults on GLP-1: weight-based or lean-mass-based?', body: 'For a 70 kg patient losing weight, should the protein target follow current weight, goal weight or estimated lean mass?', author: 'adeyemi', topic: 'glp1', date: 'Sep 24', replies: 4, helpful: 33, answeredBy: 'berman', answer: 'I use goal or adjusted body weight, at 1.2–1.6 g/kg, and spread it across three meals. For older adults I lean to the higher end and pair it with resistance training from week one.' },
  { id: 't-fq-3', kind: 'faculty-question', title: 'Is there a role for BPC-157 in tendinopathy outside of trials?', body: 'Patients ask about it constantly. How do you frame the evidence?', author: 'rossi', topic: 'peptides', date: 'Sep 30', replies: 1, helpful: 12 },
  { id: 't-fq-4', kind: 'faculty-question', title: 'How do you explain discordant ApoB and LDL-C to patients?', body: 'I struggle to explain why ApoB matters when LDL-C looks fine.', author: 'reyes', topic: 'biomarkers', date: 'Oct 1', replies: 0, helpful: 5, anonymous: true },
]

export const findThread = (id: string) => THREADS.find((t) => t.id === id)

export const REPLIES = [
  { author: 'patel', date: '1h ago', text: 'I bundle it: two-week CGM, an interpretation visit and a 12-week re-check. Patients understand the value better as a program than as separate visits.', helpful: 12 },
  { author: 'chen', date: '45m ago', text: 'Whatever structure you use, write down the thresholds you act on before you start. It makes the interpretation visit far more consistent across clinicians.', helpful: 18, faculty: true },
  { author: 'okafor', date: '20m ago', text: 'We source devices through the practice and include them in the program fee. It removed a lot of friction with pharmacies.', helpful: 4 },
]

export const COHORT = {
  name: 'Fall 2026 Cohort',
  program: 'Advanced Certificate in Longevity & Metabolic Medicine',
  members: 38,
  started: 'Aug 4, 2026',
  lead: 'chen',
  events: [
    { title: 'Module 4 study group', when: 'Thu, Oct 9 · 8:00 PM ET', host: 'Tolu Adeyemi, NP' },
    { title: 'Cohort office hours with Dr. Chen', when: 'Tue, Oct 14 · 12:00 PM ET', host: 'Dr. Sarah Chen' },
  ],
}
