import React, { useRef, useState, useEffect } from 'react'
import { useRect } from '@reach/rect'

export default function Marquee({
  speed = 0.5,
  direction = 'left',
  pauseOnHover,
  className,
  children,
  ...rest
}) {
  const container = useRef()
  const containerRect = useRect(container)
  const item = useRef()
  const itemRect = useRect(item)
  const [reps, setReps] = useState(1)

  const containerWidth = containerRect?.width
  const itemWidth = itemRect?.width

  useEffect(() => {
    if (containerWidth && itemWidth) {
      setReps(Math.ceil(containerWidth / itemWidth))
    }
  }, [containerWidth, itemWidth])

  return (
    <div
      ref={container}
      className={`marquee${className ? ` ${className}` : null}`}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover || null}
      {...rest}
    >
      <div
        className="marquee--inner"
        style={{
          animationDuration: `${Math.ceil(
            (((itemWidth ?? 0) * reps) / 24) * speed
          )}s`,
        }}
      >
        {new Array(2).fill().map((_, clone) => {
          return (
            <div key={clone} className="marquee--content">
              {new Array(reps).fill().map((_, rep) => {
                const isFirstItem = clone === 0 && rep === 0

                return (
                  <div
                    key={rep}
                    ref={isFirstItem ? item : null}
                    aria-hidden={!isFirstItem || null}
                    className="marquee--item"
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
