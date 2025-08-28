import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const NavMain = () => {
    const [isOpen,setIsOpen] = useState(false);
    return (
        <nav className='w-[100vw] justify-between md:hidden items-center flex px-5 md:px-10 lg:px-15 xl:px-20 py-6 min-h-10'>
            <div id="left">
                <span className='text-lighter font-bold tracking-widest text-xl'>BOOK<span className='text-lightest'>N</span>IWAS<span className='text-lightest'>.</span></span>
            </div>
            <div id="right">
                <Menu className='text-lighter cursor-pointer' onClick={()=>{setIsOpen(true)}}/>
            </div>
            <div className={` ${isOpen ? "fixed" : "hidden"} fixed top-0 left-0 w-[100vw] h-[90vh] flex justify-center items-center font-bold tracking-wider flex-col gap-20 bg-darkest text-lightest`}>
 <Link to={'/home/dashboard'}><span className='hover:text-lighter text-3xl' onClick={()=>{setIsOpen(false)}}>Dashboard</span></Link>
                <Link to={'/home/books'}><span className='hover:text-lighter text-3xl' onClick={()=>{setIsOpen(false)}}>All Books</span></Link>
                <Link to={'/home/allBorrows'}><span className='hover:text-lighter text-3xl' onClick={()=>{setIsOpen(false)}}>All Borrows</span></Link>
                 <button className='bg-darkest ring-1 ring-lighter text-lighter rounded-md p-4 mt-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]' onClick={() => { setIsOpen(false) }}>Close</button>
            </div>
        </nav>
    )
}

export default NavMain