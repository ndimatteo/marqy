import { Marqy } from 'marqy'

function Char({ value }: { value: string }) {
  return (
    <span className="w-1/5 aspect-square text-jumbo text-[8vw] bg-white flex items-center justify-center">
      {value}
    </span>
  )
}

export default function MarqyInteractiveDemo() {
  return (
    <section className="flex flex-col sm:flex-row p-20 border-t gap-px">
      <Marqy
        speed={1}
        direction="up"
        className="bg-white text-black text-center min-h-[calc(10vw+2rem)] max-h-[calc((10vw+2rem)*2)] h-[calc(10vw+2rem)] overflow-hidden"
      >
        <p className="flex w-full gap-px bg-black text-center border-t select-none">
          <Char value="↑" />
          <Char value="↑" />
          <Char value="↑" />
          <Char value="↑" />
          <Char value="↑" />
          <Char value="↑" />
        </p>
      </Marqy>
      <Marqy
        speed={1}
        direction="down"
        className="bg-white text-black text-center min-h-[calc(10vw+2rem)] max-h-[calc((10vw+2rem)*2)] h-[calc(10vw+2rem)] overflow-hidden"
      >
        <p className="flex w-full gap-px bg-black text-center border-t select-none">
          <Char value="↓" />
          <Char value="↓" />
          <Char value="↓" />
          <Char value="↓" />
          <Char value="↓" />
          <Char value="↓" />
        </p>
      </Marqy>
    </section>
  )
}
