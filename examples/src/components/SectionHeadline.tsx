import { Marqy } from 'marqy'

import { cn } from '../lib/cn'

export default function SectionHeadline({ text }: { text: string }) {
  return (
    <>
      <h2
        className={cn(
          'md:absolute md:top-1/2 md:left-0 md:w-lvh md:transform-[rotate(-90deg)_translateX(-50%)] origin-top-left border-b py-20 z-2 bg-black',
        )}
      >
        <Marqy speed={1} direction="left">
          <span className="text-jumbo text-15 sm:text-40 px-20">{text}</span>
        </Marqy>
      </h2>

      <h2
        aria-hidden="true"
        className={cn(
          'hidden md:block',
          'absolute top-1/2 right-0 w-lvh transform-[rotate(90deg)_translateX(50%)] origin-top-right border-b py-20 z-2 bg-black',
        )}
      >
        <Marqy speed={1} direction="left">
          <span className="text-jumbo text-15 sm:text-40 px-20">{text}</span>
        </Marqy>
      </h2>

      {/* <h2
        className={cn(
          'w-lvh fixed right-0 top-0 origin-top-left transform-[translateY(-100%)_rotate(90deg)] border-b py-20 z-2 bg-black',
        )}
      >
        <Marqy speed={1} direction="left">
          <span className="text-jumbo text-40 px-20">{text}</span>
        </Marqy>
      </h2> */}
    </>
  )
}
