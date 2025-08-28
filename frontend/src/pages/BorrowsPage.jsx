
import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom'
import { AuthContext } from '../stores/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const BorrowsPage = () => {

  const { authUser } = useContext(AuthContext);
  const { allBorrows, fullBorrows , fetchBorrows,fetchAllBorrows,fetchBooks,fetchAvailableBooks} = useOutletContext();

  console.log(allBorrows, fullBorrows);

  const returnBook = async (id)=>{
        
        try {
          const res = await axios.delete("https://bookniwas-website-backend.onrender.com/api/books/return",{
            params:{
              borrowId:id
            },
            withCredentials:true
          });
          toast.success(res.data.message);
          fetchAllBorrows();
          fetchBorrows();
          fetchBooks();
          fetchAvailableBooks();
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
  }



  if (authUser.role === 'librarian') {
    if (fullBorrows === null || fullBorrows.length === 0) {
      return <div className='p-6 w-full box-border bg-darkest flex justify-center items-center text-lightest h-full'>
        <span>No any borrows yet .</span>
      </div>
    }
  } else {
    if (allBorrows === null || allBorrows.length === 0) {
      return <div className='p-6 w-full box-border bg-darkest flex justify-center items-center text-lightest h-full'>
        <span>No any borrows yet .</span>
      </div>
    }
  }

  return (
    <div className={`p-6 w-full box-border bg-darkest flex flex-col gap-8 text-lightest h-full overflow-y-scroll`}>
      <div className='w-full flex justify-between items-center'>
        <span className='font-bold text-2xl tracking-wider'>All Borrows</span>
      </div>
      <div className='flex flex-wrap justify-center gap-6 p-4 box-border bg-darker rounded-xl'>

        {authUser.role === 'librarian' ? fullBorrows.map((borrow, index) => (
          <div className='bg-darkest flex flex-col min-h-100 w-80 rounded-xl' key={index}>
            <figure className='w-full h-1/2 bg-lighter rounded-tl-xl rounded-tr-xl'>
              <img src={`https://bookniwas-website-backend.onrender.com/uploads/${borrow.bookId.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' />

            </figure>
            <div className='pl-3 pt-3 flex flex-col gap-2 text-lighter'>
              <span className='text-xl text-lightest font-bold tracking-wider'>{borrow.bookId.title}</span>
              <span>Borrower : {borrow.userId.fullname}</span>
              <span>Borrow Date : {new Date(borrow.borrowDate).toLocaleDateString()}</span>
              <span>Borrowed For : {borrow.returnDuration} day{borrow.returnDuration > 1 ? 's' : ''}</span>
            </div>
          </div>
        )) : allBorrows.map((borrow, index) => (
          <div className='bg-darkest flex flex-col min-h-100 w-80 rounded-xl' key={index}>
            <figure className='w-full h-1/2 bg-lighter rounded-tl-xl rounded-tr-xl'>
              <img src={`https://bookniwas-website-backend.onrender.com/uploads/${borrow.bookId.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' />
            </figure>
            <div className='pl-3 pt-3 flex flex-col gap-2 text-lighter'>
              <span className='text-xl text-lightest font-bold tracking-wider'>{borrow.bookId.title}</span>
              <span>Borrower : {borrow.userId.fullname}</span>
              <span>Borrow Date : {new Date(borrow.borrowDate).toLocaleDateString()}</span>
              <span>Borrowed For : {borrow.returnDuration} day{borrow.returnDuration > 1 ? 's' : ''}</span>
              <button className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-2 w-40 transition-all duration-500' onClick={()=>{returnBook(borrow._id)}}>Return</button>

            </div>          
            </div>
        ))}

      </div>
    </div>
  )
}

export default BorrowsPage 