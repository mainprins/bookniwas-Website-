import { useContext, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../stores/AuthContext';
import { Pencil, Search } from 'lucide-react';

const BooksPage = () => {

    const { allBooks, setAllBooks, setAvailableBooks, fetchBooks, availableBooks, fetchAvailableBooks, fetchBorrows, fetchAllBorrows } = useOutletContext();
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState('All');
    const [isBorrowOpen, setIsBorrowOpen] = useState(false);
    const [bookPic, setBookPic] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        quantity: '',
        available: '',
        genre: 'Education',
    });
    const [borrowData, setBorrowData] = useState({
        bookId: null,
        userId: authUser.id,
        returnDuration: null,
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('author', formData.author)
            data.append('isbn', formData.isbn)
            data.append('quantity', formData.quantity)
            data.append('available', formData.available)
            data.append('genre', formData.genre)
            data.append('bookPic', bookPic);

            const res = await axios.post(
                "http://localhost:3000/api/books/add",
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            toast.success(res.data.message);
            fetchBooks();
            setIsOpen(false);
        } catch (error) {
            console.log("Error while adding book :", error.response?.data?.message);
            toast.error(error.response?.data?.message);

        }

    }

    const handleBorrow = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/books/borrow", borrowData, { withCredentials: true });
            toast.success(res.data.message);
            fetchBorrows();
            fetchAllBorrows();
            fetchAvailableBooks();
            setIsBorrowOpen(false);
        } catch (error) {
            console.log("Error while borrowing book :", error.response?.data?.message);
            toast.error(error.response?.data?.message);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText !== "") {
            console.log(category);
            console.log(allBooks);


            if (authUser.role === 'librarian') {
                if (category !== 'All') {
                    const filteredBooks = allBooks.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()) && obj.genre === category);
                    setFilteredBooks(filteredBooks);
                    setIsSearched(true);
                } else {
                    const filteredBooks = allBooks.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredBooks(filteredBooks);
                    setIsSearched(true);
                }


            } else {
                if (category !== 'All') {
                    const filteredBooks = availableBooks.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()) && obj.genre === category);
                    setFilteredBooks(filteredBooks);
                    setIsSearched(true);
                } else {
                    const filteredBooks = availableBooks.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredBooks(filteredBooks);
                    setIsSearched(true);
                }
            }
        } else {
            toast.error("You cannot search with an empty text .")
        }

    }

    const handleReset = (e) => {
        setIsSearched(false);
        setSearchText("");
        setCategory('All');
        setFilteredBooks([]);
    }

    if (authUser.role === 'librarian') {
        if (allBooks.length === 0) {
            return <>
                <div className='w-full h-full flex flex-col gap-8 justify-center items-center text-lightest'>
                    <span>No any books in the library </span>
                    <button className='bg-darkest ring-1 ring-lighter text-lighter rounded-md p-4 mt-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]' onClick={() => { setIsOpen(true) }}>Add Now</button>
                </div>
                <div className={`${isOpen ? 'fixed' : 'hidden'} top-1 ring-1 ring-lightest left-120 rounded-xl flex flex-col gap-8 text-lightest justify-center items-center z-50 w-220 min-h-180 bg-darkest`}>
                    <span className='text-3xl font-bold tracking-wider'>Add New Book</span>
                    <form className='flex flex-col gap-6 items-center' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter name of book' onChange={(e) => { setFormData(prev => ({ ...prev, title: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                        <input type="text" placeholder='Enter name of author' onChange={(e) => { setFormData(prev => ({ ...prev, author: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                        <input type="text" placeholder='Enter isbn number' onChange={(e) => { setFormData(prev => ({ ...prev, isbn: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                        <input type="text" placeholder='Enter quantity of book' onChange={(e) => { setFormData(prev => ({ ...prev, quantity: e.target.value, available: 'true' })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                        <label className='mt-4 cursor-pointer'>
                            <input type="file" name='bookPic' className='hidden' accept="image/*" onChange={(e) => setBookPic(e.target.files[0])} />
                            <span className='bg-darker p-3 rounded-md text-lightest'>Upload book thumbnail</span>
                        </label>
                        <select name="" id="" className='bg-darker text-lightest p-4 rounded-xl' onChange={(e) => { setFormData(prev => ({ ...prev, genre: e.target.value })) }}>
                            <option value="Education">Education</option>
                            <option value="Fiction">Fiction</option>
                        </select>
                        <button type='submit' className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500' >Add Book</button>
                        <button type='button' className='hover:bg-lightest hover:text-darkest ring-1 ring-lightest text-lightest bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500' onClick={() => { setIsOpen(false) }}>Cancel</button>
                    </form>
                </div>
            </>
        }
    } else {
        if (availableBooks.length === 0) {
            return <div className='p-6 w-full box-border bg-darkest flex justify-center items-center text-lightest h-full'>
                <span>No any available books in the library.</span>
            </div>
        }
    }

    return (
        <>
            <div className={`p-6 w-full box-border bg-darkest flex flex-col gap-8 text-lightest h-full ${isOpen && 'blur-md'} overflow-y-scroll`}>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-bold text-2xl tracking-wider'>{authUser.role === 'librarian' ? "All Books" : "Available Books"}</span>
                    {authUser.role === 'librarian' && (
                        <button className='bg-darkest ring-1 ring-lighter text-lighter rounded-md p-4 mt-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]' onClick={() => { setIsOpen(true) }}>Add New</button>

                    )}
                </div>
                <form action="" className='w-full flex flex-col md:flex-row items-center gap-6 md:min-h-10 min-h-50'>
                    <input type="text" placeholder='Search for the book' value={searchText} onChange={(e) => setSearchText(e.target.value)} className=' w-full bg-darker h-full rounded-xl p-3 text-lightest outline-none' />
                    <select name="" id="" value={category} className='bg-darker p-4 rounded-xl cursor-pointer' onChange={(e) => setCategory(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Education">Education</option>
                        <option value="Fiction">Fiction</option>
                    </select>
                    <div className='h-full gap-6 flex'>
                        <button type='submit' className='cursor-pointer' onClick={handleSearch}>
                            <Search />
                        </button>
                        <button type='button' className='bg-darker hover:ring-1 hover:bg-darkest hover:ring-darker transition-all duration-500 cursor-pointer px-6 rounded-xl' onClick={handleReset}>Reset</button>
                    </div>

                </form>
                <div className='flex gap-3 p-4 box-border bg-darker rounded-xl'>

                    {isSearched ? filteredBooks.length != 0 ? filteredBooks.map((book, index) => (
                        <div className='bg-darkest flex flex-col min-h-100 w-80 rounded-xl' key={index}>
                            <figure className='w-full h-1/2 bg-lighter rounded-tl-xl rounded-tr-xl'>
                                <img src={`http://localhost:3000/uploads/${book.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' /></figure>
                            <div className='pl-3 pt-3 flex flex-col gap-2'>
                                <span className='text-xl text-lightest font-bold tracking-wider'>{book.title}</span>
                                <span className='text-lighter'>Quantity : {book.quantity}</span>
                                <span className='text-lighter'>Available : {book.available}</span>
                                <span className='text-lighter'>Author : {book.author}</span>
                                <span className='text-lighter'>Genre : {book.genre}</span>
                                <div className='flex w-full px-4 py-2 justify-between'>
                                    <div>

                                    </div>
                                    <div className='cursor-pointer hover:text-lighter transition-all duration-500' onClick={() => { navigate(`/home/books/${book._id}`) }}>
                                        <Pencil />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : <span>No such book found .</span> :
                        authUser.role === 'librarian' ? allBooks.map((book, index) => (
                            <div className='bg-darkest flex flex-col min-h-120 w-80 rounded-xl' key={index}>
                                <figure className='w-full h-1/2 bg-lighter rounded-tl-xl rounded-tr-xl'>
                                    <img src={`http://localhost:3000/uploads/${book.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' /></figure>
                                <div className='pl-3 pt-3 flex flex-col gap-2'>
                                    <span className='text-xl text-lightest font-bold tracking-wider'>{book.title}</span>
                                    <span className='text-lighter'>Quantity : {book.quantity}</span>
                                    <span className='text-lighter'>Available : {book.available}</span>
                                    <span className='text-lighter'>Author : {book.author}</span>
                                    <span className='text-lighter'>Genre : {book.genre}</span>
                                    <div className='flex w-full py-4'>
                                        <button className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-2 w-30 transition-all duration-500' onClick={() => { navigate(`/home/books/${book._id}`) }}>Details</button>
                                    </div>
                                </div>
                            </div>
                        )) : availableBooks.map((book, index) => (
                            <div className='bg-darkest flex flex-col min-h-120 w-80 rounded-xl' key={index}>
                                <figure className='w-full h-1/2 bg-lighter rounded-tl-xl rounded-tr-xl'>
                                    <img src={`http://localhost:3000/uploads/${book.bookImg}`} alt="" className='w-full rounded-t-xl h-full object-cover' /></figure>
                                <div className='pl-3 pt-3 flex flex-col gap-2'>
                                    <span className='text-xl text-lightest font-bold tracking-wider'>{book.title}</span>
                                    <span className='text-lighter'>Quantity : {book.quantity}</span>
                                    <span className='text-lighter'>Available : {book.available}</span>
                                    <span className='text-lighter'>Author : {book.author}</span>
                                    <span className='text-lighter'>Genre : {book.genre}</span>
                                    <div className='flex w-full py-4'>
                                        <button className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-2 w-30 transition-all duration-500' onClick={() => { setIsBorrowOpen(true); setBorrowData(prev => ({ ...prev, bookId: book._id })) }}>Borrow Now</button>
                                    </div>

                                </div>
                            </div>
                        ))}

                </div>


            </div>
            <div className={`${isBorrowOpen ? 'fixed' : 'hidden'} top-20 ring-1 ring-lightest left-120 rounded-xl flex flex-col gap-8 text-lightest justify-center items-center z-50 w-220 min-h-140 bg-darkest`}>
                <span className='text-3xl font-bold tracking-wider'>Choose Borrow Duration</span>
                <form className='flex flex-col gap-6 items-center' onSubmit={handleBorrow}>
                    <input type="number" placeholder='Enter the duration of borrow' className='bg-lightest text-darkest rounded-xl p-4 outline-none w-60' onChange={(e) => { setBorrowData(prev => ({ ...prev, returnDuration: e.target.value.toString() })) }} />
                    <button type='submit' className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500'>Borrow Book</button>
                    <button className='hover:bg-lightest hover:text-darkest ring-1 ring-lightest text-lightest bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500' onClick={() => { setIsBorrowOpen(false) }}>Cancel</button>
                </form>
            </div>
            <div className={`${isOpen ? 'fixed' : 'hidden'} top-1 ring-1 ring-lightest left-120 rounded-xl flex flex-col gap-8 text-lightest justify-center items-center z-50 w-220 min-h-180 bg-darkest`}>
                <span className='text-3xl font-bold tracking-wider'>Add New Book</span>
                <form className='flex flex-col gap-6 items-center' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter name of book' onChange={(e) => { setFormData(prev => ({ ...prev, title: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                    <input type="text" placeholder='Enter name of author' onChange={(e) => { setFormData(prev => ({ ...prev, author: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                    <input type="text" placeholder='Enter isbn number' onChange={(e) => { setFormData(prev => ({ ...prev, isbn: e.target.value })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                    <input type="text" placeholder='Enter quantity of book' onChange={(e) => { setFormData(prev => ({ ...prev, quantity: e.target.value, available: 'true' })) }} className='bg-darker text-lightest rounded-xl p-4 outline-none w-80' />
                    <label className='mt-4 cursor-pointer'>
                        <input type="file" name='bookPic' className='hidden' accept="image/*" onChange={(e) => setBookPic(e.target.files[0])} />
                        <span className='bg-darker p-3 rounded-md text-lightest'>Upload book thumbnail</span>
                    </label>
                    <select name="" id="" className='bg-darker text-lightest p-4 rounded-xl' onChange={(e) => { setFormData(prev => ({ ...prev, genre: e.target.value })) }}>
                        <option value="Education">Education</option>
                        <option value="Fiction">Fiction</option>
                    </select>
                    <button type='submit' className='bg-lightest text-darkest hover:ring-1 hover:ring-lightest hover:text-lightest hover:bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500' >Add Book</button>
                    <button type='button' className='hover:bg-lightest hover:text-darkest ring-1 ring-lightest text-lightest bg-darkest cursor-pointer rounded-xl p-3 w-40 transition-all duration-500' onClick={() => { setIsOpen(false) }}>Cancel</button>
                </form>
            </div>
        </>

    )
}

export default BooksPage