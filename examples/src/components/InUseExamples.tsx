import { Marqy } from 'marqy'

interface OptimizedImage {
  src: string
  srcSet: { attribute: string }
  attributes: Record<string, string>
}

interface Example {
  title: string
  url: string
  img: OptimizedImage
}

export default function InUseExamples({ examples }: { examples: Example[] }) {
  return (
    <section>
      <Marqy speed={1.2} pauseOnHover>
        <div className="flex gap-20 pl-20 sm:gap-40 sm:pl-40">
          {examples.map((example, i) => (
            <div
              key={i}
              className="group relative flex flex-col gap-10 w-[50vw] md:w-[25vw]"
            >
              <div className="flex flex-col gap-10">
                <figure className="relative bg-white/10 aspect-16/10 rounded-5 overflow-hidden isolate">
                  <Marqy
                    direction={i % 2 === 1 ? 'up' : 'down'}
                    className="overflow-hidden h-full"
                  >
                    <img
                      src={example.img.src}
                      srcSet={example.img.srcSet.attribute}
                      sizes="(min-width: 1000px) 25vw, 50vw"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Marqy>
                </figure>

                <div className="bg-white/10 text-center py-10 rounded-5">
                  <a
                    href={`${example.url}?ref=marqy`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center after:absolute after:inset-0 after:z-1"
                  >
                    <span className="text-p0 group-hover:animate-flicker-opacity group-hover:text-neon">
                      {example.title}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Marqy>
    </section>
  )
}
