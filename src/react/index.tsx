import * as React from 'react'
import {
  type MarqyDirection,
  type MarqyDimensions,
  calcReps,
  calcAnimationDuration,
  createResizeObserver,
} from '../core'

export type { MarqyDirection }

export interface MarqyProps extends React.ComponentPropsWithoutRef<'div'> {
  speed?: number
  direction?: MarqyDirection
  pauseOnHover?: boolean
  manual?: boolean
  children: React.ReactNode
}

export function Marqy({
  speed = 0.5,
  direction = 'left',
  pauseOnHover,
  manual = false,
  children,
  ...rest
}: MarqyProps): React.ReactElement {
  const [reps, setReps] = React.useState(1)

  const [container, containerDimensions] = useDimensions()
  const [item, itemDimensions] = useDimensions()

  const isVertical = direction === 'up' || direction === 'down'

  const getAnimationDuration = React.useCallback(
    (itemDimension: number) => calcAnimationDuration(itemDimension, reps, speed),
    [reps, speed]
  )

  React.useEffect(() => {
    if (!isVertical && containerDimensions.width && itemDimensions.width) {
      setReps(calcReps(containerDimensions.width, itemDimensions.width))
    }
    if (isVertical && containerDimensions.height && itemDimensions.height) {
      setReps(calcReps(containerDimensions.height, itemDimensions.height))
    }
  }, [isVertical, containerDimensions, itemDimensions])

  return (
    <div
      ref={container}
      data-marqy=""
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? '' : null}
      {...rest}
    >
      <div data-marqy-inner="">
        {new Array(2).fill(0).map((_, clone) => (
          <div
            key={clone}
            data-marqy-content=""
            {...(manual
              ? { 'data-marqy-static': getAnimationDuration(isVertical ? itemDimensions.height : itemDimensions.width) }
              : { style: { animationDuration: getAnimationDuration(isVertical ? itemDimensions.height : itemDimensions.width) } }
            )}
          >
            {new Array(reps).fill(0).map((_, rep) => {
              const isFirstItem = clone === 0 && rep === 0
              return (
                <div
                  key={rep}
                  ref={isFirstItem ? item : null}
                  aria-hidden={!isFirstItem || undefined}
                  data-marqy-item=""
                >
                  {children}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function useDimensions() {
  const [dimensions, setDimensions] = React.useState<MarqyDimensions>({ width: 0, height: 0 })
  const cleanupRef = React.useRef<(() => void) | null>(null)

  const ref = React.useCallback((node: HTMLElement | null) => {
    cleanupRef.current?.()
    if (!node) return
    cleanupRef.current = createResizeObserver(node, setDimensions)
  }, [])

  return [ref, dimensions] as const
}
