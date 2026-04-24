<script setup lang="ts">
import { Marqy } from 'marqy/vue'
import { ref } from 'vue'

const speed = ref(0.5)
const direction = ref<'left' | 'right' | 'up' | 'down'>('left')
const pauseOnHover = ref(false)
</script>

<template>
  <div class="@container">
    <div
      class="flex flex-col items-center justify-between gap-20 bg-white/10 p-20 rounded-5 mb-10 @min-[60rem]:flex-row"
    >
      <label class="flex items-center gap-x-10 w-full @min-[60rem]:w-auto">
        <span class="text-p0 shrink-0">speed</span>
        <div class="flex p-3 bg-white/10 rounded-3 grow">
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            v-model.number="speed"
            class="bg-white/30 h-14 min-w-150 rounded-2"
          />
        </div>
        <span class="text-p0 shrink-0 tabular-nums text-neon">{{
          speed.toFixed(1)
        }}</span>
      </label>
      <div
        class="flex justify-between w-full border-t border-white/20 pt-20 @min-[60rem]:pt-0 @min-[60rem]:border-0 @min-[60rem]:contents"
      >
        <label class="flex items-center gap-x-10">
          <span class="text-p0">direction</span>
          <select
            v-model="direction"
            class="text-neon bg-neon/20 rounded-3 uppercase h-20 tracking-10 text-p0 outline-none appearance-none px-5 w-auto text-center"
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
