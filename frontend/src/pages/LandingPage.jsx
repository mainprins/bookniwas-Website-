import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import { ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Footer from '../components/Footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LandingPage = () => {
    const navigate = useNavigate();
    const container = useRef();
    const heading = useRef();
    const mainImage = useRef();
    const cardContainer = useRef();
    const mainDiv = useRef();


useGSAP(() => {
  const words = gsap.utils.toArray(heading.current.querySelectorAll('span'));
  const cards = gsap.utils.toArray(cardContainer.current.children);
  const images = gsap.utils.toArray(mainImage.current.children);

  const mm = ScrollTrigger.matchMedia();


  mm.add("(min-width: 768px)", () => {
    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.2
    });

    gsap.from(mainImage.current, {
      scale: 0.2,
      scrollTrigger: {
        trigger: mainImage.current,
        start: 'top 100%',
        scrub: 4,
        end: 'center 50%',
      },
    });

    gsap.from(images, {
      opacity: 0,
      stagger: 3,
      scrollTrigger: {
        trigger: mainImage.current,
        start: `center 50%`,
        end: `center -50%`,
        pin: mainDiv.current,
        scrub: 0.1,
      }
    });

    gsap.from(cards, {
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: cardContainer.current,
        start: "top -10%",
        end: "center -40%",
        scrub: 0.3,
      }
    });
  });


  mm.add("(max-width: 767px)", () => {
    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.2
    });
  });

  ScrollTrigger.refresh();
  return () => mm.kill();
}, []);




    const imageArray = ["/image1.png", "/image2.png", "/image1.png"]




    return (
        <div ref={mainDiv}>
            <NavBar />
            <div id="hero" className='flex md:mt-30 justify-center flex-col gap-6 md:gap-10 w-full items-center min-h-100 mt-10' ref={container}>
                <div id="top" className='w-full flex flex-col gap-3 md:gap-10 justify-center items-center'>
                    <span className='w-1/2 text-lightest font-bold tracking-wider md:text-3xl xl:text-4xl text-2xl md:text-center heading' ref={heading}>
                        {"Beautify Knowledge And Wisdom".split(" ").map((word, index) => (
                            <span key={index} className='inline-block opacity-0 translate-y-5 mx-1'>
                                {word}
                            </span>
                        ))}
                    </span>
                    <p className='w-1/2 text-lighter tracking-wider'>Easily borrow books, track borrowers, and manage your collection in one smart system. Fast, simple, and built for modern libraries!</p>
                </div>
                <div id="bottom" className='flex flex-col gap-10'>
                    <button className='bg-darkest ring-1 ring-lighter text-lighter rounded-md p-3 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]' onClick={() => { navigate('/home') }}>Join Now</button>
                    <span className='text-lighter cursor-pointer hover:text-lightest tracking-widest flex flex-col gap-3 items-center hover:gap-5 transition-all duration-500' onClick={() => cardContainer.current.scrollIntoView({ behavior: 'smooth' })}>
                        <span>Learn More</span>
                        <ArrowDown />
                    </span>
                </div>
                <div id="bigDemo" className='w-[100vw] min-h-100 md:min-h-180 hidden  md:flex justify-center items-center'>
                    <figure className='w-[80%] min-h-100 md:min-h-180 bg-darker relative rounded-md hidden md:flex overflow-hidden' ref={mainImage}>
                        {imageArray.map((src, index) => (
                            <img src={src} alt="posterImage" key={index} className='absolute top-0 left-0 w-full h-full object-cover md:object-cover' />
                        ))}
                    </figure>
                </div>
            </div>
            <div id="faq" className='w-full flex flex-col gap-3 md:gap-10 justify-center items-center md:px-12 md:mt-15 xl:mt-20 md:box-border mt-10 md:flex-row'>
                <span className='w-1/2 md:w-1/3 text-lightest font-bold tracking-wider md:text-3xl xl:text-4xl text-2xl'>Why Use Us ?</span>
                <p className='w-1/2 md:w-1/3 text-lighter tracking-wider'>We make borrowing and managing books easy, fast, and secure for both users and librarians.</p>
            </div>
            <div className='w-full flex flex-col md:flex-row md:flex-wrap md:justify-center items-center min-h-130 gap-6 mt-15' ref={cardContainer}>
                <div className='bg-darker min-h-95 xl:min-h-100 xl:w-100 w-80 rounded-md'>
                    <figure className='bg-lighter min-h-60 xl:min-h-80 rounded-t-md flex justify-center items-center'>
                       <img src="/manage.svg" alt="manageImage" className='object-contain w-[80%]' />
                    </figure>
                    <div className='mt-4 px-3 xl:py-6'>
                        <span className='text-lg font-bold tracking-wider text-lightest'>Manage Books</span>
                        <p className='text-lighter tracking-wider'>The Manage Books feature lets users add, edit, and delete books to keep the library catalog updated.</p>
                    </div>
                </div>
                <div className='bg-darker min-h-95 xl:min-h-100 xl:w-100 w-80 rounded-md'>
                    <figure className='bg-lighter min-h-60 xl:min-h-80 rounded-t-md flex justify-center items-center'>
                      <img src="/borrow.svg" alt="borrowImage" className='object-contain w-[80%]' />
                    </figure>
                    <div className='mt-4 px-3 xl:py-6'>
                        <span className='text-lg font-bold tracking-wider text-lightest'>Borrow Books</span>
                        <p className='text-lighter tracking-wider'>The Borrow Books feature lets users check out books and tracks due dates for easy library management.</p>
                    </div>
                </div>
                <div className='bg-darker min-h-95 xl:min-h-100 xl:w-100 w-80 rounded-md'>
                    <figure className='bg-lighter min-h-60 xl:min-h-80 rounded-t-md flex justify-center items-center'>
                      <img src="/record.svg" alt="recordImage" className='object-contain w-[80%]' />
                    </figure>
                    <div className='mt-4 px-3 xl:py-6'>
                        <span className='text-lg font-bold tracking-wider text-lightest'>View Records</span>
                        <p className='text-lighter tracking-wider'>The View Records feature lets users quickly access and review all library transactions and book details.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage