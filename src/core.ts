export type MarqyDirection = 'left' | 'right' | 'up' | 'down'

export interface MarqyDimensions {
  width: number
  height: number
}

export function calcReps(containerSize: number, itemSize: number): number {
  return itemSize > 0 ? Math.ceil(containerSize / itemSize) : 1
}

export function calcAnimationDuration(
  itemDimension: number,
  reps: number,
  speed: number
): string {
  return `${((itemDimension ?? 0) * reps) / (100 * speed)}s`
}

export function createResizeObserver(
  node: Element,
  callback: (dims: MarqyDimensions) => void
): () => void {
  const ro = new ResizeObserver(([entry]) =>
    callback({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    })
  )
  ro.observe(node)
  return () => ro.disconnect()
}
