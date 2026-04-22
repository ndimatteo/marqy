import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Marqy } from 'marqy'
import { RadioGroup } from '@base-ui-components/react/radio-group'
import { Radio } from '@base-ui-components/react/radio'
import { Slider } from '@base-ui-components/react/slider'
import { Switch } from '@base-ui-components/react/switch'
import { ResizableBox } from 'react-resizable'
import useDimensions from 'react-cool-dimensions'

import { cn } from '../lib/cn'
import Divider from './Divider'

const DIRECTIONS = ['left', 'right', 'up', 'down'] as const
type Direction = (typeof DIRECTIONS)[number]

type DragHandleProps = React.HTMLAttributes<HTMLDivElement> & {
  handleAxis?: string
}

const DragHandle = forwardRef<HTMLDivElement, DragHandleProps>((props, ref) => {
  const { handleAxis, ...restProps } = props
  return (
    <div
      ref={ref}
      className={cn(
        'flex justify-center items-center absolute bg-purple rounded-2 z-4 cursor-grab active:cursor-grabbing text-center',
        {
          // Y-axis
          'w-55 h-8 -translate-y-1/2 -translate-x-1/2 after:absolute after:h-px after:w-20 after:bg-black/30':
            handleAxis === 'n' || handleAxis === 's',
          'top-0 left-1/2': handleAxis === 'n',
          'top-full left-1/2': handleAxis === 's',

          // X-axis
          'h-55 w-8 -translate-y-1/2 -translate-x-1/2 after:absolute after:w-px after:h-20 after:bg-black/30':
            handleAxis === 'w' || handleAxis === 'e',
          'left-0 top-1/2': handleAxis === 'w',
          'left-full top-1/2': handleAxis === 'e',
        },
      )}
      {...restProps}
    />
  )
})

