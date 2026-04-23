<script setup lang="ts">
import { Marqy } from 'marqy/vue'
import { ref } from 'vue'

const speed = ref(0.5)
const direction = ref<'left' | 'right' | 'up' | 'down'>('left')
const pauseOnHover = ref(false)
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between gap-20 bg-white/10 p-20 rounded-5 mb-10"
    >
      <label class="flex items-center gap-x-5">
        <span class="text-p0">speed</span>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          v-model.number="speed"
          class="bg-white/20 h-10 rounded-3"
        />
        <span class="text-p0 text-neon">{{ speed.toFixed(1) }}</span>
      </label>
      <label class="flex items-center gap-x-5">
        <span class="text-p0">direction</span>
        <select
          v-model="direction"
          class="text-neon bg-neon/20 rounded-3 uppercase h-20 tracking-10 text-p0"
        >
          <option>left</option>
          <option>right</option>
          <option>up</option>
          <option>down</option>
        </select>
      </label>
      <label
        class="flex items-center gap-x-5 bg-white/20 text-white/60 has-checked:text-neon rounded-3 cursor-pointer has-checked:bg-neon/20 px-5 h-20"
      >
        <span class="shrink-0 text-p0 uppercase tracking-10 select-none"
          >pause on hover</span
        >
        <input type="checkbox" v-model="pauseOnHover" class="sr-only" />
      </label>
    </div>

    <div
      class="border border-purple rounded-5 h-100 flex flex-col justify-center"
    >
      <Marqy
        :speed="speed"
        :direction="direction"
        :pause-on-hover="pauseOnHover"
        :class="direction === 'up' || direction === 'down' ? 'h-full' : ''"
      >
        <p class="text-center text-jumbo py-10 uppercase whitespace-pre">
          <span class="text-current opacity-40">{{
            direction === 'up' || direction === 'down' ? '' : ` // `
          }}</span
          >Marqy Vue
        </p>
      </Marqy>
    </div>
  </div>
</template>
