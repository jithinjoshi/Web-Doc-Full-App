import React, { useEffect } from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import Login from '../../components/Users/Signin'
import Footer from '../../components/Users/Footer'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/User/userSlice'
import { useNavigate } from 'react-router-dom'



const Signin = () => {
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
        <div className='mt-5 mb-5 sm:mb-6'>
        <Login/>
        </div>
        
        <Footer/>
    </>
  )
}

export default Signin