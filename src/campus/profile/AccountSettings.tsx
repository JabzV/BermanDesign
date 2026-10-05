import { useState, type FormEvent } from 'react'
import { Laptop, Smartphone, Download, AlertTriangle, Eye, EyeOff, Check } from 'lucide-react'
import { Card, Switch, inputClass, buttonPrimary, buttonSecondary } from '../ui'
import { ProfileLayout, SectionTitle, Row, FieldError, useToast } from './parts'
import { cn } from '../../lib/utils'

function strength(pw: string) {
  let score = 0
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}
const STRENGTH_LABEL = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_COLOR = ['bg-[#c25b5b]', 'bg-[#c25b5b]', 'bg-[#c9a84c]', 'bg-[#1a3260]', 'bg-emerald-600']

function PasswordForm({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [tried, setTried] = useState(false)
  const score = strength(next)
  const errors = {
    current: !current ? 'Enter your current password.' : '',
    next: next.length < 12 ? 'Use at least 12 characters.' : score < 3 ? 'Add a mix of upper and lower case, numbers or symbols.' : '',
    confirm: confirm !== next ? 'Passwords do not match.' : '',
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    const first = Object.entries(errors).find(([, v]) => v)
    if (first) {
      document.getElementById(`pw-${first[0]}`)?.focus()
      return
    }
    onDone()
  }
  const err = (k: keyof typeof errors) => (tried ? errors[k] : '')
  const type = show ? 'text' : 'password'
  return (
    <form onSubmit={submit} noValidate className="mt-4 flex flex-col gap-4">
      <div>
        <label htmlFor="pw-current" className="text-sm font-semibold">
          Current password
        </label>
        <input id="pw-current" type={type} autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} aria-invalid={!!err('current')} className={cn(inputClass(!!err('current')), 'mt-2')} />
        {err('current') && <FieldError id="pw-current-error">{err('current')}</FieldError>}
      </div>
      <div>
        <label htmlFor="pw-next" className="text-sm font-semibold">
          New password
        </label>
        <input id="pw-next" type={type} autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} aria-invalid={!!err('next')} aria-describedby="pw-strength" className={cn(inputClass(!!err('next')), 'mt-2')} />
        <div className="mt-2 flex items-center gap-3" id="pw-strength">
          <div className="flex-1 grid grid-cols-4 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn('h-1.5 rounded-full', next && i < score ? STRENGTH_COLOR[score] : 'bg-[#e8edf5]')} />
            ))}
          </div>
          <span className="text-xs text-[#5a6a84] w-16 text-right">{next ? STRENGTH_LABEL[score] : ''}</span>
        </div>
        {err('next') && <FieldError id="pw-next-error">{err('next')}</FieldError>}
      </div>
      <div>
        <label htmlFor="pw-confirm" className="text-sm font-semibold">
          Confirm new password
        </label>
        <input id="pw-confirm" type={type} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} aria-invalid={!!err('confirm')} className={cn(inputClass(!!err('confirm')), 'mt-2')} />
        {err('confirm') && <FieldError id="pw-confirm-error">{err('confirm')}</FieldError>}
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3">
        <button type="button" onClick={() => setShow((s) => !s)} className="inline-flex items-center gap-2 text-sm text-[#5a6a84] hover:text-[#0d2147] min-h-11 sm:mr-auto">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {show ? 'Hide passwords' : 'Show passwords'}
        </button>
        <button type="submit" className={buttonPrimary}>
          Update password
        </button>
      </div>
    </form>
  )
}

const SESSIONS = [
  { id: 's1', device: 'Chrome on Windows', where: 'San Diego, CA', when: 'Active now', current: true, icon: Laptop },
  { id: 's2', device: 'Safari on iPhone', where: 'San Diego, CA', when: '2 hours ago', current: false, icon: Smartphone },
  { id: 's3', device: 'Chrome on macOS', where: 'Los Angeles, CA', when: 'Sep 28, 2026', current: false, icon: Laptop },
]

