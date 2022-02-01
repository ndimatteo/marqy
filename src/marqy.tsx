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

  const [container, containerWidth] = useWidth()
  const [item, itemWidth] = useWidth()

  React.useEffect(() => {
    if (containerWidth && itemWidth) {
      setReps(Math.ceil(containerWidth / itemWidth + 1))
    }
  }, [containerWidth, itemWidth])

  return (
    <div
      ref={container}
      data-marqy=""
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? '' : null}
      {...rest}
    >
      <div data-marqy-inner="" style={{
        // @ts-ignore
        '--marqy-x': `-${Math.round(itemWidth)}px`,
        '--marqy-d': `${itemWidth / (100 * speed)}s`,
      }}>
        {new Array(reps).fill(0).map((_, rep) => {
          const isFirstItem = rep === 0
          return (
            <div
              key={rep}
              ref={isFirstItem ? item : null}
              aria-hidden={!isFirstItem || null}
              data-marqy-item=""
            >
              {children}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function useWidth() {
  const [width, setWidth] = React.useState(0)
  const [node, setNode] = React.useState<HTMLElement | null>(null)
  const observer = React.useRef<ResizeObserver | null>(null)

  const disconnect = React.useCallback(() => observer.current?.disconnect(), [])

  const observe = React.useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    if (node) observer.current.observe(node)
  }, [node])

  React.useEffect(() => {
    observe()
    return () => disconnect()
  }, [disconnect, observe])

  return [setNode, width] as const
}
