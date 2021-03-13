import React, { useRef, useState, useEffect } from 'react'
import { useRect } from '@reach/rect'

export default function Marquee({
  speed = 0.5,
  direction = 'left',
  pauseOnHover,
  children,
  ...rest
}) {
  const [observe, setObserve] = useState(true)
  const [reps, setReps] = useState(1)

  const container = useRef()
  const containerRect = useRect(container, { observe })
  const item = useRef()
  const itemRect = useRect(item, { observe })

  const containerWidth = containerRect?.width
  const itemWidth = itemRect?.width

  useEffect(() => {
    if (containerWidth && itemWidth) {
      setReps(Math.ceil(containerWidth / itemWidth))
      setObserve(false)
    }
  }, [containerWidth, itemWidth])

  useEffect(() => {
    if (!container?.current) return
    const resizeObserverInstance = new ResizeObserver(() => setObserve(true))
    resizeObserverInstance.observe(container.current)
    return () => {
      if (!container?.current) return
      resizeObserverInstance.unobserve(container.current)
    }
  }, [container])

  return (
    <div
      ref={container}
      data-marquee=""
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? '' : null}
      {...rest}
    >
      <div data-marquee-inner="">
        {new Array(2).fill().map((_, clone) => {
          return (
            <div
              key={clone}
              data-marquee-content=""
              style={{
                animationDuration: `${Math.ceil(
                  (((itemWidth ?? 0) * reps) / 24) * speed
                )}s`,
              }}
            >
              {new Array(reps).fill().map((_, rep) => {
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
