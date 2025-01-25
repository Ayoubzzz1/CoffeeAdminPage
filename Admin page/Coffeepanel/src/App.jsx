
import './App.css'
import Drawer from './Drawer/Drawer'

import { BrowserRouter } from 'react-router-dom'
import PageRoutes from './Pages/PageRoutes'
function App() {

  return (
    <BrowserRouter>
    <Drawer />
  </BrowserRouter>
  )
}

export default App
