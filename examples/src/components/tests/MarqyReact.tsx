import { useState } from 'react'
import { Marqy } from 'marqy/react'
import type { MarqyDirection } from 'marqy/react'

export default function MarqyReact() {
  const [speed, setSpeed] = useState(0.5)
  const [direction, setDirection] = useState<MarqyDirection>('left')
  const [pauseOnHover, setPauseOnHover] = useState(false)
  const isVertical = direction === 'up' || direction === 'down'

  return (
    <div style={{ width: '100%' }}>
      <div className="flex items-center justify-between gap-20 bg-white/10 p-20 rounded-5 mb-10">
        <label className="flex items-center gap-x-5">
          <span className="text-p0">speed</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-white/20 h-10 rounded-3"
          />
          <span className="text-p0 text-neon">{speed.toFixed(1)}</span>
        </label>
        <label className="flex items-center gap-x-5">
          <span className="text-p0">direction</span>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as MarqyDirection)}
            className="text-neon bg-neon/20 rounded-3 uppercase h-20 tracking-10 text-p0"
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
