import { useEffect, useRef, useState } from 'react'
import { Camera, Eye, Trash2 } from 'lucide-react'
import { Card, Switch, inputClass, buttonSecondary } from '../ui'
import { TOPICS, type TopicKey } from '../data/library'
import { ProfileLayout, SectionTitle, SaveBar, FieldError, Row, useToast } from './parts'
import { cn } from '../../lib/utils'

const SPECIALTIES = ['Internal Medicine', 'Family Medicine', 'Cardiology', 'Endocrinology', 'Obstetrics & Gynecology', 'Sports Medicine', 'Dermatology', 'Nurse Practitioner', 'Physician Assistant', 'Other']
const BIO_MAX = 400

const INITIAL = {
  prefix: 'Dr.',
  firstName: 'Ana',
  lastName: 'Reyes',
  credentials: 'MD',
  specialty: 'Internal Medicine',
  title: 'Internist, Metabolic Health Lead',
  organization: 'Bayview Medical Group',
  location: 'San Diego, CA',
  bio: 'Internist building a metabolic health clinic within a primary care group.',
  interests: ['metabolic', 'glp1', 'biomarkers'] as TopicKey[],
  inDirectory: true,
  showOrganization: true,
}
type Profile = typeof INITIAL

export default function ProfessionalProfile({ onSignOut }: { onSignOut: () => void }) {
  const [saved, setSaved] = useState<Profile>(INITIAL)
  const [form, setForm] = useState<Profile>(INITIAL)
  const [photo, setPhoto] = useState<string | null>(null)
  const [tried, setTried] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { show, toast } = useToast()

  useEffect(() => () => void (photo && URL.revokeObjectURL(photo)), [photo])

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setForm((f) => ({ ...f, [k]: v }))
  const dirty = JSON.stringify(form) !== JSON.stringify(saved)
  const errors = {
    firstName: !form.firstName.trim() ? 'Enter your first name.' : '',
    lastName: !form.lastName.trim() ? 'Enter your last name.' : '',
    bio: form.bio.length > BIO_MAX ? `Shorten your bio to ${BIO_MAX} characters.` : '',
  }
  const hasErrors = Object.values(errors).some(Boolean)

  const save = () => {
    setTried(true)
    if (hasErrors) {
      document.getElementById(Object.entries(errors).find(([, v]) => v)![0])?.focus()
      return
    }
    setSaved(form)
    setTried(false)
    show('Profile saved')
  }

  const toggleInterest = (t: TopicKey) => set('interests', form.interests.includes(t) ? form.interests.filter((i) => i !== t) : [...form.interests, t])
  const initials = `${form.firstName[0] ?? ''}${form.lastName[0] ?? ''}`.toUpperCase()
  const err = (k: keyof typeof errors) => (tried ? errors[k] : '')

  return (
    <ProfileLayout section="profile" onSignOut={onSignOut}>
      <SectionTitle
        title="Professional Profile"
        description="How you appear to faculty and verified members across My Campus."
        action={
          <a href="#/network/member/reyes" className={cn(buttonSecondary, 'self-start')}>
            <Eye className="w-4 h-4" /> View public profile
          </a>
        }
      />

      <div className="flex flex-col gap-5">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-5">
            {photo ? (
              <img src={photo} alt="Profile photo preview" className="w-20 h-20 rounded-full object-cover shrink-0" />
            ) : (
              <span className="w-20 h-20 rounded-full bg-[#0d2147] text-[#e2c575] font-serif text-2xl flex items-center justify-center shrink-0">{initials}</span>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                id="photo"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setPhoto(URL.createObjectURL(file))
                }}
              />
              <button type="button" onClick={() => fileRef.current?.click()} className={buttonSecondary}>
                <Camera className="w-4 h-4" /> {photo ? 'Change photo' : 'Upload photo'}
              </button>
              {photo && (
                <button type="button" onClick={() => setPhoto(null)} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-full text-sm text-[#b04848] hover:bg-[#fcf1f1] transition-colors">
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-[#5a6a84] mt-3">A clear, professional headshot. JPG or PNG, at least 400 × 400 px.</p>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="font-serif text-lg">Name and credentials</h3>
          <div className="mt-4 grid sm:grid-cols-[100px_1fr_1fr] gap-4">
            <div>
              <label htmlFor="prefix" className="text-sm font-semibold">
                Prefix
              </label>
              <select id="prefix" value={form.prefix} onChange={(e) => set('prefix', e.target.value)} className={cn(inputClass(), 'mt-2')}>
                {['Dr.', 'Prof.', 'None'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="firstName" className="text-sm font-semibold">
                First name
              </label>
              <input id="firstName" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} aria-invalid={!!err('firstName')} aria-describedby={err('firstName') ? 'firstName-error' : undefined} className={cn(inputClass(!!err('firstName')), 'mt-2')} />
              {err('firstName') && <FieldError id="firstName-error">{err('firstName')}</FieldError>}
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-semibold">
                Last name
              </label>
              <input id="lastName" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} aria-invalid={!!err('lastName')} aria-describedby={err('lastName') ? 'lastName-error' : undefined} className={cn(inputClass(!!err('lastName')), 'mt-2')} />
              {err('lastName') && <FieldError id="lastName-error">{err('lastName')}</FieldError>}
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="credentials" className="text-sm font-semibold">
                Post-nominal credentials
              </label>
              <input id="credentials" value={form.credentials} onChange={(e) => set('credentials', e.target.value)} placeholder="e.g. MD, FACP" className={cn(inputClass(), 'mt-2')} />
            </div>
            <div>
              <label htmlFor="specialty" className="text-sm font-semibold">
                Specialty
              </label>
              <select id="specialty" value={form.specialty} onChange={(e) => set('specialty', e.target.value)} className={cn(inputClass(), 'mt-2')}>
                {SPECIALTIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="font-serif text-lg">Practice</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="text-sm font-semibold">
                Role
              </label>
              <input id="title" value={form.title} onChange={(e) => set('title', e.target.value)} className={cn(inputClass(), 'mt-2')} />
            </div>
            <div>
              <label htmlFor="organization" className="text-sm font-semibold">
                Organization
              </label>
              <input id="organization" value={form.organization} onChange={(e) => set('organization', e.target.value)} className={cn(inputClass(), 'mt-2')} />
            </div>
            <div>
              <label htmlFor="location" className="text-sm font-semibold">
                City and state
              </label>
              <input id="location" value={form.location} onChange={(e) => set('location', e.target.value)} className={cn(inputClass(), 'mt-2')} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="text-sm font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => set('bio', e.target.value)}
                rows={4}
                aria-invalid={!!err('bio')}
                aria-describedby="bio-count"
                className={cn(inputClass(!!err('bio')), 'mt-2 py-3 leading-relaxed resize-y')}
              />
              <div className="flex justify-between gap-3">
                {err('bio') ? <FieldError id="bio-error">{err('bio')}</FieldError> : <span />}
                <p id="bio-count" className={cn('text-xs mt-1 tabular-nums', form.bio.length > BIO_MAX ? 'text-[#b04848]' : 'text-[#5a6a84]')}>
                  {form.bio.length} / {BIO_MAX}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="font-serif text-lg">Areas of interest</h3>
          <p className="text-sm text-[#5a6a84] mt-1">Used to recommend courses, research and discussions.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const on = form.interests.includes(t.key)
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => toggleInterest(t.key)}
                  aria-pressed={on}
                  className={cn('min-h-10 px-4 rounded-full text-sm transition-colors', on ? 'bg-[#0d2147] text-white font-semibold' : 'bg-white border border-[#d1d9e6] hover:border-[#0d2147]')}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </Card>

        <Card className="px-5 sm:px-6 py-2 divide-y divide-[#e8edf5]">
          <Row label="Show me in the Member Directory" description="Verified members can find you by name, specialty or city.">
            <Switch checked={form.inDirectory} onChange={(v) => set('inDirectory', v)} label="Show me in the Member Directory" />
          </Row>
          <Row label="Show my organization" description="Hide it if you prefer to appear by specialty and city only.">
            <Switch checked={form.showOrganization} onChange={(v) => set('showOrganization', v)} label="Show my organization" />
          </Row>
        </Card>
      </div>

      <SaveBar
        dirty={dirty}
        onSave={save}
        onDiscard={() => {
          setForm(saved)
          setTried(false)
        }}
      />
      {toast}
    </ProfileLayout>
  )
}
