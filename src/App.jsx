import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Dashboard from './pages/Dashboard'
import FinanceContext from './contexts/FinanceContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FinanceContext>
      <Dashboard/>
    </FinanceContext>
  );
}

export default App
