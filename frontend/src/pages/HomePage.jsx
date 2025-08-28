import { useContext, useEffect, useState } from 'react'
import LeftBar from '../components/LeftBar'
import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../stores/AuthContext'
import NavMain from '../components/NavMain'

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState(null);
  const [allBorrows, setAllBorrows] = useState(null);
  const [allBorrowers, setAllBorrowers] = useState(null);
  const [fullBorrows, setFullBorrows] = useState(null);
  const [availableBooks, setAvailableBooks] = useState(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/books/books", { withCredentials: true });
      setAllBooks(res.data.allBooks);
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBorrows = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/books/getBorrows", {
        params: { userId: authUser.id },
        withCredentials: true
      });
      setAllBorrows(res.data.allBorrows);
      console.log(res.data.message);


    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }


  const fetchAllBorrows = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/books/getAllBorrows", {
        withCredentials: true
      });
      setFullBorrows(res.data.fullBorrows);
      console.log(res.data.message);


    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchBorrowers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/auth/allBorrowers", {
        withCredentials: true
      });
      setAllBorrowers(res.data.allBorrowers);
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }


  const fetchAvailableBooks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/books/availableBooks", { withCredentials: true });
      setAvailableBooks(res.data.availableBooks);
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const fetchDataSequentially = async () => {
        setIsLoading(true);
        if (authUser.role === 'librarian') {
          await fetchBooks();
          await fetchAllBorrows();
          await fetchBorrowers();

        } else {
          await fetchAvailableBooks();
          await fetchBorrows();
        }
        setIsLoading(false);
      };

      fetchDataSequentially();
    }


  }, [authUser]);


  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const location = useLocation();

  const isClicked = location.pathname === '/home/dashboard' || location.pathname === '/home/books' || location.pathname === '/home/allBorrows' ||  matchPath('/home/books/:bookId', location.pathname) || matchPath('/home/books/edit/:bookId',location.pathname);

  if (isLoading) return <>Loading ....</>

  return (
    <>
      <NavMain />
      <div className='w-[100vw] h-[100vh] flex'>
        <LeftBar />

        {!isClicked ? <div className='p-6 w-full box-border bg-darkest flex justify-center items-center text-lighter h-full'>
          <span>Choose the option to continue .</span>
        </div> : <Outlet context={{ allBooks, fetchBooks,setAllBooks,setAvailableBooks, availableBooks, fetchAvailableBooks, allBorrows, fetchBorrows, fullBorrows, fetchAllBorrows, allBorrowers, fetchBorrowers }} />}
      </div>
    </>

  )
}

export default HomePage
