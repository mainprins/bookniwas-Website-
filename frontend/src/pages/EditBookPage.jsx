import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { AuthContext } from '../stores/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditBookPage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        quantity: '',
        available: '',
        genre: 'Education',
    });

    const { allBooks,fetchBooks } = useOutletContext();
    const { authUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(parseInt(formData.quantity) > 0){
            setFormData(({available:'true'}));
        }
        try {
            const res = await axios.put(`https://bookniwas-website-backend.onrender.com/api/books/update/${book._id}`,formData,{withCredentials:true});
            toast.success(res.data.message);
            fetchBooks();
            navigate('/home/books')
        } catch (error) {
            console.log("Error while updating book :", error.response?.data?.message);
            toast.error(error.response?.data?.message);

        }
    }

    useEffect(() => {
        console.log(allBooks);
        console.log(bookId);


        const filteredBook = allBooks.filter(obj => obj._id === bookId)[0];
        setBook(filteredBook);
        if(book){
            setFormData(({
                title: book.title,
                author: book.author,
                quantity: book.quantity,
                genre: book.genre,
            }))
        }
        setIsLoading(false);
    },[book]);


    if(authUser.role === 'borrower') return navigate('/home/books')
    if (isLoading) return <span>Loading ....</span>

    return (
        <div className='flex w-full h-full justify-center items-center'>
            <form className='flex flex-col gap-6 items-center' onSubmit={handleSubmit}>
                <label htmlFor="" className='text-lightest'>{book.isbn}</label>
                <input type="text" placeholder='Enter name of book' value={formData.title} onChange={(e) => { setFormData(prev => ({ ...prev, title: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                <input type="text" placeholder='Enter name of author' value={formData.author} onChange={(e) => { setFormData(prev => ({ ...prev, author: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                <input type="text" placeholder='Enter quantity of book' value={formData.quantity} onChange={(e) => { setFormData(prev => ({ ...prev, quantity: e.target.value, available: 'true' })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                <select name="" id="" className='bg-darker text-lightest p-4 rounded-xl' value={formData.genre} onChange={(e) => { setFormData(prev => ({ ...prev, genre: e.target.value })) }}>
                    <option value="Education">Education</option>
                    <option value="Fiction">Fiction</option>
                </select>
                <button type='submit' className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500' >Update Book</button>
            </form>
        </div>

    )
}

export default EditBookPage