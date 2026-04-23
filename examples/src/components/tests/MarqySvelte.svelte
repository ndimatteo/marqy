<script lang="ts">
  import { Marqy } from 'marqy/svelte'

  let speed = $state(0.5)
  let direction = $state<'left' | 'right' | 'up' | 'down'>('left')
  let pauseOnHover = $state(false)

  const isVertical = $derived(direction === 'up' || direction === 'down')
</script>

<div>
  <div class="flex items-center justify-between gap-20 bg-white/10 p-20 rounded-5 mb-10">
    <label class="flex items-center gap-x-5">
      <span class="text-p0">speed</span>
      <input type="range" min="0.1" max="2" step="0.1" bind:value={speed} class="bg-white/20 h-10 rounded-3" />
      <span class="text-p0 text-neon">{speed.toFixed(1)}</span>
    </label>
    <label class="flex items-center gap-x-5">
      <span class="text-p0">direction</span>
      <select bind:value={direction} class="text-neon bg-neon/20 rounded-3 uppercase h-20 tracking-10 text-p0">
        <option>left</option>
        <option>right</option>
        <option>up</option>
        <option>down</option>
      </select>
    </label>
    <label class="flex items-center gap-x-5 bg-white/20 text-white/60 has-checked:text-neon rounded-3 cursor-pointer has-checked:bg-neon/20 px-5 h-20">
      <span class="shrink-0 text-p0 uppercase tracking-10 select-none">pause on hover</span>
      <input type="checkbox" bind:checked={pauseOnHover} class="sr-only"/>
    </label>
  </div>

  <div class="border border-purple rounded-5 h-100 flex flex-col justify-center">
    <Marqy
      {speed}
      {direction}
      pauseOnHover={pauseOnHover}
      class={isVertical ? 'h-100' : ''}
    >
      {#snippet children()}
      <p class="text-center text-jumbo py-10 uppercase whitespace-pre">
        <span class="text-current opacity-40">{isVertical ? '' : ` // `}</span>Marqy Svelte
      </p>
      {/snippet}
    </Marqy>
  </div>
</div>
