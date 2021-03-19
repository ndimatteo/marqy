import * as React from 'react'

export declare interface MarqyProps {
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

export function Marqy({
  speed = 0.5,
  direction = 'left',
  pauseOnHover,
  children,
  ...rest
}: MarqyProps): JSX.Element {
  const [reps, setReps] = React.useState(1)

  const container = React.useRef<HTMLDivElement>(null)
  const containerWidth = useWidth(container)

  const item = React.useRef<HTMLDivElement>(null)
  const itemWidth = useWidth(item)

  React.useLayoutEffect(() => {
    if (containerWidth && itemWidth) {
      setReps(Math.ceil(containerWidth / itemWidth))
    }
  }, [containerWidth, itemWidth])

  return (
    <div
      ref={container}
      data-marquee=""
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? '' : null}
      {...rest}
    >
      <div data-marquee-inner="">
        {new Array(2).fill(0).map((_, clone) => {
          return (
            <div
              key={clone}
              data-marquee-content=""
              style={{
                animationDuration: `${
                  ((itemWidth ?? 0) * reps) / (100 * speed)
                }s`,
              }}
            >
              {new Array(reps).fill(0).map((_, rep) => {
                const isFirstItem = clone === 0 && rep === 0
                return (
                  <div
                    key={rep}
                    ref={isFirstItem ? item : null}
                    aria-hidden={!isFirstItem || null}
                    data-marquee-item=""
                  >
                    {children}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function useWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    if (!ref?.current) return

    const resizeObserverInstance = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })

    resizeObserverInstance.observe(ref.current)

    return () => {
      if (!ref?.current) return
      resizeObserverInstance.unobserve(ref.current)
    }
  }, [ref])

  return width
}
