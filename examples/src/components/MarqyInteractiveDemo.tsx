import { useReducer } from 'react'
import { Marqy } from 'marqy'

import { zeroPad } from '../lib/helpers'

export default function MarqyInteractiveDemo() {
  const [count, increment] = useReducer((x: number) => (x >= 20 ? 0 : x + 1), 1)

  return (
    <section>
      <Marqy speed={0.7} direction="right" pauseOnHover className="border-b">
        <div className="flex items-center gap-5">
          <p className="text-p1 py-10 uppercase whitespace-pre">{` Interactivity: `}</p>
          <button
            onClick={increment}
            className="clean-btn cursor-pointer bg-white text-black text-p0 uppercase px-20 py-15"
          >
            Count_
            <span
              className="tabular-nums"
              style={{
                minWidth: '2ch',
                display: 'inline-block',
                textAlign: 'end',
              }}
            >
              {zeroPad(count, 2)}
            </span>
          </button>
        </div>
      </Marqy>

      <Marqy speed={0.4} className="border-b">
        <div className="flex items-center gap-10 pr-10 py-20">
          <p className="text-p1 uppercase">Render Anything</p>
          <figure className="flex aspect-square rounded-5 overflow-hidden isolate bg-white/10 w-100">
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3e/2a/b9/3e2ab937-0ea6-c02b-3c57-afe28f9aa2a2/198704984693_Cover.jpg/632x632bb.webp"
              alt=""
            />
          </figure>
        </div>
      </Marqy>
    </section>
  )
}
