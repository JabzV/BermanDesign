// Sample data for the My Campus Learn prototype. Nothing here is real learner or catalog data.
import drBermanPhoto from '../../imports/drvbermasdn.png'
import drSarahChenPhoto from '../../imports/kjnd.png'

export type Status = 'done' | 'current' | 'todo' | 'locked'
export type LessonType = 'video' | 'reading' | 'case' | 'quiz'
export type Tone = 'navy' | 'gold' | 'mist'
export type TopicIcon = 'activity' | 'flask' | 'dna' | 'heart' | 'brain' | 'syringe' | 'sparkles' | 'stethoscope' | 'leaf'

export interface Faculty {
  id: string
  name: string
  title: string
  photo?: string
  initials: string
}

export const FACULTY: Record<string, Faculty> = {
  berman: { id: 'berman', name: 'Dr. Dean Berman', title: 'Founder & Medical Director', photo: drBermanPhoto, initials: 'DB' },
  chen: { id: 'chen', name: 'Dr. Sarah Chen', title: 'Director of Research', photo: drSarahChenPhoto, initials: 'SC' },
  torres: { id: 'torres', name: 'Dr. Marcus Torres', title: 'Clinical Faculty', initials: 'MT' },
  nouri: { id: 'nouri', name: 'Dr. Leila Nouri', title: 'Faculty — Aesthetics', initials: 'LN' },
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  minutes: number
  status: Status
  faculty: string
}

export interface Module {
  number: number
  title: string
  summary: string
  status: Status
  icon: TopicIcon
  objectives: string[]
  lessons: Lesson[]
  resources: { title: string; kind: 'PDF' | 'Slides' | 'Protocol'; size: string }[]
  quizId: string
}

function lessons(prefix: string, status: Status, items: [string, LessonType, number, string][]): Lesson[] {
  return items.map(([title, type, minutes, faculty], i) => ({
    id: `${prefix}-${i + 1}`,
    title,
    type,
    minutes,
    faculty,
    status,
  }))
}

const module4Lessons: Lesson[] = [
  { id: 'm4-1', title: 'What Metabolic Flexibility Measures', type: 'video', minutes: 18, status: 'done', faculty: 'berman' },
  { id: 'm4-2', title: 'Substrate Switching: Fed and Fasted States', type: 'video', minutes: 22, status: 'done', faculty: 'berman' },
  { id: 'm4-3', title: 'Reading the Respiratory Exchange Ratio', type: 'reading', minutes: 12, status: 'done', faculty: 'chen' },
  { id: 'm4-4', title: 'Insulin Sensitivity Beyond HOMA-IR', type: 'video', minutes: 25, status: 'done', faculty: 'chen' },
  { id: 'm4-5', title: 'Metabolic Flexibility in Clinical Practice', type: 'video', minutes: 31, status: 'current', faculty: 'berman' },
  { id: 'm4-6', title: 'Case: The Inflexible Endurance Athlete', type: 'case', minutes: 15, status: 'todo', faculty: 'torres' },
  { id: 'm4-7', title: 'Exercise Prescription for Mitochondrial Health', type: 'video', minutes: 20, status: 'todo', faculty: 'torres' },
  { id: 'm4-8', title: 'Nutrition Timing and Flexibility', type: 'reading', minutes: 10, status: 'todo', faculty: 'chen' },
  { id: 'm4-9', title: 'Module 4 Knowledge Check', type: 'quiz', minutes: 15, status: 'todo', faculty: 'berman' },
]

