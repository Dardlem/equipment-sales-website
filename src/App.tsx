import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import LandingPage from './pages/LandingPage'
import News from './pages/News'
import Products from './pages/Products'
import GenerateSubroutes from './helpers/GenerateSubRoutes'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import Help from './pages/Help'
import fetchData from './helpers/fetch'
import { useEffect, useState } from 'react'
import { Product, ProductList } from './interfaces'


function App() {
const [data, setData] = useState<any>({
  products: {
    "product1": {
        name: "default",
        price: 0,
        description: "default",
        preview: "default.jpg"
    }
  }
})

useEffect(() => {
  fetchData('products/').then((data) => setData(data));

  return () => {
    null;
  }
}, [])

  return (
    <ShoppingCartProvider data={data}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Products/*" element={<Products data={data} />} />
          <Route path="/News" element={<News />} />
          <Route path="/About" element={<About />} />
          <Route path='/Help' element={<Help />} />
          {
            GenerateSubroutes(data)
          }
        </Routes>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App;