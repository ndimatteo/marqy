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
      className="inline-flex clean-btn cursor-pointer p-10"
    >
      <span
        className={cn('text-p0 uppercase tracking-10 py-4 border-b', {
          'animate-flicker-opacity': isCopying,
        })}
      >
        {isCopying ? 'Copied!' : 'Copy'}
      </span>
    </button>
  )
}
