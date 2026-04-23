<script lang="ts">
  import {
    type MarqyDirection,
    calcReps,
    calcAnimationDuration,
    createResizeObserver,
  } from '../core'
  import type { Snippet } from 'svelte'

  interface Props {
    speed?: number
    direction?: MarqyDirection
    pauseOnHover?: boolean
    manual?: boolean
    children: Snippet
    [key: string]: unknown
  }

  let {
    speed = 0.5,
    direction = 'left' as MarqyDirection,
    pauseOnHover = false,
    manual = false,
    children,
    ...rest
  }: Props = $props()

  let containerEl = $state<HTMLElement | null>(null)
  let containerDims = $state({ width: 0, height: 0 })
  let itemDims = $state({ width: 0, height: 0 })
  let reps = $state(1)

  const isVertical = $derived(direction === 'up' || direction === 'down')

  const animationDuration = $derived(
    calcAnimationDuration(
      isVertical ? itemDims.height : itemDims.width,
      reps,
      speed
    )
  )

  $effect(() => {
    if (!containerEl) return
    return createResizeObserver(containerEl, (d) => {
      containerDims = d
    })
  })

  $effect(() => {
    const cSize = isVertical ? containerDims.height : containerDims.width
    const iSize = isVertical ? itemDims.height : itemDims.width
    reps = calcReps(cSize, iSize)
  })

  function observeFirstItem(node: HTMLElement, isFirst: boolean) {
    if (!isFirst) return {}
    const cleanup = createResizeObserver(node, (d) => {
      itemDims = d
    })
    return { destroy: cleanup }
  }
</script>

<div
  bind:this={containerEl}
  data-marqy=""
  data-direction={direction}
  data-pause-on-hover={pauseOnHover ? '' : undefined}
  {...rest}
>
  <div data-marqy-inner="">
    {#each [0, 1] as clone}
      <div
        data-marqy-content=""
        {...manual
          ? { 'data-marqy-static': animationDuration }
          : { style: `animation-duration: ${animationDuration}` }}
      >
        {#each Array.from({ length: reps }, (_, i) => i) as rep}
          <div
            use:observeFirstItem={clone === 0 && rep === 0}
            aria-hidden={!(clone === 0 && rep === 0) || undefined}
            data-marqy-item=""
          >
            {@render children()}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
