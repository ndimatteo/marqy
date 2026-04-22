import { useState } from 'react'
import { cn } from '../lib/cn'

const MAX = 1

export default function Tile({ value }: { value?: string }) {
  const [variant, setVariant] = useState(0)

  const randomize = () => {
    setVariant((v) => {
      let next = v
      while (next === v) next = Math.floor(Math.random() * (MAX + 1))
      return next
    })
  }

  return (
    <span
      onMouseEnter={randomize}
      onTouchStart={randomize}
      data-variant={variant}
      className={cn(
        'block text-jumbo uppercase text-center py-[0.15em] border-b border-white text-[clamp(2rem,18vw,40rem)] cursor-cell select-none',
        "hover:data-[variant='0']:bg-neon/40 hover:data-[variant='0']:text-neon",
        "hover:data-[variant='1']:bg-purple/40 hover:data-[variant='1']:text-purple",
        'transition-colors ease-out duration-1500 hover:duration-0',
      )}
    >
      {value}
    </span>
  )
}
