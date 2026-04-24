import { useState } from 'react'
import { Marqy } from 'marqy/react'
import type { MarqyDirection } from 'marqy/react'

export default function MarqyReact() {
  const [speed, setSpeed] = useState(0.5)
  const [direction, setDirection] = useState<MarqyDirection>('left')
  const [pauseOnHover, setPauseOnHover] = useState(false)
  const isVertical = direction === 'up' || direction === 'down'

  return (
    <div className="@container">
      <div className="flex flex-col items-center justify-between gap-20 bg-white/10 p-20 rounded-5 mb-10 @min-[60rem]:flex-row">
        <label className="flex items-center gap-x-10 w-full @min-[60rem]:w-auto">
          <span className="text-p0 shrink-0">speed</span>
          <div className="flex p-3 bg-white/10 rounded-3 grow">
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-white/30 h-14 min-w-150 rounded-2"
            />
          </div>
          <span className="text-p0 shrink-0 tabular-nums text-neon">
            {speed.toFixed(1)}
          </span>
        </label>
        <div className="flex justify-between w-full border-t border-white/20 pt-20 @min-[60rem]:pt-0 @min-[60rem]:border-0 @min-[60rem]:contents">
          <label className="flex items-center gap-x-10">
            <span className="text-p0">direction</span>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as MarqyDirection)}
              className="text-neon bg-neon/20 rounded-3 uppercase h-20 tracking-10 text-p0 outline-none appearance-none px-5 w-auto text-center"
            >
              <option>left</option>
              <option>right</option>
              <option>up</option>
              <option>down</option>
            </select>
          </label>
          <label className="flex items-center gap-x-5 bg-white/20 text-white/60 has-checked:text-neon rounded-3 cursor-pointer has-checked:bg-neon/20 px-5 h-20">
            <span className="shrink-0 text-p0 uppercase tracking-10 select-none">
              pause on hover
            </span>
            <input
              type="checkbox"
              checked={pauseOnHover}
              onChange={(e) => setPauseOnHover(e.target.checked)}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <div className="border border-purple rounded-5 h-100 flex flex-col justify-center">
        <Marqy
          speed={speed}
          direction={direction}
          pauseOnHover={pauseOnHover}
          className={isVertical ? 'h-full' : ''}
        >
          <p className="text-center text-jumbo py-10 uppercase whitespace-pre">
            <span className="text-current opacity-40">
              {isVertical ? '' : ` // `}
            </span>
            Marqy React
          </p>
        </Marqy>
      </div>
    </div>
  )
}
