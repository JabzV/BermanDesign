import { FACULTY } from '../data/learn'
import { LEARNER, type Certificate } from '../data/credentials'
import { cn } from '../../lib/utils'
import logo from '../../imports/image-3.png'

/** The certificate as issued. Sized by its container; text scales with container width (cqw). */
export function CertificateDocument({ cert, className }: { cert: Certificate; className?: string }) {
  return (
    <div className={cn('@container w-full', className)}>
      <div
        className="relative aspect-[1.414] bg-[#fdfbf5] text-[#0d2147] shadow-[0_18px_40px_-20px_rgba(13,33,71,0.35)] rounded-sm overflow-hidden"
        role="img"
        aria-label={`Certificate: ${cert.title}, awarded to ${LEARNER.name} on ${cert.issued}`}
      >
        <div className="absolute inset-[2.2cqw] border border-[#c9a84c]" />
        <div className="absolute inset-[3cqw] border-[0.25cqw] border-double border-[#c9a84c]/60" />
        <div className="relative h-full flex flex-col items-center text-center px-[9cqw] pt-[6.5cqw] pb-[5.5cqw]">
          <img src={logo} alt="" className="h-[6cqw] object-contain mix-blend-multiply" />
          <p className="mt-[3cqw] text-[1.6cqw] tracking-[0.3em] uppercase text-[#8a6d22] font-semibold">
            {cert.kind === 'Free Education' ? 'Certificate of Attendance' : 'Certificate of Completion'}
          </p>
          <p className="mt-[2.4cqw] text-[1.7cqw] text-[#5a6a84]">This certifies that</p>
          <p className="mt-[0.8cqw] font-serif italic text-[5.2cqw] leading-tight">{LEARNER.name}</p>
          <div className="mt-[1cqw] w-[38cqw] h-px bg-[#c9a84c]" />
          <p className="mt-[2cqw] text-[1.7cqw] text-[#5a6a84]">has successfully completed the {cert.kind.toLowerCase()}</p>
          <p className="mt-[0.8cqw] font-serif text-[3.2cqw] leading-tight">{cert.title}</p>
          <p className="mt-[1.6cqw] text-[1.5cqw] text-[#5a6a84] tabular-nums">
            {cert.hours} {cert.hours === 1 ? 'hour' : 'hours'} · {cert.cme} CME / CE {cert.cme === 1 ? 'credit' : 'credits'} · Awarded {cert.issued}
          </p>

          <div className="mt-auto w-full flex items-end justify-between gap-[4cqw]">
            {cert.signatories.map((id) => (
              <div key={id} className="text-left">
                <p className="font-serif italic text-[2.6cqw] leading-none">{FACULTY[id].name.replace('Dr. ', '')}</p>
                <div className="mt-[0.8cqw] w-[22cqw] h-px bg-[#0d2147]/40" />
                <p className="mt-[0.6cqw] text-[1.3cqw] font-semibold">{FACULTY[id].name}</p>
                <p className="text-[1.2cqw] text-[#5a6a84]">{FACULTY[id].title}</p>
              </div>
            ))}
            <div className="text-right">
              <p className="text-[1.2cqw] text-[#5a6a84]">Credential ID</p>
              <p className="text-[1.5cqw] font-semibold tabular-nums">{cert.credentialId}</p>
              <p className="text-[1.2cqw] text-[#5a6a84] mt-[0.4cqw]">Verify at bermaninstitute.com/verify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
