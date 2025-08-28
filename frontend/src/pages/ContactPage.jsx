import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback('');
        try {
            setFeedback('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setFeedback('Failed to send message.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='w-full'>
            <NavBar />

            <section className='flex flex-col items-center justify-center text-center px-6 md:px-20 mt-10 md:mt-20 gap-4 bg-gradient-to-r from-darkest via-darker to-darkest py-16 rounded-b-3xl'>
                <h1 className='text-3xl md:text-5xl font-extrabold text-lightest tracking-wide drop-shadow-lg'>Get in Touch</h1>
                <p className='text-lighter max-w-3xl tracking-wide text-lg md:text-xl'>
                    Questions, feedback, or ideas? Fill out the form below, and we’ll respond as soon as possible.
                </p>
            </section>

            <section className='flex flex-col md:flex-row justify-center items-start gap-10 mt-16 md:mt-24 px-6 md:px-20'>
                
                <div className='flex-1 bg-darker p-8 rounded-2xl shadow-lg border min-h-140'>
                    <h2 className='text-2xl font-bold text-lightest mb-6'>Send a Message</h2>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='name'
                            placeholder='Your Name'
                            value={formData.name}
                            onChange={handleChange}
                            className='p-4 rounded-xl bg-darkest text-lightest placeholder:text-lighter focus:outline-none focus:ring-2 focus:ring-lightest focus:ring-opacity-50 transition-all'
                            required
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Your Email'
                            value={formData.email}
                            onChange={handleChange}
                            className='p-4 rounded-xl bg-darkest text-lightest placeholder:text-lighter focus:outline-none focus:ring-2 focus:ring-lightest focus:ring-opacity-50 transition-all'
                            required
                        />
                        <textarea
                            name='message'
                            placeholder='Your Message'
                            value={formData.message}
                            onChange={handleChange}
                            className='p-4 rounded-xl resize-none bg-darkest text-lightest placeholder:text-lighter focus:outline-none focus:ring-2 focus:ring-lightest focus:ring-opacity-50 transition-all'
                            rows={6}
                            required
                        />
                        <button
                            type='submit'
                            className='bg-lightest text-darkest cursor-pointer font-bold rounded-xl py-3 px-6 mt-2 w-max hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg disabled:opacity-50'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    {feedback && <p className='text-lightest mt-4 font-medium'>{feedback}</p>}
                </div>

                <div className='flex-1 bg-darker p-8 rounded-2xl shadow-lg border flex flex-col gap-6 min-h-140'>
                    <h2 className='text-2xl font-bold text-lightest mb-4'>Contact Info</h2>
                    <div className='flex flex-col gap-3 text-lighter text-lg'>
                        <p><strong>Email:</strong> info@libraryapp.com</p>
                        <p><strong>Phone:</strong> +977 123456789</p>
                        <p><strong>Address:</strong> 123 Library St, Kathmandu, Nepal</p>
                    </div>
                    <div className='w-full h-56 bg-darkest rounded-xl flex justify-center items-center text-lightest text-lg'>
                        Map Placeholder
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
