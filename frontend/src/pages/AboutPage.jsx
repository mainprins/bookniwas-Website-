import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    const teamRef = useRef();

    const teamMembers = [
        { name: "Prince Bajgain", role: "Founder & CEO", image: "/prince.jpg" },
    ];

    return (
        <div className='w-full'>
            <NavBar />

          
            <section className='flex flex-col items-center justify-center text-center px-6 md:px-20 mt-10 md:mt-20 gap-4 bg-gradient-to-r from-darkest via-darker to-darkest py-20 rounded-b-3xl'>
                <h1 className='text-4xl md:text-5xl font-extrabold text-lightest tracking-wide drop-shadow-lg'>About Us</h1>
                <p className='text-lighter max-w-3xl tracking-wide text-lg md:text-xl mt-4'>
                    Our mission is to make knowledge and information accessible to everyone. We build smart, efficient, and modern library management solutions that simplify borrowing, tracking, and managing books for both librarians and readers.
                </p>
            </section>

           
            <section className='flex flex-col md:flex-row justify-center items-start gap-10 mt-16 md:mt-24 px-6 md:px-20'>
                <div className='flex-1 bg-darker p-8 rounded-2xl shadow-lg'>
                    <h2 className='text-2xl font-bold text-lightest mb-4'>Our Mission</h2>
                    <p className='text-lighter tracking-wide text-lg'>
                        To empower libraries with modern tools that enhance user experience, streamline management, and encourage a love for reading.
                    </p>
                </div>
                <div className='flex-1 bg-darker p-8 rounded-2xl shadow-lg'>
                    <h2 className='text-2xl font-bold text-lightest mb-4'>Our Vision</h2>
                    <p className='text-lighter tracking-wide text-lg'>
                        To create a world where every book is accessible, every reader is informed, and every librarian is empowered with technology.
                    </p>
                </div>
            </section>

          
            <section className='flex flex-col items-center justify-center gap-8 mt-20 px-6 md:px-20' ref={teamRef}>
                <h2 className='text-3xl md:text-4xl font-bold text-lightest mb-8'>Meet the Team</h2>
                <div className='flex flex-wrap justify-center gap-8'>
                    {teamMembers.map((member, index) => (
                        <div key={index} className='bg-darker rounded-2xl w-64 p-6 flex flex-col items-center shadow-lg transition-transform hover:scale-105 duration-300'>
                            <img src={member.image} alt={member.name} className='w-32 h-32 object-cover rounded-full mb-4 shadow-md' />
                            <span className='text-lightest font-bold text-lg'>{member.name}</span>
                            <span className='text-lighter text-sm mt-1'>{member.role}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className='flex flex-col items-center justify-center gap-4 mt-20 px-6 md:px-20 mb-16'>
                <h2 className='text-3xl md:text-4xl font-bold text-lightest'>Join Our Mission</h2>
                <p className='text-lighter tracking-wide max-w-xl text-center text-lg md:text-xl'>
                    Become part of our journey to make libraries smarter and reading easier. Explore our services and see how we can help your library today!
                </p>
                <Link to={'/contact'}>
                    <button className='bg-darkest ring-1 ring-lighter text-lighter rounded-md p-3 mt-4 cursor-pointer tracking-wider hover:text-lightest hover:shadow-lightest transition-all duration-500 hover:shadow-[0_0_20px]'>
                        Get Involved
                    </button>

                </Link>
            </section>

            <Footer />
        </div>
    );
}

export default AboutPage;
