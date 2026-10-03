import { useState } from 'react'
import { Play, Pause, Captions, Maximize } from 'lucide-react'
import { cn } from '../lib/utils'
import lecturePhoto from '../imports/asdff.png'

// Simulated player for the prototype: poster + play state, no real media.
export default function VideoPlayer({
  minutes,
  poster = lecturePhoto,
  resumeAt,
  label = 'Play video',
}: {
  minutes: number
  poster?: string
  resumeAt?: string
  label?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const position = resumeAt ?? '0:00'
  const pct = resumeAt ? 55 : 2
  return (
    <div className="relative -mx-4 sm:mx-0 aspect-video bg-black sm:rounded-2xl overflow-hidden group">
      <img src={poster} alt="" className={cn('absolute inset-0 w-full h-full object-cover transition-opacity', started ? 'opacity-90' : 'opacity-75')} />
      {!started ? (
        <button
          onClick={() => {
            setStarted(true)
            setPlaying(true)
          }}
          aria-label={label}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#0d2147] flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] group-hover:bg-[#e2c575] transition-colors">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" fill="currentColor" />
          </span>
          <span className="absolute left-4 bottom-4 text-xs font-semibold text-white bg-black/50 rounded-md px-2 py-1 tabular-nums">
            {resumeAt ? `Resume at ${resumeAt}` : `${minutes} min`}
          </span>
        </button>
      ) : (
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent pt-10 px-3 sm:px-4 pb-2 sm:pb-3 text-white">
          <div className="h-1 bg-white/25 rounded-full overflow-hidden" role="progressbar" aria-label="Playback position" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-[#c9a84c]" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'} className="w-10 h-10 flex items-center justify-center">
              {playing ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
            </button>
            <span className="text-xs tabular-nums">
              {position} / {minutes}:00
            </span>
            <span className="ml-auto" />
            <button aria-label="Captions" className="w-10 h-10 flex items-center justify-center">
              <Captions className="w-5 h-5" />
            </button>
            <button aria-label="Playback speed" className="h-10 px-2 text-xs font-semibold">
              1.25×
            </button>
            <button aria-label="Full screen" className="w-10 h-10 flex items-center justify-center">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
