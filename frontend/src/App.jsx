import { useContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from './stores/AuthContext'
import BooksPage from './pages/BooksPage'
import BorrowsPage from './pages/BorrowsPage'
import LandingPage from './pages/LandingPage'
import BookDetailsPage from './pages/BookDetailsPage'
import EditBookPage from './pages/EditBookPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {

  const {setIsAuthenticated,setAuthUser,authUser} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/check", {
          withCredentials: true
        });
        localStorage.setItem('auth', 'true');
        setAuthUser(res.data.authUser);
        setIsAuthenticated(true);

      } catch (error) {
        console.error(error.response?.data?.message);
        localStorage.setItem('auth', 'false');
        setAuthUser(null);
        setIsAuthenticated(false);
      } finally {
           setIsLoading(false);   
      }
    };

    checkAuth();
  }, []);
  const router = createBrowserRouter([

    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
    {
      path: '/contact',
      element: <ContactPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
      children: [
        {
          path: '/home/dashboard',
          element: <DashboardPage />
        },
        {
          path: '/home/books',
          element: <BooksPage />
        },
        {
          path: '/home/allBorrows',
          element: <BorrowsPage />
        },
        {
          path: '/home/books/:bookId',
          element: <BookDetailsPage />,
        },
        {
          path: '/home/books/edit/:bookId',
          element: <EditBookPage />,
        }
      ]
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },

    {
      path: '/login',
      element: <LoginPage />,
    }

  ]);

  if(isLoading) return <>Loading....</>

  return (

    <RouterProvider router={router} />
  )
}

export default App
