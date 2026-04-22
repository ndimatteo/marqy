import { Marqy } from 'marqy'

import Divider from './Divider'

export default function MarqySpeedDemo() {
  return (
    <section>
      <Marqy speed={0.2} direction="right" className="border-t">
        <p className="uppercase py-20 text-p1 whitespace-pre">
          <Divider />
          BPM_0.5: Chillwave
        </p>
      </Marqy>
      <Marqy speed={0.5} direction="right" className="border-t">
        <p className="uppercase py-20 text-p1 whitespace-pre">
          <Divider />
          BPM_1: House
        </p>
      </Marqy>
      <Marqy speed={1.5} direction="right" className="border-t">
        <p className="uppercase py-20 text-p1 whitespace-pre">
          <Divider />
          BPM_1.5: Techno
        </p>
      </Marqy>
      <Marqy speed={3} direction="right" className="border-t">
        <p className="uppercase py-20 text-p1 whitespace-pre">
          <Divider />
          BPM_3: Dubstep
        </p>
      </Marqy>
    </section>
  )
}
