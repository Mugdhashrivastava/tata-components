import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ExpenseForm from './ExpenseForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<ExpenseForm />
    </>
  )
}

export default App
