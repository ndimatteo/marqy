import { cn } from '../lib/cn'
import { useCopyText } from '../lib/hooks/useCopyText'

type CopyButtonProps = {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [isCopying, copyText] = useCopyText()

  return (
    <button
      onClick={() => copyText(text)}
      data-copying={isCopying}
      className="absolute top-10 right-10 flex clean-btn cursor-pointer rounded-3 hover:bg-white/20 bg-white/10 min-w-60 px-5 h-20 items-center justify-center"
    >
      <span
        className={cn('text-p0 uppercase tracking-10', {
          // py-4 border-b
          'animate-flicker-opacity': isCopying,
        })}
      >
        {isCopying ? 'Copied' : 'Copy'}
      </span>
    </button>
  )
}
