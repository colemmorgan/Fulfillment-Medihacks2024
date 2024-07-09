
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';
import useGetUserData from './firebase/getters/useGetUserData';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userDataAtom, userDataLoading } from './atoms/user-data-atoms';


function App() {


  const [user] = useAuthState(auth);
  const { userData, loading } = useGetUserData(user?.uid);
  const [_, setUserData] = useRecoilState(userDataAtom)
  const [__, setUserDataLoading] = useRecoilState(userDataLoading)

  useEffect(() => {
    console.log("fired")
    setUserData(userData)
  },[userData])

  useEffect(() => {
    console.log("fired")
    setUserDataLoading(loading)
  },[loading])

  return (
    <>
      <Router>   
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/courses/:courseId' element={<Quiz/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