export const PROGRAM = {
  id: 'advanced-certificate',
  title: 'Advanced Certificate in Longevity & Metabolic Medicine',
  shortTitle: 'Advanced Certificate',
  cohort: 'Fall 2026 Cohort',
  progress: 58,
  cmeTotal: 42,
  cmeEarned: 18.5,
  startedOn: 'Aug 4, 2026',
  targetCompletion: 'Feb 2027',
  requirements: [
    { label: 'Complete all 6 modules', detail: '3 of 6 complete', done: false },
    { label: 'Attend 4 Grand Rounds', detail: '4 of 4 attended', done: true },
    { label: 'Pass each module knowledge check', detail: '3 of 6 passed', done: false },
    { label: 'Pass the final assessment (80% or higher)', detail: 'Unlocks after Module 6', done: false },
  ],
  modules: [
    {
      number: 1,
      title: 'Foundations of Longevity Medicine',
      summary: 'The hallmarks of aging and how they translate into clinical practice.',
      status: 'done',
      icon: 'leaf',
      objectives: ['Describe the hallmarks of aging', 'Distinguish lifespan from healthspan outcomes', 'Frame a longevity consult'],
      lessons: lessons('m1', 'done', [
        ['The Hallmarks of Aging', 'video', 24, 'berman'],
        ['Healthspan vs. Lifespan', 'video', 18, 'berman'],
        ['Structuring the Longevity Consult', 'reading', 12, 'chen'],
        ['Module 1 Knowledge Check', 'quiz', 15, 'berman'],
      ]),
      resources: [{ title: 'Longevity Consult Template', kind: 'Protocol', size: '240 KB' }],
      quizId: 'm1-quiz',
    },
    {
      number: 2,
      title: 'Metabolic Health',
      summary: 'Insulin resistance, lipids and inflammation as the core of metabolic risk.',
      status: 'done',
      icon: 'heart',
      objectives: ['Identify early insulin resistance', 'Interpret advanced lipid panels', 'Link inflammation to metabolic risk'],
      lessons: lessons('m2', 'done', [
        ['Insulin Resistance: The Silent Decade', 'video', 26, 'berman'],
        ['Advanced Lipid Interpretation', 'video', 22, 'chen'],
        ['Case: Normal BMI, Abnormal Metabolism', 'case', 14, 'torres'],
        ['Module 2 Knowledge Check', 'quiz', 15, 'berman'],
      ]),
      resources: [{ title: 'Lipid Panel Reference Sheet', kind: 'PDF', size: '1.1 MB' }],
      quizId: 'm2-quiz',
    },
    {
      number: 3,
      title: 'Biomarkers & Biological Age',
      summary: 'Choosing, ordering and interpreting biomarkers and aging clocks.',
      status: 'done',
      icon: 'dna',
      objectives: ['Select a biomarker panel by patient goal', 'Compare epigenetic clocks', 'Communicate results to patients'],
      lessons: lessons('m3', 'done', [
        ['Biomarker Panels That Matter', 'video', 21, 'chen'],
        ['Epigenetic Clocks Compared', 'video', 27, 'chen'],
        ['Explaining Biological Age to Patients', 'reading', 9, 'berman'],
        ['Module 3 Knowledge Check', 'quiz', 15, 'berman'],
      ]),
      resources: [{ title: 'Biomarker Ordering Guide', kind: 'PDF', size: '860 KB' }],
      quizId: 'm3-quiz',
    },
    {
      number: 4,
      title: 'Metabolic Flexibility',
      summary: 'How patients switch between fuels, how to measure it, and how to improve it.',
      status: 'current',
      icon: 'activity',
      objectives: [
        'Define metabolic flexibility and why it predicts outcomes',
        'Interpret RER, insulin sensitivity and CGM data',
        'Build exercise and nutrition plans that restore flexibility',
      ],
      lessons: module4Lessons,
      resources: [
        { title: 'Module 4 Lecture Slides', kind: 'Slides', size: '6.4 MB' },
        { title: 'Metabolic Flexibility Assessment Protocol', kind: 'Protocol', size: '320 KB' },
        { title: 'Key References (14 papers)', kind: 'PDF', size: '2.2 MB' },
      ],
      quizId: 'm4-quiz',
    },
    {
      number: 5,
      title: 'Peptide Medicine',
      summary: 'Evidence, safety and protocols for therapeutic peptides.',
      status: 'locked',
      icon: 'flask',
      objectives: ['Review the evidence base for common peptides', 'Apply safety and sourcing standards'],
      lessons: lessons('m5', 'locked', [
        ['Peptides: Evidence and Hype', 'video', 25, 'torres'],
        ['Safety, Sourcing and Regulation', 'video', 20, 'torres'],
        ['Case: Musculoskeletal Recovery', 'case', 15, 'torres'],
        ['Module 5 Knowledge Check', 'quiz', 15, 'berman'],
      ]),
      resources: [],
      quizId: 'm5-quiz',
    },
    {
      number: 6,
      title: 'Clinical Integration',
      summary: 'Bringing longevity and metabolic care into a sustainable practice.',
      status: 'locked',
      icon: 'stethoscope',
      objectives: ['Design a longevity care pathway', 'Measure outcomes in your practice'],
      lessons: lessons('m6', 'locked', [
        ['Designing a Longevity Care Pathway', 'video', 28, 'berman'],
        ['Measuring Outcomes in Practice', 'video', 19, 'chen'],
        ['Module 6 Knowledge Check', 'quiz', 15, 'berman'],
      ]),
      resources: [],
      quizId: 'm6-quiz',
    },
  ] as Module[],
}

