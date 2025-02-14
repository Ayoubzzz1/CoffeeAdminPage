import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import Home from './Pages/Home'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Home/>
   </>
  )
}
