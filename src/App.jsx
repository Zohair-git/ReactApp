import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Component/Navbar'
import Login from './Pages/Login'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import ToDo from './Pages/ToDo';
import Generic from './Pages/Generic';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/todo' element={<ToDo/>}/>
        <Route path='/generic' element={<Generic/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />


      
      </Routes>
    </BrowserRouter>
  )
}
export default App
