import { Marqy } from 'marqy'

import Divider from './Divider'

export default function MarqyCredits() {
  return (
    <section>
      <Marqy speed={1} direction="right" pauseOnHover>
        <p className="uppercase py-20 text-p1 whitespace-pre">
          <Divider />
          Built_by{' '}
          <a
            href="https://www.nickdimatteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon hover:animate-flicker-opacity"
          >
            Nick DiMatteo
          </a>{' '}
          &{' '}
          <a
            href="https://www.mikewagz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon hover:animate-flicker-opacity"
          >
            Mike Wagz
          </a>
        </p>
      </Marqy>
    </section>
  )
}
