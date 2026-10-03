// Sample data for the Grand Rounds prototype. Sessions, guests and questions are illustrative.
import { useSyncExternalStore } from 'react'
import type { TopicKey } from './library'

export interface Guest {
  name: string
  title: string
  initials: string
}

export interface Session {
  id: string
  title: string
  summary: string
  topic: TopicKey
  host: string
  guests: Guest[]
  weekday: string
  month: string
  day: string
  time: string
  countdown: string
  minutes: number
  cme: number
  registered: number
  agenda: { label: string; minutes: number; detail: string }[]
  prep: { title: string; kind: string }[]
}

const AGENDA = (topic: string) => [
  { label: 'Research update', minutes: 15, detail: `New evidence in ${topic} and what it changes in practice.` },
  { label: 'Clinical case presentation', minutes: 20, detail: 'A real, de-identified case presented by faculty.' },
  { label: 'Faculty discussion', minutes: 20, detail: 'Dr. Berman and guest faculty work through the decisions.' },
  { label: 'Q&A', minutes: 20, detail: 'Your questions, submitted in advance or live.' },
]

export const SESSIONS: Session[] = [
  {
    id: 'gr-oct-9',
    title: 'GLP-1 Beyond Weight Loss: Complex Clinical Cases',
    summary: 'Cardiometabolic outcomes, sarcopenia risk and three difficult titration cases, with live case review and an evidence update.',
    topic: 'glp1',
    host: 'berman',
    guests: [{ name: 'Dr. Elena Ruiz', title: 'Guest Faculty · Obesity Medicine', initials: 'ER' }],
    weekday: 'Thursday',
    month: 'Oct',
    day: '9',
    time: '7:00 PM ET',
    countdown: 'In 6 days',
    minutes: 75,
    cme: 1.5,
    registered: 412,
    agenda: AGENDA('GLP-1 therapy'),
    prep: [
      { title: 'Pre-read: Cardiometabolic outcome trials summary', kind: 'PDF · 6 pages' },
      { title: 'Case packet: three titration cases', kind: 'PDF · 4 pages' },
    ],
  },
  {
    id: 'gr-oct-24',
    title: 'Peptides in Musculoskeletal Recovery',
    summary: 'What the evidence supports, sourcing and safety standards, and a post-surgical case.',
    topic: 'peptides',
    host: 'torres',
    guests: [],
    weekday: 'Friday',
    month: 'Oct',
    day: '24',
    time: '12:00 PM ET',
    countdown: 'In 3 weeks',
    minutes: 60,
    cme: 1,
    registered: 238,
    agenda: AGENDA('peptide medicine'),
    prep: [{ title: 'Pre-read: Peptide evidence table', kind: 'PDF · 3 pages' }],
  },
  {
    id: 'gr-nov-21',
    title: 'Biomarker Panels: What to Order and When',
    summary: 'Building a rational biomarker panel by patient goal, and interpreting discordant results.',
    topic: 'biomarkers',
    host: 'chen',
    guests: [{ name: 'Dr. Tomás Alvarez', title: 'Guest Faculty · Laboratory Medicine', initials: 'TA' }],
    weekday: 'Friday',
    month: 'Nov',
    day: '21',
    time: '7:00 PM ET',
    countdown: 'In 7 weeks',
    minutes: 75,
    cme: 1.5,
    registered: 156,
    agenda: AGENDA('biomarker testing'),
    prep: [],
  },
  {
    id: 'gr-dec-12',
    title: 'Hormone Therapy in Metabolically High-Risk Patients',
    summary: 'HRT decisions when insulin resistance, ApoB and cardiovascular history are in the picture.',
    topic: 'hormones',
    host: 'chen',
    guests: [{ name: 'Dr. Naomi Feld', title: 'Guest Faculty · Gynecology', initials: 'NF' }],
    weekday: 'Friday',
    month: 'Dec',
    day: '12',
    time: '7:00 PM ET',
    countdown: 'In 10 weeks',
    minutes: 75,
    cme: 1.5,
    registered: 74,
    agenda: AGENDA('hormone therapy'),
    prep: [],
  },
]

export const findSession = (id: string) => SESSIONS.find((s) => s.id === id)

export const LIVE_QUESTIONS = [
  { id: 'q1', author: 'Dr. Priya Patel', specialty: 'Family Medicine', text: 'For patients over 65, do you start resistance training before the first dose or alongside it?', votes: 34, answered: true },
  { id: 'q2', author: 'Dr. James Okafor', specialty: 'Cardiology', text: 'How do you handle titration in patients already on SGLT2 inhibitors with low baseline BMI?', votes: 21, answered: false },
  { id: 'q3', author: 'Dr. Emma Lindqvist', specialty: 'Endocrinology', text: 'Is grip strength enough as a muscle-function check, or do you use chair-stand testing too?', votes: 17, answered: false },
  { id: 'q4', author: 'Anonymous member', specialty: 'Internal Medicine', text: 'Any data on tapering versus abrupt discontinuation for weight regain?', votes: 9, answered: false },
]

// Tiny in-memory store so registration shows consistently across pages (prototype only).
const registered = new Set<string>()
const listeners = new Set<() => void>()
let version = 0

export function registerFor(id: string) {
  registered.add(id)
  version++
  listeners.forEach((l) => l())
}

export function useRegistered(id: string) {
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => version,
  )
  return registered.has(id)
}
