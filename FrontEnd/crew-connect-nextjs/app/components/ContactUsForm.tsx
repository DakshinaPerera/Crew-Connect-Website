'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const ContactUsForm = () => {
    const {register, reset, handleSubmit} = useForm();
    const [msg, setMsg] = useState<String>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dataSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            const response = await fetch('/api/contactus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cn_name: data.name,
                    cn_email: data.email,
                    cn_subject: data.subject,
                    cn_message: data.message,
                }),
            });

            if (response.ok) {
                setMsg("Thank You For Contacting Us!");
                reset();
            } else {
                setMsg("Something went wrong. Please try again.");
            }
        } catch (error) {
            setMsg("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }
  return (
    <form className="space-y-4" onSubmit={handleSubmit(dataSubmit)}>
        <div>
            <input 
                type="text" 
                placeholder="Name" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                {...register("name", {required: true})}            
            />
        </div>
        <div>
            <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                {...register("email", {required: true})} 
            />
        </div>
        <div>
            <input 
                type="text" 
                placeholder="Subject" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                {...register("subject", {required: true})} 
            />
        </div>
        <div>
            <textarea 
                placeholder="Message" 
                rows={8}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                {...register("message", {required: true})} 
            ></textarea>
        </div>
        <div className='flex flex-col md:flex-row justify-center md:justify-start items-center gap-5'>
            <button 
                type="submit" 
                className="bg-[#0098DA] text-white px-6 py-3 rounded-md hover:bg-[#007ab1] transition-colors duration-300 flex items-center ">
                Send 
                <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <p className='text-primary font-medium text-lg'>{msg}</p>
        </div>
        
    </form>
  )
}

export default ContactUsForm