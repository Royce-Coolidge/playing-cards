import { useState } from 'react'
import './App.css'
import Cards from './Cards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Cards />
    </div>
  )
}

export default App
