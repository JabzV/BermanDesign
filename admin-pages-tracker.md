# Admin — Pages Tracker

Platform administration for institute staff. Source: [BERMAN_INSTITUTE_SYSTEM_REFERENCE.md](BERMAN_INSTITUTE_SYSTEM_REFERENCE.md) §4.5 and §9. Frontend design showcase only, sample data. Automations are intentionally excluded from Admin navigation (§4.5).

## Shared / Layout
- [ ] **Admin Shell** — Sidebar with all 14 modules, top bar, role badge, and a switch back to My Campus
- [ ] **Admin Dashboard** — Overview of pending applications, verifications, enrollments, revenue, and system alerts
- [ ] **Global Admin Search** — Find users, programs, courses, applications, and invoices
- [ ] **Data Table Pattern** — Shared list view: search, filters, sorting, bulk actions, pagination, empty state

## Users
- [ ] **All Users** — Searchable table of learners, faculty, and staff with status and role
- [ ] **User Detail** — Profile, enrollments, credentials, activity, notes, and account actions
- [ ] **User Permissions** — Per-user role assignment and permission overrides

## Roles
- [ ] **Role Management** — List of roles (Learner, Member, Faculty, Editor, Admin) and who holds them
- [ ] **Role Permissions** — Permission matrix per role across modules
- [ ] **Access Control** — Content and area access rules (e.g. verified-only sections)

## Applications
- [ ] **Program Applications** — Queue of Advanced Certificate applications by status
- [ ] **Application Review** — Single application: eligibility, professional info, documents, reviewer notes
- [ ] **Approvals** — Accept, waitlist, or decline with message; sends to payment and enrollment

## Verification
- [ ] **Verification Queue** — Pending licence, identity, and board-certification checks
- [ ] **Verification Review** — Document viewer with checks, approve / request changes / reject
- [ ] **Status Management** — Expiring licences, suspended and lapsed verifications

## Programs
- [ ] **Program Management** — List of professional programs and cohorts
- [ ] **Program Editor** — Program details, modules, requirements, and credential awarded
- [ ] **Curriculum Builder** — Order modules and lessons, set unlock rules and assessments
- [ ] **Pricing** — Program pricing, cohorts, discounts, and payment plans

## Courses
- [ ] **Course Management** — Certificate courses, masterclasses, and intensives with status
- [ ] **Course Editor** — Course details, lessons, faculty, CME, and publishing
- [ ] **Content Library** — Media and documents used across courses and the Clinical Library
- [ ] **Course Settings** — Visibility, prerequisites, enrollment limits, and completion rules

## Faculty
- [ ] **Faculty Management** — Faculty list with courses, sessions, and status
- [ ] **Faculty Detail** — Profile, assigned courses, Grand Rounds, and review duties
- [ ] **Faculty Invitations** — Invite new faculty and track pending invitations

## Assessments
- [ ] **Quiz Management** — Knowledge checks and final assessments with pass marks
- [ ] **Assessment Editor** — Question bank, clinical vignettes, answers, and explanations
- [ ] **Assignments** — Submitted assignments awaiting grading
- [ ] **Grading** — Grade a submission with rubric and feedback; results overview

## Certificates
- [ ] **Certificate Design** — Certificate templates with live preview
- [ ] **Issuance Rules** — When certificates are issued (completion, score, attendance)
- [ ] **Issued Certificates & Verification** — Issued credentials, reissue, revoke, verification log

## Events
- [ ] **Events List** — Grand Rounds and webinars calendar and list
- [ ] **Event Editor** — Session details, faculty, agenda, registration, and CME
- [ ] **Event Attendance** — Registrations, live attendance, and CME eligibility

## Community
- [ ] **Discussion Management** — Threads across Network and Research with activity
- [ ] **Moderation Queue** — Reported posts and patient-identifier flags with actions
- [ ] **Member Directory Admin** — Directory visibility and member listing controls

## Memberships
- [ ] **Membership Plans** — Plans and their status
- [ ] **Plan Benefits** — Benefits and access included per plan
- [ ] **Enrollment Management** — Active members, renewals, lapses, and manual enrollment

## Payments
- [ ] **Transactions** — All payments with status, filters, and export
- [ ] **Transaction Detail & Refunds** — Single payment, invoice, and refund flow
- [ ] **Billing Settings** — Tax, invoice details, currencies, and payment provider

## Analytics
- [ ] **User Analytics** — Sign-ups, active learners, verification funnel, retention
- [ ] **Course Analytics** — Enrollments, completion, assessment scores, drop-off by lesson
- [ ] **Engagement Reports** — Grand Rounds attendance, community activity, research participation

## Integrations
- [ ] **Third-Party Tools** — Connected services (LearnWorlds, CRM, licence verification, video) and status
- [ ] **API Keys** — Create, view, and revoke API keys
- [ ] **Webhooks** — Endpoints, subscribed events, and delivery log
