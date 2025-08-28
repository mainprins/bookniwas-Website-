import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../stores/AuthContext'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const { isAuthenticated, setIsAuthenticated, setAuthUser,authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("https://bookniwas-website-backend.onrender.com/api/auth/login", formData, { withCredentials: true });
      localStorage.setItem('auth', 'true');
      setAuthUser(res.data.authUser);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Sorry, some error occurred while logging in.", error.response?.data?.message)
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    if(authUser){
       setIsAuthenticated(true);
    }
  },[authUser]);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return (
    <div className='min-h-110 h-[100vh] w-[100vw] flex'>
      <div id="left" className='w-full md:w-1/2 bg-darkest justify-center items-center flex flex-col gap-4'>
        <div id="top" className='w-full justify-center flex items-center flex-col gap-3'>
          <h1 className='text-3xl font-bold text-lightest'>WELCOME BACK</h1>
          <span className='text-lighter'>Great to see you again</span>
        </div>
        <form onSubmit={handleLogin} className='flex flex-col w-full items-center gap-3'>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className='outline-none bg-darker text-lightest w-60 rounded-xl p-3'
          />
          <input
            type="password"
            name="password"
            className='bg-darker text-lightest outline-none w-60 rounded-xl p-3'
            placeholder="Enter your Password"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button type="submit" className='bg-darkest ring-1 ring-lighter text-lighter rounded-md px-6 py-3 mt-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]'>Login</button>
        </form>
        <div id="bottom">
          <span className='text-lighter'>
            Don't have an account?{' '}
            <Link to="/register">
              <span className='hover:underline hover:text-lightest transition-all duration-500 cursor-pointer'>Signup</span>
            </Link>
          </span>
        </div>
      </div>
      <div id="right" className='w-1/2 hidden md:flex justify-center items-center bg-darkest'>
        <figure className='w-[80%] rounded-xl bg-lighter items-center flex justify-center p-8'>
          <img
            src="/loginPoster.svg"
            alt="loginPoster"
            style={{ width: '60%', height: '60%', objectFit: 'contain' }}
          />
        </figure>

      </div>
    </div>
  )
}

export default LoginPage
