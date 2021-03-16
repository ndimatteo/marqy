import React, { useReducer } from 'react'
import { render } from 'react-dom'
import { Marqy } from '../dist/marqy.modern.js'
import '../styles.css'

function App() {
  const [count, increment] = useReducer((c) => c + 1, 0)
  return (
    <div>
      <Marqy>
        <h1 className="py-025 mr-025">Default configuration ●</h1>
      </Marqy>
      <Marqy className="invert">
        <h1 className="py-025 mr-025">
          Synchronized speeds even if content length is different.
        </h1>
      </Marqy>
      <Marqy direction="right">
        <h1 className="py-025 mr-025">You can change the direction…</h1>
      </Marqy>
      <Marqy className="invert" direction="right" speed="0.25">
        <h1 className="py-025 mr-025">And customize the speed!</h1>
      </Marqy>
      <Marqy direction="right" speed="0.4">
        <div className="flex items-center py-05">
          <h1 className="mx-05">Render whatever you want:</h1>
          <img
            width="100"
            src="https://www.fillmurray.com/g/200/200"
            alt="Bill Murray"
          />
        </div>
      </Marqy>
      <Marqy className="invert" speed="0.7" pauseOnHover>
        <div className="flex items-center py-025">
          <h1>Pause on hover for interactivity:</h1>
          <button className="mx-05" onClick={increment}>
            Count: {count}
          </button>
        </div>
      </Marqy>
    </div>
  )
}

render(<App />, document.getElementById('root'))