export default function AccountSettings({ onSignOut }: { onSignOut: () => void }) {
  const { show, toast } = useToast()
  const [changingPassword, setChangingPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [sessions, setSessions] = useState(SESSIONS)
  const [timezone, setTimezone] = useState('America/Los_Angeles')
  const [deleting, setDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  return (
    <ProfileLayout section="account" onSignOut={onSignOut}>
      <SectionTitle title="Account Settings" description="Sign-in, security and account details." />

      <div className="flex flex-col gap-5">
        <Card className="p-5 sm:p-6">
          <h3 className="font-serif text-lg">Sign-in email</h3>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold">ana.reyes@clinic.com</p>
              <p className="text-xs text-emerald-700 inline-flex items-center gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5" /> Confirmed
              </p>
            </div>
            <button className={cn(buttonSecondary, 'self-start sm:self-auto')}>Change email</button>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <h3 className="font-serif text-lg">Password</h3>
              <p className="text-sm text-[#5a6a84] mt-0.5">Last changed Aug 1, 2026</p>
            </div>
            {!changingPassword && (
              <button onClick={() => setChangingPassword(true)} className={cn(buttonSecondary, 'self-start sm:self-auto')}>
                Change password
              </button>
            )}
          </div>
          {changingPassword && (
            <PasswordForm
              onDone={() => {
                setChangingPassword(false)
                show('Password updated')
              }}
            />
          )}
        </Card>

        <Card className="px-5 sm:px-6 py-2">
          <Row label="Two-step sign-in" description={twoFactor ? 'On · authenticator app. Required for access to clinical discussions.' : 'Off. We strongly recommend turning this on.'}>
            <Switch
              checked={twoFactor}
              onChange={(v) => {
                setTwoFactor(v)
                show(v ? 'Two-step sign-in turned on' : 'Two-step sign-in turned off')
              }}
              label="Two-step sign-in"
            />
          </Row>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <h3 className="font-serif text-lg">Where you're signed in</h3>
            {sessions.length > 1 && (
              <button
                onClick={() => {
                  setSessions((s) => s.filter((x) => x.current))
                  show('Signed out of other devices')
                }}
                className={cn(buttonSecondary, 'self-start sm:self-auto')}
              >
                Sign out other devices
              </button>
            )}
          </div>
          <ul className="mt-4 divide-y divide-[#e8edf5] border-t border-[#e8edf5]">
            {sessions.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.id} className="flex items-center gap-3 py-3">
                  <Icon className="w-5 h-5 text-[#5a6a84] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">
                      {s.device}
                      {s.current && <span className="ml-2 text-xs font-semibold text-emerald-700">This device</span>}
                    </p>
                    <p className="text-xs text-[#5a6a84]">
                      {s.where} · {s.when}
                    </p>
                  </div>
                  {!s.current && (
                    <button
                      onClick={() => setSessions((list) => list.filter((x) => x.id !== s.id))}
                      className="text-sm font-semibold min-h-11 px-3 rounded-full hover:bg-[#f5f6f8]"
                      aria-label={`Sign out ${s.device}`}
                    >
                      Sign out
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </Card>

        <Card className="px-5 sm:px-6 py-2 divide-y divide-[#e8edf5]">
          <Row label="Time zone" description="Used for Grand Rounds times and reminders.">
            <select aria-label="Time zone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className={cn(inputClass(), 'w-44 sm:w-56 min-h-11')}>
              <option value="America/New_York">Eastern (ET)</option>
              <option value="America/Chicago">Central (CT)</option>
              <option value="America/Denver">Mountain (MT)</option>
              <option value="America/Los_Angeles">Pacific (PT)</option>
            </select>
          </Row>
          <Row label="Download my data" description="Profile, academic record, CME history and posts as a ZIP file.">
            <button onClick={() => show('We will email you when your file is ready')} className={cn(buttonSecondary, 'shrink-0')}>
              <Download className="w-4 h-4" /> Request
            </button>
          </Row>
        </Card>

        <Card className="p-5 sm:p-6 border-[#e6b9b9]">
          <h3 className="font-serif text-lg text-[#8f3a3a]">Delete account</h3>
          <p className="text-sm text-[#5a6a84] mt-1 max-w-xl">
            Permanently removes your profile, posts and notes. Issued certificates stay verifiable for licensing purposes, and your academic record is retained as required.
          </p>
          {!deleting ? (
            <button onClick={() => setDeleting(true)} className="mt-4 inline-flex items-center gap-2 min-h-11 px-5 rounded-full border border-[#e6b9b9] text-[#b04848] text-sm font-semibold hover:bg-[#fcf1f1] transition-colors">
              Delete my account
            </button>
          ) : (
            <div className="mt-4 rounded-xl bg-[#fcf1f1] p-4">
              <p className="text-sm font-semibold text-[#8f3a3a] inline-flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> This cannot be undone
              </p>
              <label htmlFor="delete-confirm" className="block text-sm mt-3">
                Type <span className="font-semibold">DELETE</span> to confirm.
              </label>
              <input id="delete-confirm" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} autoComplete="off" className={cn(inputClass(), 'mt-2 sm:max-w-xs')} />
              <div className="mt-3 flex flex-col-reverse sm:flex-row gap-2">
                <button
                  onClick={() => {
                    setDeleting(false)
                    setConfirmText('')
                  }}
                  className={buttonSecondary}
                >
                  Keep my account
                </button>
                <button
                  disabled={confirmText !== 'DELETE'}
                  onClick={() => show('Prototype: account deletion is not performed')}
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-[#b04848] text-white text-sm font-bold hover:bg-[#963c3c] transition-colors disabled:bg-[#e6b9b9] disabled:cursor-not-allowed"
                >
                  Permanently delete
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
      {toast}
    </ProfileLayout>
  )
}
