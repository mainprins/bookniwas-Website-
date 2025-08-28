import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../stores/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const { isAuthenticated, setIsAuthenticated, setAuthUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: 'borrower',
  })

  const [profilePic, setProfilePic] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('fullname', formData.fullname)
      data.append('email', formData.email)
      data.append('password', formData.password)
      data.append('role', formData.role)
      data.append('profilePic', profilePic)

      const res = await axios.post(
        'https://bookniwas-website-backend.onrender.com/api/auth/register',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      toast.success(res.data.message);
      localStorage.setItem('auth', 'true');
      setAuthUser(res.data.authUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Sorry, some error occurred while registering.", error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return (
    <div className='min-h-110 h-[100vh] w-[100vw] flex'>
      <div id="left" className='w-full md:w-1/2 bg-darkest justify-center items-center flex flex-col gap-4'>
        <div id="top" className='w-full justify-center flex items-center flex-col gap-3'>
          <h1 className='text-3xl font-bold text-lightest'>REGISTER NOW</h1>
          <span className='text-lighter'>Excited to see you connect</span>
        </div>
        <form onSubmit={handleRegister} className='flex flex-col w-full items-center gap-3'>
          <input
            type="text"
            name="fullname"
            className='outline-none bg-darker text-lightest w-60 rounded-xl p-3'
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullname: e.target.value }))
            }
            placeholder="Enter Your Fullname"
          />
          <input
            type="email"
            name="email"
            className='outline-none bg-darker text-lightest w-60 rounded-xl p-3'
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter Your Email"
          />
          <input
            type="password"
            name="password"
            className='outline-none bg-darker text-lightest w-60 rounded-xl p-3'
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter your Password"
          />
          <div className='text-lighter'>
            <span>Your Role :</span>
            <select
              value={formData.role}
              className='bg-darker text-lightest p-3 rounded-md ml-4'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="borrower">borrower</option>
              <option value="librarian">librarian</option>
            </select>
          </div>
          <label className='mt-4 cursor-pointer'>
            <input type="file" name='profilePic' className='hidden' accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} />
            <span className='bg-darker p-3 rounded-md text-lightest'>Upload Profile Pic</span>
          </label>
          <button type="submit" className='bg-darkest ring-1 ring-lighter text-lighter rounded-md px-6 py-3 mt-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]'>Register</button>
        </form>
        <div id="bottom">
          <span className='text-lighter'>
            Already have an account?{' '}
            <Link to="/login">
              <span className='hover:underline hover:text-lightest cursor-pointer'>Login</span>
            </Link>
          </span>
        </div>
      </div>
      <div id="right" className='w-1/2 hidden md:flex justify-center items-center bg-darkest'>
        <figure className='w-[80%] rounded-xl bg-lighter items-center flex justify-center p-8'>
          <img
            src="/registerPoster.svg"
            alt="registerPoster"
            style={{ width: '60%', height: '60%', objectFit: 'contain' }}
          />
        </figure>

      </div>
    </div>
  )
}

export default RegisterPage
