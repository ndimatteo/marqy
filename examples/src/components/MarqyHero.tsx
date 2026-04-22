import { Marqy } from 'marqy'

import Divider from './Divider'
import Tile from './Tile'

export default function MarqyHero() {
  return (
    <div>
      {/* Hero Logo */}
      <header className="flex justify-center overflow-hidden gap-px bg-white cursor-cell">
        <Marqy
          className="h-[clamp(2rem,18vw,40rem)] bg-black"
          direction="up"
          speed={1}
        >
          <Tile value="m" />
        </Marqy>
        <Marqy
          className="h-[clamp(2rem,18vw,40rem)] bg-black"
          direction="down"
          speed={1}
        >
          <Tile value="a" />
        </Marqy>
        <Marqy
          className="h-[clamp(2rem,18vw,40rem)] bg-black"
          direction="up"
          speed={1}
        >
          <Tile value="r" />
        </Marqy>
        <Marqy
          className="h-[clamp(2rem,18vw,40rem)] bg-black"
          direction="down"
          speed={1}
        >
          <Tile value="q" />
        </Marqy>
        <Marqy
          className="h-[clamp(2rem,18vw,40rem)] bg-black"
          direction="up"
          speed={1}
        >
          <Tile value="y" />
        </Marqy>
      </header>

      {/* Tagline */}
      <Marqy direction="right" className="bg-white text-black">
        <p className="text-p1 py-10 sm:py-20 uppercase whitespace-pre">
          <Divider />
          High-fidelity loops for modern interfaces
        </p>
      </Marqy>

      <Marqy className="bg-white/70 text-black">
        <p className="text-p1 py-10 sm:py-20 uppercase whitespace-pre">
          <Divider />
          Light as a feather at under 1kB gzipped
        </p>
      </Marqy>

      <Marqy className="bg-white/50 text-black">
        <div className="flex">
          <p className="text-p1 py-10 sm:py-20 uppercase whitespace-pre">
            <Divider value=" + " />
            Synchronized speeds that perfectly loop
          </p>
          <p className="text-p1 py-10 sm:py-20 uppercase whitespace-pre">
            <Divider value=" + " />
            CSS-based animations
          </p>
        </div>
      </Marqy>
    </div>
  )
}
