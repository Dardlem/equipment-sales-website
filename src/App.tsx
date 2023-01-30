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
import CMS from './pages/CMS'
import { UserProvider } from './context/UserContext'
import Login from './pages/Login'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'


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
    <UserProvider>
      <ShoppingCartProvider data={data}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/*" element={<Products data={data} />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path='/help' element={<Help />} />
            <Route path="/cms" element={<CMS data={data}/>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            {
              GenerateSubroutes(data)
            }
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </UserProvider>
  )
}

export default App;