export function findLesson(id: string) {
  for (const module of PROGRAM.modules) {
    const index = module.lessons.findIndex((l) => l.id === id)
    if (index !== -1) return { module, lesson: module.lessons[index], index }
  }
  return null
}

export const LESSON_DETAIL = {
  takeaways: [
    'Metabolic flexibility is the ability to match fuel use to fuel availability; loss of it often precedes abnormal glucose by years.',
    'A rising fasting RER and a blunted post-meal RER shift are early, measurable signs of inflexibility.',
    'Zone 2 training and protein-forward meal timing are the two most reliable levers in clinic.',
    'Re-test after 12 weeks; improvement in flexibility tracks with improvements in visceral fat and triglycerides.',
  ],
  transcript: [
    { time: '00:00', text: 'Welcome back. In this lesson we move from the physiology of fuel switching to what it looks like in a real clinic.' },
    { time: '01:42', text: 'The first question I ask is simple: when this patient is fasted, what are they burning, and when they eat, how quickly do they switch?' },
    { time: '04:15', text: 'Indirect calorimetry gives us the respiratory exchange ratio. A fasting RER close to 0.7 tells us fat oxidation is intact.' },
    { time: '08:30', text: 'Now look at this patient. Normal fasting glucose, normal A1c, but a fasting RER of 0.89. That is a patient who has lost flexibility.' },
    { time: '12:05', text: 'Continuous glucose monitoring adds the other half of the picture: how large and how long the excursions are after a standard meal.' },
    { time: '17:40', text: 'Treatment starts with movement. Zone 2 work, three to four sessions a week, is where I see the most consistent change.' },
  ],
  resources: [
    { title: 'Lecture Slides — Metabolic Flexibility in Practice', kind: 'Slides', size: '4.8 MB' },
    { title: 'RER Interpretation Quick Reference', kind: 'PDF', size: '310 KB' },
    { title: 'Zone 2 Prescription Template', kind: 'Protocol', size: '180 KB' },
  ],
  cme: 0.5,
}

