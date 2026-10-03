import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, ArrowUpRight, User, Stethoscope } from 'lucide-react'
import logo from './imports/image-3.png'
import drBermanPhoto from './imports/drvbermasdn.png'

interface AuthPageProps {
  onBack: () => void
  onSignIn: () => void
}

export default function AuthPage({ onBack, onSignIn }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="h-screen overflow-hidden flex items-stretch font-sans">
      {/* Left — Form panel */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2 flex-shrink-0 bg-white flex flex-col px-0 py-8 relative z-10"
      >
        {/* Back to site — absolute top-left */}
        <button
          onClick={onBack}
          className="absolute top-5 left-5 sm:top-6 sm:left-8 flex items-center gap-2 text-[#5a6a84] text-sm hover:text-[#0d2147] transition-colors z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>
        {/* Centered form content */}
        <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto py-16 px-5 sm:px-8">
        <div style={{ width: '420px', maxWidth: '100%' }} className="mx-auto w-full">
          <img src={logo} alt="Berman Institute" className="object-contain mix-blend-multiply" style={{ width: '130px', height: '44px', marginBottom: '14px' }} />

          <AnimatePresence mode="wait">
            <motion.h1
              key={mode + '-heading'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[#0d2147] text-xl sm:text-2xl font-bold mb-1"
            >
              {mode === 'signin' ? 'Welcome back.' : 'Join the Institute.'}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={mode + '-subtext'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#5a6a84] text-sm mb-5"
            >
              {mode === 'signin'
                ? 'Sign in to access your campus, courses, and network.'
                : 'Create your account to begin your clinical education journey.'}
            </motion.p>
          </AnimatePresence>

          {/* Toggle tabs */}
          <div className="flex bg-[#f5f6f8] rounded-full p-1 mb-5">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-full text-[13px] font-semibold transition-all ${
                mode === 'signin'
                  ? 'bg-[#0d2147] text-white shadow-sm'
                  : 'text-[#5a6a84] hover:text-[#0d2147]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-full text-[13px] font-semibold transition-all ${
                mode === 'signup'
                  ? 'bg-[#c9a84c] text-[#0d2147] shadow-sm'
                  : 'text-[#5a6a84] hover:text-[#0d2147]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); onSignIn() }} className="flex flex-col gap-3">
            {/* Signup-only top fields */}
            <AnimatePresence initial={false}>
              {mode === 'signup' && (
                <motion.div
                  key="name-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0cc]" />
                      <input type="text" placeholder="First name" className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#d1d9e6] text-sm text-[#0d2147] placeholder:text-[#a0b0cc] focus:outline-none focus:border-[#0d2147] transition-colors bg-[#f9fafb]" />
                    </div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0cc]" />
                      <input type="text" placeholder="Last name" className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#d1d9e6] text-sm text-[#0d2147] placeholder:text-[#a0b0cc] focus:outline-none focus:border-[#0d2147] transition-colors bg-[#f9fafb]" />
                    </div>
                  </div>
                </motion.div>
              )}
              {mode === 'signup' && (
                <motion.div
                  key="profession-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="relative">
                    <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0cc]" />
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#d1d9e6] text-sm text-[#0d2147] focus:outline-none focus:border-[#0d2147] transition-colors bg-[#f9fafb] appearance-none">
                      <option value="">Select your profession</option>
                      <option>MD / DO</option>
                      <option>Nurse Practitioner</option>
                      <option>Physician Assistant</option>
                      <option>Other Allied Health</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Always-present fields */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0cc]" />
              <input type="email" placeholder="Email address" className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#d1d9e6] text-sm text-[#0d2147] placeholder:text-[#a0b0cc] focus:outline-none focus:border-[#0d2147] transition-colors bg-[#f9fafb]" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0cc]" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#d1d9e6] text-sm text-[#0d2147] placeholder:text-[#a0b0cc] focus:outline-none focus:border-[#0d2147] transition-colors bg-[#f9fafb]" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0b0cc] hover:text-[#0d2147] transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Signup-only confirm + signin-only remember-me */}
            <AnimatePresence initial={false}>
              {mode === 'signup' && (
                <motion.div
                  key="confirm-password"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0cc]" />
                    <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#d1d9e6] text-sm text-[#0d2147] placeholder:text-[#a0b0cc] focus:outline-none focus:border-[#0d2147] transition-colors bg-[#f9fafb]" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0b0cc] hover:text-[#0d2147] transition-colors">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
              {mode === 'signin' && (
                <motion.div
                  key="remember-me"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-[#0d2147] rounded" />
                      <span className="text-[#5a6a84] text-xs">Remember me</span>
                    </label>
                    <button type="button" className="text-[#c9a84c] text-xs font-semibold hover:underline">Forgot password?</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className={`w-full py-3 rounded-full font-bold text-sm transition-colors ${mode === 'signup' ? 'bg-[#c9a84c] text-[#0d2147] hover:bg-[#e2c575]' : 'bg-[#0d2147] text-white hover:bg-[#1a3260]'}`}
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>

            <AnimatePresence initial={false}>
              {mode === 'signup' && (
                <motion.p
                  key="terms"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                  className="text-[#a0b0cc] text-[11px] text-center leading-relaxed"
                >
                  By registering you agree to our{' '}
                  <button className="text-[#c9a84c] hover:underline">Terms of Use</button> and{' '}
                  <button className="text-[#c9a84c] hover:underline">Privacy Policy</button>.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#d1d9e6]" />
              <span className="text-[#a0b0cc] text-xs text-center">or</span>
              <div className="flex-1 h-px bg-[#d1d9e6]" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-[#d1d9e6] rounded-full py-3 text-sm font-semibold text-[#0d2147] hover:bg-[#f5f6f8] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
        </div>

      </motion.div>

      {/* Right — Visual panel */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0d2147]"
      >
        {/* Background photo */}
        <img
          src={drBermanPhoto}
          alt="Dr. Dean Berman"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2147]/80 via-[#0d2147]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2147] via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <div />

          <div>
            <span className="text-[#c9a84c] text-sm font-bold tracking-[0.15em] uppercase mb-6 block">Medical Education Reimagined</span>
            <h2 className="font-serif text-white leading-tight mb-6" style={{ fontSize: '42px' }}>
              Train at the frontier<br />
              <span className="italic text-[#c9a84c]">of modern medicine.</span>
            </h2>
            <p className="text-[#a0b0cc] text-base leading-relaxed max-w-md mb-10">
              Access structured programs in longevity, metabolic health, and emerging clinical science — alongside a lifelong professional network.
            </p>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { val: '800+', label: 'Graduates' },
                { val: '12+', label: 'Programs' },
                { val: '100%', label: 'CME Accredited' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-bold text-white font-serif" style={{ fontSize: '32px' }}>{s.val}</div>
                  <div className="text-[#a0b0cc] text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom legal */}
          <div className="mt-10 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm bg-white/5">
            <p className="text-[#a0b0cc] text-[11px] leading-relaxed">
              © 2026 Berman Institute. All rights reserved. Unauthorized use or reproduction of content is prohibited.{' '}
              <button className="text-[#c9a84c] hover:underline">Terms of Service</button> ·{' '}
              <button className="text-[#c9a84c] hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
