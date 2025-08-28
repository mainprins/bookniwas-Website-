import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { AuthContext } from '../stores/AuthContext';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookDetailsPage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState(null);

    const { allBooks, availableBooks, fetchBooks } = useOutletContext();
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        console.log(allBooks);
        console.log(bookId);


        const filteredBook = allBooks.filter(obj => obj._id === bookId)[0];
        setBook(filteredBook);
        setIsLoading(false);
    })

    const handleDeletion = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`https://bookniwas-website-backend.onrender.com/api/books/delete/${book._id}`, { withCredentials: true });
            toast.success(res.data.message);
            fetchBooks();
            navigate('/home/books')
        } catch (error) {
            console.log("Error while updating book :", error.response?.data?.message);
            toast.error(error.response?.data?.message);

        }
    }



    if (isLoading) return <span>Loading ....</span>

    return (
        <div className='w-full h-full flex flex-col md:flex-row justify-center items-center'>
            <div id="left" className='w-1/2 h-full flex items-center justify-center'>
                <figure className='bg-darker w-[80%] h-[80%] rounded-xl'>
                    <img src={`https://bookniwas-website-backend.onrender.com/uploads/${book.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' />
                </figure>
            </div>
            <div id="right" className='w-full md:w-1/2 h-full flex flex-col gap-6 justify-center px-30 md:px-40'>
                <span className='text-xl text-lightest font-bold tracking-wider'>{book.title}</span>
                <p className='text-lightest'>The book is very good</p>
                <span className='text-lighter'>Quantity : {book.quantity}</span>
                <span className='text-lighter'>Available : {book.available}</span>
                <span className='text-lighter'>Author : {book.author}</span>
                <span className='text-lighter'>Genre : {book.genre}</span>
                {authUser.role === 'librarian' ?
                    <div className='flex w-full px-4 gap-4'>
                        <button className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-2 w-30 transition-all duration-500' onClick={() => { navigate(`/home/books/edit/${book._id}`) }}>Edit</button>
                        <button className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-2 w-30 transition-all duration-500' onClick={handleDeletion}>Delete</button>
                    </div>
                    :

                    <div className='flex w-full px-4 py-2 justify-between'>
                        <div>
                            <button className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-2 w-30 transition-all duration-500' onClick={() => { setIsBorrowOpen(true); setBorrowData(prev => ({ ...prev, bookId: book._id })) }}>Borrow Now</button>
                        </div>
                        <div className='cursor-pointer hover:text-lighter transition-all duration-500' onClick={() => { navigate(`/home/books/${book._id}`) }}>
                            <Pencil />
                        </div>
                    </div>

                }
            </div>
        </div >
    )
}

export default BookDetailsPage