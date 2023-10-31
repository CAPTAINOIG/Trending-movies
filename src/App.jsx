import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './pages/Home'
import Moviedetail from './pages/Moviedetail'



function App() {
  

  return (
    <>
    <div className='font-serif'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/detail/:id' element={<Moviedetail/>}/>
    </Routes>
    <Footer/>
    </div>
    </>
  )
}

export default App
