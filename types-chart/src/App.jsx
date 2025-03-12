import { useState } from 'react'

import TypesChart from './TypesChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TypesChart/>
    </>
  )
}

export default App