export interface QuizQuestion {
  id: string
  vignette: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export const QUIZ = {
  id: 'm4-quiz',
  title: 'Module 4 Knowledge Check',
  moduleNumber: 4,
  passMark: 80,
  minutes: 15,
  cme: 1,
  questions: [
    {
      id: 'q1',
      vignette: 'A 46-year-old man has a fasting glucose of 92 mg/dL and an A1c of 5.4%. Indirect calorimetry shows a fasting RER of 0.89.',
      question: 'What is the most likely interpretation?',
      options: [
        'Normal metabolic function',
        'Reduced fat oxidation in the fasted state, consistent with metabolic inflexibility',
        'Laboratory error; RER cannot exceed 0.85',
        'Excessive ketone production',
      ],
      answer: 1,
      explanation: 'A fasting RER near 0.7 reflects predominant fat oxidation. A value of 0.89 suggests the patient relies on carbohydrate even when fasted, an early marker of inflexibility despite normal glycemic labs.',
    },
    {
      id: 'q2',
      vignette: 'A patient with metabolic inflexibility asks which single change will help most in the first 12 weeks.',
      question: 'Which intervention has the most consistent evidence?',
      options: [
        'High-intensity intervals only, once weekly',
        'Zone 2 aerobic training three to four times weekly',
        'A 72-hour fast every month',
        'Exogenous ketone supplements',
      ],
      answer: 1,
      explanation: 'Regular Zone 2 training increases mitochondrial density and fat oxidation capacity, and is the most reproducible lever discussed in this module.',
    },
    {
      id: 'q3',
      vignette: 'A CGM shows post-meal glucose peaks of 165 mg/dL lasting more than two hours after a standardized meal.',
      question: 'What does this pattern add to the RER finding?',
      options: [
        'Nothing; CGM and RER measure the same thing',
        'It confirms impaired post-meal glucose handling, the fed-state half of inflexibility',
        'It rules out insulin resistance',
        'It indicates hypoglycemia risk',
      ],
      answer: 1,
      explanation: 'RER describes fuel choice; CGM shows how the body handles a glucose load. Prolonged excursions indicate impaired fed-state switching.',
    },
    {
      id: 'q4',
      vignette: 'After 12 weeks of treatment you re-test a patient.',
      question: 'Which accompanying change best supports true improvement in flexibility?',
      options: [
        'Lower body weight alone',
        'Reduced triglycerides and visceral fat alongside a lower fasting RER',
        'Higher resting heart rate',
        'Increased fasting insulin',
      ],
      answer: 1,
      explanation: 'Improvements in flexibility track with falling triglycerides and visceral fat. Weight alone can change without metabolic improvement.',
    },
    {
      id: 'q5',
      vignette: 'A colleague suggests HOMA-IR is sufficient to assess every patient.',
      question: 'What is the main limitation of relying on HOMA-IR alone?',
      options: [
        'It requires indirect calorimetry',
        'It reflects fasting hepatic insulin resistance and can miss fed-state and muscle dysfunction',
        'It is only valid in children',
        'It cannot be calculated from routine labs',
      ],
      answer: 1,
      explanation: 'HOMA-IR is derived from fasting glucose and insulin. It mainly reflects hepatic insulin resistance and misses post-meal and peripheral (muscle) dysfunction.',
    },
  ] as QuizQuestion[],
}

export interface CatalogItem {
  id: string
  title: string
  faculty: string
  icon: TopicIcon
  tone: Tone
  lessons: number
  hours: number
  progress?: number
  enrolled: boolean
  href?: string
  completedOn?: string
  cme?: number
}

export const COURSES: CatalogItem[] = [
  { id: 'peptides', title: 'Peptide Medicine: Foundations', faculty: 'torres', icon: 'flask', tone: 'gold', lessons: 8, hours: 6, progress: 25, enrolled: true, href: '#/learn/lesson/m4-5', cme: 6 },
  { id: 'glp1', title: 'GLP-1 & Metabolic Management', faculty: 'berman', icon: 'syringe', tone: 'navy', lessons: 10, hours: 8, progress: 70, enrolled: true, href: '#/learn/lesson/m4-5', cme: 8 },
  { id: 'biomarkers', title: 'Biomarkers & Healthy Aging', faculty: 'chen', icon: 'dna', tone: 'mist', lessons: 9, hours: 7, enrolled: false, cme: 7 },
  { id: 'hormones', title: 'Hormone Health Across the Lifespan', faculty: 'chen', icon: 'heart', tone: 'navy', lessons: 8, hours: 6, enrolled: false, cme: 6 },
]

export const MASTERCLASSES: CatalogItem[] = [
  { id: 'mc-biomarkers', title: 'Biomarkers of Healthy Aging', faculty: 'chen', icon: 'dna', tone: 'mist', lessons: 5, hours: 2.5, progress: 80, enrolled: true, href: '#/learn/lesson/m4-5', cme: 2.5 },
  { id: 'mc-glp1', title: 'GLP-1 Fundamentals', faculty: 'berman', icon: 'syringe', tone: 'navy', lessons: 4, hours: 2, enrolled: false, cme: 2 },
  { id: 'mc-metabolic', title: 'Metabolic Health in Primary Care', faculty: 'berman', icon: 'activity', tone: 'gold', lessons: 4, hours: 2, enrolled: false, cme: 2 },
  { id: 'mc-aesthetics', title: 'Regenerative Aesthetics', faculty: 'nouri', icon: 'sparkles', tone: 'mist', lessons: 3, hours: 1.5, enrolled: false, cme: 1.5 },
]

export interface Intensive {
  id: string
  title: string
  faculty: string
  dates: string
  month: string
  day: string
  format: 'Virtual' | 'In person · Miami'
  seatsLeft: number
  registered: boolean
  cme: number
}

export const INTENSIVES: Intensive[] = [
  { id: 'int-glp1', title: 'GLP-1 Complex Cases Intensive', faculty: 'berman', dates: 'Nov 7–8, 2026', month: 'Nov', day: '7', format: 'Virtual', seatsLeft: 0, registered: true, cme: 12 },
  { id: 'int-peptides', title: 'Peptide Protocols Hands-On', faculty: 'torres', dates: 'Jan 16–17, 2027', month: 'Jan', day: '16', format: 'In person · Miami', seatsLeft: 6, registered: false, cme: 14 },
  { id: 'int-biomarkers', title: 'Biomarker Interpretation Workshop', faculty: 'chen', dates: 'Mar 6, 2027', month: 'Mar', day: '6', format: 'Virtual', seatsLeft: 24, registered: false, cme: 7 },
]

export interface SavedItem {
  id: string
  title: string
  source: string
  type: LessonType | 'library'
  minutes: number
  href: string
}

export const SAVED: SavedItem[] = [
  { id: 's1', title: 'Reading the Respiratory Exchange Ratio', source: 'Advanced Certificate · Module 4', type: 'reading', minutes: 12, href: '#/learn/lesson/m4-3' },
  { id: 's2', title: 'Epigenetic Clocks Compared', source: 'Advanced Certificate · Module 3', type: 'video', minutes: 27, href: '#/learn/lesson/m3-2' },
  { id: 's3', title: 'Case: Normal BMI, Abnormal Metabolism', source: 'Advanced Certificate · Module 2', type: 'case', minutes: 14, href: '#/learn/lesson/m2-3' },
  { id: 's4', title: 'Titration Strategies for Complex Patients', source: 'Clinical Library · GLP-1', type: 'library', minutes: 22, href: '#/learn/lesson/m4-5' },
]

export const COMPLETED: { id: string; title: string; kind: string; completedOn: string; cme: number; certificate: boolean; certificateId?: string }[] = [
  { id: 'c1', title: 'GLP-1 Fundamentals', kind: 'Masterclass', completedOn: 'Sep 12, 2026', cme: 2, certificate: true, certificateId: 'glp1-fundamentals' },
  { id: 'c2', title: 'Module 3 · Biomarkers & Biological Age', kind: 'Advanced Certificate', completedOn: 'Sep 28, 2026', cme: 4, certificate: false },
  { id: 'c3', title: 'Module 2 · Metabolic Health', kind: 'Advanced Certificate', completedOn: 'Sep 8, 2026', cme: 4, certificate: false },
  { id: 'c4', title: 'Module 1 · Foundations of Longevity Medicine', kind: 'Advanced Certificate', completedOn: 'Aug 21, 2026', cme: 4, certificate: false },
  { id: 'c5', title: 'Free Webinar: Clinical Updates in Longevity', kind: 'Free Education', completedOn: 'Jul 30, 2026', cme: 1, certificate: true, certificateId: 'clinical-updates-longevity' },
]
