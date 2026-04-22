import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['p0', 'p1', 'p2', 'p3', 'p4', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs))
