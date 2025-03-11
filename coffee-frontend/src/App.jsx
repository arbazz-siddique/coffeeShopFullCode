
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Pages/Footer'
import MenuView from './Pages/MenuView'
import Home from './Pages/Home'
import { ModeToggle } from './components/mode-toggle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './Pages/sub-component/Cart'
import Order from './Pages/sub-component/Order'
import Login from './Pages/sub-component/login'
import Signup from './Pages/sub-component/signup'

import ContactSection from './Pages/sub-component/ContactSection'
import Reservation from './Pages/sub-component/Reservation'


// import Cart from './Pages/sub-component/Cart'

function App() {


  return (
    <>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<Order/>} />
          <Route path='/contact' element={<ContactSection/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/reservations' element={<Reservation/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/menu/:id' element={<MenuView/>} />
          
          </Routes>
          </main>
          {/* <Cart /> */}
          <Footer/>
          <ToastContainer position='bottom-right'/>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
