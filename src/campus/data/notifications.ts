// Sample notifications for the prototype.
export type NotificationKind = 'grand-rounds' | 'reply' | 'faculty' | 'credential' | 'program' | 'research' | 'cohort'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  time: string
  group: 'Today' | 'Earlier this week' | 'Older'
  href: string
  unread: boolean
}

export const NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', kind: 'grand-rounds', title: 'Grand Rounds in 6 days', body: 'GLP-1 Beyond Weight Loss: Complex Clinical Cases · Thu, Oct 9 at 7:00 PM ET', time: '1h ago', group: 'Today', href: '#/grand-rounds/session/gr-oct-9', unread: true },
  { id: 'n2', kind: 'reply', title: 'Dr. Sarah Chen replied to your discussion', body: '“Whatever structure you use, write down the thresholds you act on before you start…”', time: '3h ago', group: 'Today', href: '#/network/thread/t-cgm-billing', unread: true },
  { id: 'n3', kind: 'program', title: 'Module 4 knowledge check unlocks soon', body: 'Finish 4 more lessons in Metabolic Flexibility to take it for credit.', time: '5h ago', group: 'Today', href: '#/learn/program/advanced-certificate/module/4', unread: true },
  { id: 'n4', kind: 'faculty', title: 'Faculty answered a question you follow', body: 'Dr. Dean Berman on protein targets for older adults on GLP-1.', time: 'Yesterday', group: 'Earlier this week', href: '#/network/thread/t-fq-2', unread: false },
  { id: 'n5', kind: 'research', title: 'New Journal Club session', body: 'Lean Mass Loss on GLP-1 Agonists · Oct 16. Pre-reading is available.', time: 'Oct 1', group: 'Earlier this week', href: '#/research/item/jc-oct', unread: false },
  { id: 'n6', kind: 'cohort', title: 'Module 4 study group this Thursday', body: 'Tolu Adeyemi, NP invited the Fall 2026 cohort.', time: 'Sep 30', group: 'Earlier this week', href: '#/network/cohort', unread: false },
  { id: 'n7', kind: 'credential', title: '1.5 CME credits added', body: 'Grand Rounds replay: Biological Age Clocks in Practice.', time: 'Sep 20', group: 'Older', href: '#/credentials/cme', unread: false },
  { id: 'n8', kind: 'credential', title: 'Certificate issued', body: 'GLP-1 Fundamentals · Certificate of Completion.', time: 'Sep 12', group: 'Older', href: '#/credentials/certificate/glp1-fundamentals', unread: false },
]
