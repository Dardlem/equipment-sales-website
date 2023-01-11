import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import LandingPage from './pages/LandingPage'
import News from './pages/News'
import Products from './pages/Products'
import GenerateSubroutes from './helpers/GenerateSubRoutes'
import ShoppingCart from './components/ShoppingCart'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import Help from './pages/Help'

function App() {

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Products/*" element={<Products />} />
          <Route path="/News" element={<News />} />
          <Route path="/About" element={<About />} />
          <Route path='/Help' element={<Help />} />
          {
            GenerateSubroutes()
          }
        </Routes>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
