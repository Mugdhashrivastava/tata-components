import { useState } from 'react'
import Interiors from './Interiors'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Interiors />
    </>
  )
}

export default App
