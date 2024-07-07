
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {


  return (
    <>
      <Router>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
