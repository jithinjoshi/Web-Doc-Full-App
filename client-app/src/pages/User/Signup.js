import React, { useEffect } from 'react'
import Register from '../../components/Users/Signup'
import NavBar from '../../components/Users/NavBar/NavBar'
import Footer from '../../components/Users/Footer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/User/userSlice'

const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(()=>{
    if(user){
      return navigate('/')
    }

  },[user]);
  return (
    <>
        <NavBar/>
        <Register/>
        <Footer/>
    </>
  )
}

export default Signup