import { BookOpenText } from 'lucide-react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../stores/AuthContext';


const DashboardPage = () => {
  const { authUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [recentBorrowsArray, setRecentBorrowsArray] = useState([]);

  const { allBooks, allBorrows, fullBorrows, availableBooks, allBorrowers } = useOutletContext();




  const data = [
    { name: 'Jan', borrowed: 10 },
    { name: 'Feb', borrowed: 20, },
    { name: 'Mar', borrowed: 60 },
    { name: 'Apr', borrowed: 15 },
    { name: 'May', borrowed: 120 },
  ];

  useEffect(() => {
    setIsLoading(true);
    if (authUser?.role === 'librarian') {
      const recent = fullBorrows.length < 3 ? fullBorrows : fullBorrows.slice(-2);
      setRecentBorrowsArray(recent);
    }
    setIsLoading(false);
  }, [authUser, fullBorrows]);

  if (isLoading) return <div>Loading ...</div>

  return (
    <div className='p-6 w-full box-border bg-darkest flex flex-col gap-8 text-lighter h-full overflow-y-scroll'>
      <div className='w-full'>
        <div className='flex flex-col gap-3'>
          <span className='text-2xl font-bold tracking-wider'>Hello, <span className='text-lightest'>{authUser.fullname}</span></span>
          <span>Jan 12, 2023 | Thursday, 11:00 PM</span>
        </div>
        <div></div>
      </div>

      <div className='w-full items-center flex flex-wrap gap-3'>
        <div className='bg-darker box-border justify-between p-6 text-lightest w-100 min-h-50 rounded-xl flex items-center'>
          <div className='flex flex-col gap-3'>
            <span className='font-bold text-2xl'>{authUser.role === 'librarian' ? allBooks.length : allBorrows.length}</span>
            <span>{authUser.role === 'librarian' ? "Total Books" : "Your Total Borrows"}</span>
          </div>
          <figure>
            <div className='bg-darkest p-3 rounded-full'>
              <BookOpenText color='#ECDFCC' size={40} />
            </div>
          </figure>
        </div>
        <div className='bg-darker box-border justify-between p-6 text-lightest w-100 min-h-50 rounded-xl flex items-center'>
          <div className='flex flex-col gap-3'>
            <span className='font-bold text-2xl'>{authUser.role === 'librarian' ? fullBorrows.length : availableBooks.length}</span>
            <span>{authUser.role === 'librarian' ? "Total Borrows" : "Total Available Books"}</span>
          </div>
          <figure>
            <div className='bg-darkest p-3 rounded-full'>
              <BookOpenText color='#ECDFCC' size={40} />
            </div>
          </figure>
        </div>
        <div className='bg-darker box-border justify-between p-6 text-lightest w-100 min-h-50 rounded-xl flex items-center'>
          <div className='flex flex-col gap-3'>
            <span className='font-bold text-2xl'>{authUser.role === 'librarian' ? allBorrowers.length : "N/A"}</span>
            <span>{authUser.role === 'librarian' ? "Total Borrowers" : "N/A"}</span>
          </div>
          <figure>
            <div className='bg-darkest p-3 rounded-full'>
              <BookOpenText color='#ECDFCC' size={40} />
            </div>
          </figure>
        </div>
      </div>

      {authUser.role === "librarian" && (
        <div className='bg-darker justify-center items-center flex p-6 rounded-xl'>
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#ECDFCC" strokeDasharray="5 5" />
            <XAxis dataKey="name" color='#ECDFCC' />
            <YAxis />
            <Legend align="center" />
            <Tooltip />
            <Line type="monotone" dataKey="borrowed" stroke="#ECDFCC" strokeWidth={2} name="Borrowed Books" />
          </LineChart>
        </div>
      )}

      <div className='w-[100%] flex flex-col gap-6'>
        <span className='text-lightest text-2xl font-bold tracking-wider'>{authUser.role === 'librarian' ? "Recent Borrows" : "Recommended Books"}</span>
        <div className='bg-darker w-[100%] flex flex-wrap gap-4 p-6 box-border rounded-xl'>
          {authUser.role === 'librarian' ?
            recentBorrowsArray.length === 0 ? <span>No Any Borrows Yet .</span> :

              recentBorrowsArray.map((borrow, index) => (
                <div className='bg-darkest flex flex-col min-h-100 w-80 rounded-xl' key={index}>
                  <figure className='w-full h-1/2 bg-lighter rounded-tl-xl rounded-tr-xl'>
                   <img src={`https://bookniwas-website-backend.onrender.com/uploads/${borrow.bookId.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' /></figure>
                  <div className='pl-3 pt-3 flex flex-col gap-2'>
                    <span className='text-xl text-lightest font-bold tracking-wider'>{borrow.bookId.title}</span>
                    <span>Borrower : {borrow.userId.fullname}</span>
                    <span>Borrow Date : {new Date(borrow.borrowDate).toLocaleDateString()}</span>
                    <span>Borrowed For : {borrow.returnDuration} day{borrow.returnDuration > 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))

            : "No recommends"}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
