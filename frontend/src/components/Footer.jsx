import { Flag } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-darkest w-[100vw] flex flex-col gap-10 justify-center items-center p-20 box-border'>
       <section>
           <span className='text-lighter text-4xl xl:text-8xl font-extrabold tracking-tighter'>BOOK<span className='text-lightest'>N</span>IWAS</span>
       </section>
       <section className='flex flex-col md:flex-row gap-8 md:gap-20 items-center'>
          <div className='flex flex-col xl:gap-2 gap-0  text-lightest text-xl tracking-wider'>
            <span className='cursor-pointer'>About Us</span>
            <span className='cursor-pointer'>Services</span>
            <span className='cursor-pointer'>Case Studies</span>
          </div>
          <div className='flex flex-col xl:gap-2 gap-0 text-lightest text-xl tracking-wider'>
            <span className='cursor-pointer'>Portfolio</span>
            <span className='cursor-pointer'>LinkedIn</span>
            <span className='cursor-pointer'>Instagram</span>
          </div>
          <div className='flex-col xl:gap-2 gap-0 hidden text-lightest text-xl tracking-wider justify-center items-center xl:flex'>
            <Flag size={50}/>
          </div>
          <div className='flex flex-col xl:gap-2 gap-0 text-lightest text-xl tracking-wider'>
            <span className='cursor-pointer'>Help</span>
            <span className='cursor-pointer'>Github</span>
            <span className='cursor-pointer'>Facebook</span>
          </div>
          <div className='flex flex-col gap-2 text-lightest text-xl tracking-wider'>
            <span className='cursor-pointer'>Contact</span>
            <span className='cursor-pointer'>Legal</span>
            <span className='cursor-pointer'>Blog</span>
          </div>
       </section>
       <section className='flex flex-col justify-center items-center xl:ml-10'>
           <span className='text-lightest'>Made By</span>
           <span className='font-bold text-lightest text-xl'>Prince</span>
       </section>
       <section className='w-full flex flex-col gap-10 justify-center items-center'>
          <div className='flex gap-4 xl:ml-15'>
            <img src="/nepal.png" alt="nepalFlag" className='w-[40px]'/>
            <img src="/nepal.png" alt="nepalFlag" className='w-[40px]'/>
          </div>
          <div className='flex gap-3 xl:ml-15'>
            <figure className='bg-lightest rounded-full p-4 w-[60px]'>
                <img src="/linkedin.svg" alt="linkedIn" className='w-[40px]' />
            </figure>
            <figure className='bg-lightest rounded-full p-2 w-[60px] items-center flex justify-center'>
                 <img src="/contact.svg" alt="contact" className='w-[40px]' />
            </figure>
          </div>
          <span className='text-lightest flex justify-center items-center xl:ml-15 tracking-wider'>@ Copyright 2025</span>
       </section>
    </div>
  )
}

export default Footer