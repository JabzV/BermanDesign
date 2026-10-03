import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, X, Clock, ListChecks, Target, Award, RotateCcw, Info } from 'lucide-react'
import CampusLayout from '../CampusLayout'
import { Card, ProgressBar, buttonPrimary, buttonSecondary } from '../ui'
import { PROGRAM, QUIZ } from '../data/learn'
import { cn } from '../../lib/utils'

type Phase = 'intro' | 'questions' | 'results'

export default function Assessment({ id, onSignOut }: { id: string; onSignOut: () => void }) {
  const module = PROGRAM.modules.find((m) => m.quizId === id) ?? PROGRAM.modules[3]
  const moduleHref = `#/learn/program/advanced-certificate/module/${module.number}`
  const isPreview = module.status === 'current' && module.lessons.some((l) => l.type !== 'quiz' && l.status !== 'done')
  const title = `Module ${module.number} Knowledge Check`

  const [phase, setPhase] = useState<Phase>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUIZ.questions.map(() => null))

  const questions = QUIZ.questions
  const q = questions[current]
  const isLast = current === questions.length - 1
  const correct = answers.filter((a, i) => a === questions[i].answer).length
  const score = Math.round((correct / questions.length) * 100)
  const passed = score >= QUIZ.passMark

  const restart = () => {
    setAnswers(questions.map(() => null))
    setCurrent(0)
    setPhase('questions')
  }

  const layoutProps = {
    active: 'learn' as const,
    title,
    back: { label: `Module ${module.number}`, href: moduleHref },
    onSignOut,
  }

  if (phase === 'intro') {
    return (
      <CampusLayout {...layoutProps}>
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8">
            <p className="text-sm text-[#5a6a84]">{module.title}</p>
            <h2 className="font-serif text-2xl sm:text-3xl leading-snug mt-1">{title}</h2>
            <p className="text-[#5a6a84] mt-3">
              Short clinical vignettes based on this module. You can review every answer with an explanation when you finish.
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { icon: ListChecks, label: 'Questions', value: `${questions.length}` },
                { icon: Clock, label: 'Suggested time', value: `${QUIZ.minutes} min` },
                { icon: Target, label: 'Pass mark', value: `${QUIZ.passMark}%` },
                { icon: Award, label: 'CME', value: `${QUIZ.cme} credit` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-[#f5f6f8] p-3">
                  <Icon className="w-4 h-4 text-[#8a6d22]" />
                  <dt className="text-xs text-[#5a6a84] mt-2">{label}</dt>
                  <dd className="font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            {isPreview && (
              <p className="mt-6 flex gap-3 rounded-lg bg-[#fbf7ec] p-4 text-sm">
                <Info className="w-4 h-4 text-[#8a6d22] shrink-0 mt-0.5" />
                Preview mode. Finish the remaining Module {module.number} lessons to take this for credit; preview answers are not recorded.
              </p>
            )}
            <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
              <a href={moduleHref} className={buttonSecondary}>
                Back to module
              </a>
              <button onClick={() => setPhase('questions')} className={buttonPrimary}>
                {isPreview ? 'Start preview' : 'Start knowledge check'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>
      </CampusLayout>
    )
  }

  if (phase === 'results') {
    return (
      <CampusLayout {...layoutProps}>
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shrink-0',
                  passed ? 'bg-[#0d2147] text-[#c9a84c]' : 'bg-[#fcf1f1] text-[#c25b5b]',
                )}
              >
                {passed ? <Check className="w-7 h-7" strokeWidth={2.5} /> : <RotateCcw className="w-6 h-6" />}
              </span>
              <div>
                <h2 className="font-serif text-2xl leading-snug">{isPreview ? (passed ? 'Preview passed' : 'Preview not passed') : passed ? 'Passed' : 'Not passed yet'}</h2>
                <p className="text-sm text-[#5a6a84] tabular-nums">
                  {correct} of {questions.length} correct · {score}% · pass mark {QUIZ.passMark}%
                </p>
              </div>
            </div>
            <p className="mt-5 text-[15px]">
              {isPreview
                ? 'This was a preview, so nothing was recorded. Finish the module lessons to take it for credit.'
                : passed
                  ? `Module ${module.number} is complete and ${QUIZ.cme} CME credit has been added to your record.`
                  : 'Review the explanations below, revisit the lessons, and retake when you are ready. There is no limit on attempts.'}
            </p>
            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
              <button onClick={restart} className={buttonSecondary}>
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <a href={moduleHref} className={buttonPrimary}>
                Back to module <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Card>

          <h2 className="font-serif text-xl mt-10 mb-4">Review your answers</h2>
          <ol className="flex flex-col gap-3">
            {questions.map((question, i) => {
              const chosen = answers[i]
              const right = chosen === question.answer
              return (
                <li key={question.id}>
                  <Card className="p-5">
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                          right ? 'bg-emerald-50 text-emerald-700' : 'bg-[#fcf1f1] text-[#c25b5b]',
                        )}
                      >
                        {right ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <X className="w-3.5 h-3.5" strokeWidth={3} />}
                        <span className="sr-only">{right ? 'Correct' : 'Incorrect'}</span>
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug">
                          {i + 1}. {question.question}
                        </p>
                        {!right && chosen !== null && (
                          <p className="text-sm text-[#5a6a84] mt-2">
                            Your answer: <span className="line-through decoration-[#c25b5b]/60">{question.options[chosen]}</span>
                          </p>
                        )}
                        <p className="text-sm mt-2">
                          <span className="text-[#5a6a84]">Correct answer: </span>
                          <span className="font-semibold">{question.options[question.answer]}</span>
                        </p>
                        <p className="text-sm text-[#5a6a84] mt-3 leading-relaxed">{question.explanation}</p>
                      </div>
                    </div>
                  </Card>
                </li>
              )
            })}
          </ol>
        </div>
      </CampusLayout>
    )
  }

  const prevButton = (
    <button onClick={() => setCurrent((c) => c - 1)} disabled={current === 0} className={cn(buttonSecondary, 'disabled:opacity-40 disabled:cursor-not-allowed')}>
      <ArrowLeft className="w-4 h-4" /> Previous
    </button>
  )
  const nextButton = (
    <button
      onClick={() => (isLast ? setPhase('results') : setCurrent((c) => c + 1))}
      disabled={answers[current] === null}
      className={buttonPrimary}
    >
      {isLast ? 'Submit answers' : 'Next question'}
      {!isLast && <ArrowRight className="w-4 h-4" />}
    </button>
  )

  return (
    <CampusLayout {...layoutProps} focus>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between text-sm mb-2 tabular-nums">
          <span className="font-semibold">
            Question {current + 1} of {questions.length}
          </span>
          {isPreview && <span className="text-[#8a6d22] font-semibold">Preview</span>}
        </div>
        <ProgressBar value={((current + 1) / questions.length) * 100} />

        <Card className="mt-6 p-5 sm:p-7">
          <p className="text-[15px] leading-relaxed bg-[#f5f6f8] rounded-lg p-4">{q.vignette}</p>
          <fieldset className="mt-6">
            <legend className="font-serif text-xl leading-snug">{q.question}</legend>
            <div className="mt-4 flex flex-col gap-2.5">
              {q.options.map((option, i) => {
                const selected = answers[current] === i
                return (
                  <label
                    key={option}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-4 min-h-14 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#c9a84c]',
                      selected ? 'border-[#0d2147] bg-[#f5f6f8]' : 'border-[#d1d9e6] bg-white hover:border-[#0d2147]/40',
                    )}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={selected}
                      onChange={() => setAnswers((prev) => prev.map((a, idx) => (idx === current ? i : a)))}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                        selected ? 'border-[#0d2147]' : 'border-[#c5cfdf]',
                      )}
                    >
                      {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#0d2147]" />}
                    </span>
                    <span className="text-[15px] leading-snug">{option}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </Card>

        <div className="hidden lg:flex justify-between mt-6">
          {prevButton}
          {nextButton}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#d1d9e6] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] grid grid-cols-[auto_1fr] gap-3">
        {prevButton}
        {nextButton}
      </div>
    </CampusLayout>
  )
}
