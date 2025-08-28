
import { Book, CircleGauge, Rows3 } from "lucide-react"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../stores/AuthContext'
import toast from "react-hot-toast"

const LeftBar = () => {

   const location = useLocation();
   const isDashboard = location.pathname === '/home/dashboard';
   const isBooks = location.pathname === '/home/books';
   const isAllBorrows = location.pathname === '/home/allBorrows';

   const { setIsAuthenticated, setAuthUser, authUser } = useContext(AuthContext);

   const navigate = useNavigate();

   const handleLogout = async (e) => {
      try {
         const res = await axios.post("https://bookniwas-website-backend.onrender.com/api/auth/logout", {}, { withCredentials: true });
         localStorage.removeItem('auth');
         setAuthUser(null);
         setIsAuthenticated(false);
         toast.success(res.data.message);
      } catch (error) {
         console.log("Sorry, some error occured while logging out.", error.response?.data?.message);
         toast.error(error.response?.data?.message);
      }

   }

   return (


      <div className="w-65 hidden bg-darkest pt-4 pl-4 md:flex flex-col gap-3 h-[100vh] min-h-110 text-lighter">
         <div className="">
            <span className="text-2xl font-bold tracking-widest">BOOK<span className="text-lightest">N</span>IWAS<span className="text-lightest">.</span></span>
         </div>
         <div className="w-full flex gap-3 items-center min-h-10 py-3">
            <figure className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-600">
               {authUser?.profilePic ? (
                  <img
                     src={`https://bookniwas-website-backend.onrender.com/uploads/${authUser.profilePic}`}
                     alt="Profile"
                     className="w-full h-full object-cover"
                  />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-darkest font-bold text-lg">
                     {authUser?.fullname?.[0]?.toUpperCase()}
                  </div>
               )}
            </figure>
            <div className="flex flex-col">
               <span className="font-bold tracking-wide text-lightest">{authUser.fullname}</span>
               <p className="text-sm tracking-widest">{authUser.role}</p>
            </div>
         </div>
         <div className="flex flex-col gap-3">
            <div onClick={() => { navigate('/home/dashboard') }} className={`w-full ${isDashboard && 'bg-darker text-lightest'} min-h-15 flex gap-4 p-4 items-center cursor-pointer`}>
               <CircleGauge />
               <span>Dashboard</span>
            </div>
            <div onClick={() => { navigate('/home/books') }} className={`w-full ${isBooks && 'bg-darker text-lightest'} min-h-15 flex gap-4 p-4 items-center cursor-pointer`}>
               <Book />
               <span>Books</span>
            </div>
            <div onClick={() => { navigate('/home/allBorrows') }} className={`w-full ${isAllBorrows && 'bg-darker text-lightest'} min-h-15 flex gap-4 p-4 items-center cursor-pointer`}>
               <Rows3 />
               <span>All Borrows</span>
            </div>
         </div>
         <div className="w-full flex items-center justify-center">
            <button onClick={handleLogout} className='bg-darkest ring-1 ring-lighter text-lighter rounded-md px-6 py-3 mt-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]'>Logout</button>
         </div>
      </div>

   )
}

export default LeftBar