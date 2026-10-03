# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Verified healthcare professionals (physicians, NPs, PAs and allied clinicians) building expertise in longevity medicine, metabolic health, peptide medicine, GLP-1 therapies, biomarkers, hormones and aesthetics. They study **mostly on their phones**, often in short windows between patients; desktop/laptop is used for longer, focused sessions. Secondary audiences: faculty, research/editorial staff and admins (separate portals).

## Product Purpose
Berman Institute is a digital medical education institute. It trains clinicians through structured professional programs, short courses, assessments and credentials, then keeps them engaged through faculty-led Grand Rounds, a clinical library, research content and a professional network inside a personalized **My Campus**. Lifecycle: Discover → Learn → Complete → Earn Credential → Join Network → Participate → Contribute → Research → Teach. Success is a clinician who completes a program, earns a credential, and stays active in the institute afterwards.

## Positioning
"I joined a professional medical institute, not an online course website." Education is tied to credentials, live faculty sessions (Grand Rounds), research and a verified professional network led by Dr. Dean Berman and guest faculty.

## Operating Context
- Product hierarchy: Free Clinical Updates → Free Webinars → Masterclasses → Clinical Intensives → Certificate Courses → Advanced Certificate Programs → Professional Membership → Professional Network → Faculty / Contributor Pathway → Research Collaboration.
- Flagship program: Advanced Certificate in Longevity & Metabolic Medicine (6 modules, Grand Rounds, assessments, final assessment, credential).
- Grand Rounds: monthly live expert sessions (research update, case, faculty discussion, Q&A; recording goes to the Clinical Library).
- Lessons are primarily recorded faculty video lectures with transcripts, downloadable materials and takeaways.
- CME / CE credits are tracked per learner.
- LearnWorlds is the learning engine (users, enrollments, courses, progress, assessments, certificates, community, membership). CRM, license verification, research management and Berman AI live in external systems; the learner must still experience one coherent product.

## Capabilities and Constraints
- Surfaces: Public Website, My Campus, Faculty Portal, Research / Editorial Portal, Admin (see `BERMAN_INSTITUTE_SYSTEM_REFERENCE.md`).
- Mobile My Campus exposes exactly five primary nav items: Home, Learn, Research, Network, Profile.
- `berman-design` is a frontend-only design prototype (React 19, Vite, Tailwind v4); all learner, course and program data is sample data.
- Open: real course catalog, pricing, CME accreditation body and credit values, faculty roster beyond named examples.

## Brand Commitments
- Name: Berman Institute. Founder / Medical Director: Dr. Dean Berman.
- Logo: `src/imports/image-3.png`.
- Voice: institutional, clinical, evidence-led; not gamified or consumer-casual.

## Evidence on Hand
- Real assets: logo, Dr. Dean Berman photo (`src/imports/drvbermasdn.png`), faculty photo (`src/imports/kjnd.png`), lecture photography (`src/imports/asdff.png`, `src/imports/aasagfg.png`).
- All learner names, progress, course titles, quiz questions and statistics in My Campus are sample data. Do not present invented accreditation, outcomes or testimonials as real.

## Product Principles
1. The user experiences Berman Institute, not a generic LMS.
2. Every learning surface points toward the next step: short courses lead to deeper programs, programs lead to credentials and membership.
3. Credentials and verification carry professional weight; show them with precision, never as game rewards.
4. Live faculty education and research keep the institute current; surface them alongside coursework.
5. Respect a clinician's time: resume in one tap, short sessions, clear progress.
