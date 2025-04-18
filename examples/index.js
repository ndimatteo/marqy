import React, { useReducer } from 'react'
import { render } from 'react-dom'
import { Marqy } from '../dist/marqy.js'
import '../styles.css'

function App() {
  const [count, increment] = useReducer((x) => x + 1, 0)
  const [shown, toggle] = useReducer((x) => !x, true)

  return (
    <div>
      <Marqy>
        <p className="text-32 py-025 mr-025">Default configuration ●</p>
      </Marqy>
      <Marqy className="invert">
        <p className="text-32 py-025 mr-025">
          Synchronized speeds even if content length is different.
        </p>
      </Marqy>
      <Marqy direction="right">
        <p className="text-32 py-025 mr-025">You can change the direction…</p>
      </Marqy>
      <Marqy className="invert" direction="right" speed="0.25">
        <p className="text-32 py-025 mr-025">And customize the speed!</p>
      </Marqy>
      <Marqy direction="right" speed="0.4">
        <div className="flex items-center py-05">
          <p className="text-32 mx-05">Render whatever you want:</p>
          <img
            width="100"
            src="https://picsum.photos/seed/picsum/550/350"
            alt="Lorem Picsum"
          />
        </div>
      </Marqy>
      <Marqy className="invert" speed="0.7" pauseOnHover>
        <div className="flex items-center py-025">
          <p className="text-20">Pause on hover for interactivity:</p>
          <button className="mx-05" onClick={increment}>
            Count: {count}
          </button>
        </div>
      </Marqy>
      <div className="p-05">
        <button onClick={toggle}>Toggle</button>
      </div>
      {shown ? (
        <Marqy className="invert text-20 py-05">
          <p className="mx-05">
            Toggle me on or off to make sure I have no memory leaks!
          </p>
        </Marqy>
      ) : null}
      {/* Child with no width */}
      <Marqy>
        <p className="text-32 py-025"></p>
      </Marqy>
    </div>
  )
}

render(<App />, document.getElementById('root'))
