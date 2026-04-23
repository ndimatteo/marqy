<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import {
  type MarqyDirection,
  calcReps,
  calcAnimationDuration,
  createResizeObserver,
} from '../core'

interface Props {
  speed?: number
  direction?: MarqyDirection
  pauseOnHover?: boolean
  manual?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: 0.5,
  direction: 'left',
  pauseOnHover: false,
  manual: false,
})

const containerRef = ref<HTMLElement | null>(null)
const itemRef = ref<HTMLElement | null>(null)
const containerDims = ref({ width: 0, height: 0 })
const itemDims = ref({ width: 0, height: 0 })
const reps = ref(1)

const isVertical = computed(
  () => props.direction === 'up' || props.direction === 'down'
)

const animationDuration = computed(() =>
  calcAnimationDuration(
    isVertical.value ? itemDims.value.height : itemDims.value.width,
    reps.value,
    props.speed
  )
)

let cleanupContainer: (() => void) | null = null
let cleanupItem: (() => void) | null = null

watch(containerRef, (el) => {
  cleanupContainer?.()
  cleanupContainer = null
  if (el) cleanupContainer = createResizeObserver(el, (d) => { containerDims.value = d })
})

watch(itemRef, (el) => {
  cleanupItem?.()
  cleanupItem = null
  if (el) cleanupItem = createResizeObserver(el, (d) => { itemDims.value = d })
})

watch([containerDims, itemDims, isVertical], () => {
  const cSize = isVertical.value ? containerDims.value.height : containerDims.value.width
  const iSize = isVertical.value ? itemDims.value.height : itemDims.value.width
  reps.value = calcReps(cSize, iSize)
})

onUnmounted(() => {
  cleanupContainer?.()
  cleanupItem?.()
})
</script>

<template>
  <div
    ref="containerRef"
    data-marqy=""
    :data-direction="direction"
    :data-pause-on-hover="pauseOnHover ? '' : undefined"
    v-bind="$attrs"
  >
    <div data-marqy-inner="">
      <div
        v-for="clone in [0, 1]"
        :key="clone"
        data-marqy-content=""
        v-bind="
          manual
            ? { 'data-marqy-static': animationDuration }
            : { style: `animation-duration: ${animationDuration}` }
        "
      >
        <div
          v-for="rep in Array.from({ length: reps }, (_, i) => i)"
          :key="rep"
          :ref="(el) => { if (clone === 0 && rep === 0) itemRef = el as HTMLElement | null }"
          :aria-hidden="!(clone === 0 && rep === 0) || undefined"
          data-marqy-item=""
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