export default function MarqyPlayground() {
  const $marqyContainer = useRef<HTMLDivElement>(null)
  const { observe, height, width } = useDimensions<HTMLDivElement>({
    useBorderBoxSize: true,
  })
  const [itemCount, setItemCount] = useState<number>(0)
  const [duration, setDuration] = useState('')

  const DEFAULT_TEXT = 'marqy'
  const [size, setSize] = useState({ width: width - 40, height: -40 })
  const [isResizing, setIsResizing] = useState(false)
  const [text, setText] = useState(DEFAULT_TEXT)
  const [direction, setDirection] = useState<Direction>('left')
  const [speed, setSpeed] = useState(1)
  const [pauseOnHover, setPauseOnHover] = useState(false)
  const [manual, setManual] = useState(false)
  const [showXRay, setShowXRay] = useState(false)

  const [gsapEnabled, setGsapEnabled] = useState(false)

  const isVertical = direction === 'up' || direction === 'down'
  const overlayClass = 'after:absolute after:inset-y-0 after:bg-black/80'

  useEffect(() => {
    const container = $marqyContainer.current
    const $content = gsap.utils.toArray<HTMLElement>(
      '[data-marqy-content]',
      container,
    )
    if (!container || !$content.length) return

    if (!gsapEnabled) {
      // Only kill stale tweens — don't touch inline styles, CSS owns the transform
      gsap.killTweensOf($content)
      return
    }

    let tween: gsap.core.Tween | null = null

    const buildTween = () => {
      const dur = parseFloat($content[0].dataset.marqyStatic ?? '')
      if (!dur) return

      gsap.killTweensOf(tween)
      tween?.kill()
      gsap.killTweensOf($content)
      gsap.set($content, { xPercent: 0, yPercent: 0 })

      if (direction === 'down') {
        // CSS marqyD: translate from -100% → 0
        gsap.set($content, { yPercent: -100 })
        tween = gsap.to($content, {
          yPercent: 0,
          ease: 'none',
          duration: dur,
          repeat: -1,
        })
      } else if (direction === 'up') {
        // CSS marqyU: translate from 0 → -100%
        tween = gsap.to($content, {
          yPercent: -100,
          ease: 'none',
          duration: dur,
          repeat: -1,
        })
      } else {
        tween = gsap.to($content, {
          xPercent: direction === 'left' ? -100 : 100,
          ease: 'none',
          duration: dur,
          repeat: -1,
        })
      }

      // If cursor is already inside the container (e.g. enabled via button click),
      // immediately apply the paused state so hover works without needing a re-enter
      if (pauseOnHover && container.matches(':hover')) {
        gsap.set(tween, { timeScale: 0 })
      }
    }

    // attrObserver handles speed/dimension changes without a full effect re-run
    const attrObserver = new MutationObserver(buildTween)
    attrObserver.observe($content[0], {
      attributes: true,
      attributeFilter: ['data-marqy-static'],
    })
    buildTween()

    const slowDown = () => {
      if (!tween) return
      gsap.to(tween, {
        timeScale: 0,
        duration: 1.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    const speedUp = () => {
      if (!tween) return
      gsap.to(tween, {
        timeScale: 1,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    if (pauseOnHover) {
      container.addEventListener('mouseenter', slowDown)
      container.addEventListener('mouseleave', speedUp)
    }

    return () => {
      attrObserver.disconnect()
      gsap.killTweensOf(tween)
      tween?.kill()
      gsap.killTweensOf($content)
      // clearProps lets CSS animation take over cleanly when GSAP is disabled
      gsap.set($content, { clearProps: 'transform,xPercent,yPercent' })
      container.removeEventListener('mouseenter', slowDown)
      container.removeEventListener('mouseleave', speedUp)
    }
  }, [gsapEnabled, direction, isVertical, pauseOnHover])

  function onResize(
    _: any,
    { size }: { size: { width: number; height: number } },
  ) {
    setSize({ width: size.width, height: size.height })
  }

  useEffect(() => {
    const el = $marqyContainer.current
    if (!el) return

    const read = () => {
      const firstContent = el.querySelector<HTMLElement>('[data-marqy-content]')
      setDuration(firstContent?.style.animationDuration ?? '')
      setItemCount(
        firstContent?.querySelectorAll('[data-marqy-item]').length ?? 0,
      )
    }

    const observer = new MutationObserver(read)
    observer.observe(el, {
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
      childList: true,
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setSize({ width: width - 40, height: height - 40 })
  }, [isVertical, width, height])

  return (
    <div className={cn('relative grid grid-cols-8 gap-20 sm:gap-40')}>
      {/* Controls */}
      <div
        className={cn(
          'relative col-span-8 md:col-span-4 backdrop-blur-md z-1 rounded-5',
          'after:-left-40 after:-right-40 after:-z-1',
          overlayClass,
        )}
      >
        <div
          ref={observe}
          className="flex flex-col gap-20 bg-white/10 p-20 rounded-5"
        >
          {/* Text */}
          <div className="relative flex justify-between items-center gap-10">
            <h3 className="text-p1 sr-only">Text</h3>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-4 h-40 pr-75 bg-white/10 font-headline font-bold text-15 uppercase text-white px-10 py-0 focus:outline-none"
            />

            <button
              disabled={text === DEFAULT_TEXT}
              onClick={() => setText(DEFAULT_TEXT)}
              className="disabled:cursor-not-allowed clean-btn cursor-pointer rounded-3 flex items-center justify-center absolute right-10 h-20 w-55 bg-white/20 text-white disabled:text-white/40 disabled:bg-white/10"
            >
              <span className="text-p0 uppercase tracking-10">Reset</span>
            </button>
          </div>

          {/* Direction */}
          <div className="flex justify-between items-center gap-x-20 border-t border-white/10 pt-20">
            <h3 className="text-p1">direction</h3>
            <RadioGroup
              value={direction}
              onValueChange={(val) => setDirection(val as Direction)}
              className="flex gap-5"
            >
              {DIRECTIONS.map((dir) => (
                <label key={dir} className="flex items-center cursor-pointer">
                  <Radio.Root
                    value={dir}
                    nativeButton
                    render={<button />}
                    className="clean-btn cursor-pointer rounded-3 data-checked:animate-flicker-opacity hover:bg-white/20 bg-white/10 min-w-55 h-20 flex items-center justify-center data-checked:bg-neon data-checked:text-black transition-colors"
                  >
                    <span className="text-p0 uppercase tracking-10">{dir}</span>
                  </Radio.Root>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Speed */}
          <div className="flex flex-col gap-10 border-t border-white/10 pt-20">
            <div className="flex items-center justify-between gap-x-20">
              <h3 className="text-p1">speed</h3>

              <div className="flex-1 flex items-center justify-end gap-x-10">
                <Slider.Root
                  value={speed}
                  onValueChange={(val) => setSpeed(val as number)}
                  min={0.1}
                  max={3}
                  step={0.1}
                  thumbAlignment="edge-client-only"
                  className="flex flex-col w-full max-w-215"
                >
                  <Slider.Control className="flex items-center h-20 w-full data-dragging:cursor-grabbing">
                    <Slider.Track className="h-20 bg-white/10 rounded-3 w-full relative">
                      <Slider.Indicator>
                        <span className="absolute inset-3 rounded-2 bg-white/50" />
                      </Slider.Indicator>
                      <Slider.Thumb className="flex focus:outline-none cursor-grab px-3">
                        <span className="w-25 h-14 rounded-2 bg-white" />
                      </Slider.Thumb>
                    </Slider.Track>
                  </Slider.Control>
                </Slider.Root>
                <span className="text-p0 shrink-0 tabular-nums text-neon">
                  {speed.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Boolean props */}
          <div className="flex flex-col gap-10 pb-10">
            {[
              {
                name: 'pauseOnHover',
                label: 'pauseOnHover',
                value: pauseOnHover,
                onChange: setPauseOnHover,
              },
              {
                name: 'manual',
                label: 'manual',
                subLabel: 'GSAP',
                value: manual,
                onChange: (checked: boolean) => {
                  setManual(checked)
                  setGsapEnabled(checked)
                },
              },
              {
                name: 'xray',
                label: 'x-ray mode',
                value: showXRay,
                onChange: setShowXRay,
              },
            ].map(({ name, label, subLabel, value, onChange }) => (
              <label
                key={name}
                className="flex items-center justify-between cursor-pointer border-t border-white/10 pt-20"
              >
                <span className="text-p1 flex items-center gap-x-10">
                  {label}
                  {subLabel && (
                    <span className="text-neon text-p0 uppercase bg-neon/20 rounded-2 p-5 tracking-10">
                      {subLabel}
                    </span>
                  )}
                </span>
                <Switch.Root
                  checked={value}
                  onCheckedChange={onChange}
                  className={cn(
                    'w-55 h-20 rounded-3 bg-white/10 relative transition-colors',
                    {
                      'data-checked:bg-neon': name !== 'xray',
                      'data-checked:bg-purple': name === 'xray',
                    },
                  )}
                >
                  <Switch.Thumb className="w-25 h-14 rounded-2 bg-white absolute top-3 left-3 data-checked:translate-x-24 transition-all data-checked:bg-black" />
                </Switch.Root>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="overflow-hidden col-span-8 md:col-span-4 isolate rounded-5 flex justify-center items-center p-20">
        <ResizableBox
          width={size.width}
          height={size.height}
          draggableOpts={{ grid: [20, 20] }}
          axis={isVertical ? 'y' : 'x'}
          resizeHandles={isVertical ? ['n', 's'] : ['w', 'e']}
          minConstraints={isVertical ? [width, 80] : [220, height]}
          maxConstraints={[width - 40, height - 40]}
          handle={<DragHandle />}
          onResize={onResize}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={() => setIsResizing(false)}
          className={cn(
            'absolute border border-purple rounded-5 flex flex-col',
            {
              'cursor-grabbing': isResizing,
            },
          )}
        >
          <span
            className={cn(
              'absolute bottom-full mb-px h-200 z-1 before:absolute before:inset-0 before:bg-white/10 before:z-1 after:absolute after:inset-0 after:bg-black/85',
              {
                '-inset-x-px': !isVertical,
                '-inset-x-21': isVertical,
              },
            )}
          />
          <span
            className={cn(
              'absolute top-full mt-px h-200 z-1 before:absolute before:inset-0 before:bg-white/10 before:z-1 after:absolute after:inset-0 after:bg-black/85',
              {
                '-inset-x-px': !isVertical,
                '-inset-x-21': isVertical,
              },
            )}
          />

          <span
            className={cn(
              'absolute right-full mr-px w-[50vw] z-1 before:absolute before:inset-0 before:bg-white/10 before:z-1 after:absolute after:inset-0 after:bg-black/85',
              {
                '-inset-y-21': !isVertical,
                '-inset-y-px': isVertical,
              },
            )}
          />
          <span
            className={cn(
              'absolute left-full ml-px w-[50vw] z-1 before:absolute before:inset-0 before:bg-white/10 before:z-1 after:absolute after:inset-0 after:bg-black/85',
              {
                '-inset-y-21': !isVertical,
                '-inset-y-px': isVertical,
              },
            )}
          />

          <div
            ref={$marqyContainer}
            style={
              { '--height': `${size.height - 2}px` } as React.CSSProperties
            }
            className={cn(
              'relative flex flex-col items-center justify-center grow',
            )}
          >
            <Marqy
              direction={direction}
              speed={speed}
              pauseOnHover={pauseOnHover}
              manual={manual || gsapEnabled}
              className={cn('select-none', {
                'h-(--height) grow': isVertical,
                'overflow-visible! [&_[data-marqy-content]:last-child]:text-purple/20 [&_[data-marqy-content]:last-child]:[-webkit-text-stroke:1px_var(--color-purple)]':
                  showXRay,
              })}
            >
              <p className="flex justify-center text-h1 text-60 py-20 uppercase whitespace-pre text-center">
                {text?.trim() && (
                  <>
                    {!isVertical && (
                      <Divider value={direction === 'left' ? ' ← ' : ' → '} />
                    )}
                    {isVertical && (
                      <span className="opacity-40 shrink-0">
                        {direction === 'up' ? '↑' : '↓'}
                      </span>
                    )}
                    <span className="text-ellipsis overflow-hidden">
                      {text}
                    </span>
                    {isVertical && (
                      <span className="opacity-40 shrink-0">
                        {direction === 'up' ? '↑' : '↓'}
                      </span>
                    )}
                  </>
                )}
              </p>
            </Marqy>

            {!text?.trim() && (
              <div className="absolute inset-0 flex justify-center items-center select-none">
                <p className="text-h1 text-h1 uppercase text-white/20">
                  not_defined
                </p>
              </div>
            )}

            <span className="select-none backdrop-blur-sm flex gap-x-5 absolute top-0 left-0 text-p0 m-10 text-purple bg-purple/20 p-5 rounded-3">
              <span className="text-purple/50 uppercase">duration</span>
              {duration?.trim() ? duration : 'NA'}
            </span>
            <span className="select-none backdrop-blur-sm flex gap-x-5 absolute top-0 right-0 text-p0 m-10 text-purple bg-purple/20 p-5 rounded-3">
              <span className="text-purple/50 uppercase">reps</span>
              {itemCount}
            </span>

            {manual && (
              <button
                onClick={() => setGsapEnabled((v) => !v)}
                className={cn(
                  'clean-btn cursor-pointer select-none backdrop-blur-sm absolute bottom-0 left-0 m-10 p-5 rounded-3',
                  gsapEnabled
                    ? 'text-neon/50 bg-neon/20'
                    : 'text-black/50 bg-neon',
                )}
              >
                <span className="flex gap-x-5 text-p0 uppercase">
                  {gsapEnabled ? 'Disable' : 'Enable'}
                  <span
                    className={cn(gsapEnabled ? 'text-neon' : 'text-black')}
                  >
                    GSAP
                  </span>
                </span>
              </button>
            )}
          </div>
        </ResizableBox>
      </div>
    </div>
  )
}
