'use client';
import React, { useState } from 'react'
import logo from "public/logo.svg"
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className='bg-white text-black p-1 sm:p-2  md:flex md:justify-between md:items-center shadow-xl w-full fixed top-0 left-0 z-10'>
        <div className="flex justify-between items-center h-full w-full px-1 2xl:px-2">
            <Link href="/" >
              <Image src={logo}
                alt='logo'
                height="75"
                width="205"/>
            </Link>
            <div className='hidden md:flex'>
                <Link rel="stylesheet" href="/"  className="mx-2   hover:text-gray-500 font-semibold text-sm pt-3">
                  Home
                </Link>
                <Link rel="stylesheet" href="/jobseekers"  className="mx-2   hover:text-gray-500 font-semibold text-sm pt-3">
                  Job Seekers
                </Link>
                <Link rel="stylesheet" href="/availablejobs"  className="mx-2   hover:text-gray-500 font-semibold text-sm pt-3" >
                  Available Jobs
                </Link>
                <Link rel="stylesheet" href="/employers"  className="mx-2   hover:text-gray-500 font-semibold text-sm pt-3">
                  Employers Page
                </Link>
                <Link rel="stylesheet" href="/aboutus"  className="mx-2   hover:text-gray-500 font-semibold text-sm pt-3">
                  About Us
                </Link>
                <Link rel="stylesheet" href="/contactus"  className="mx-2   hover:text-gray-500 font-semibold text-sm pt-3">
                  Contact Us
                </Link>
                
                <Link  href="/">
                  <button className="  mx-2 bg-slate-950  hover:bg-slate-800 text-white  rounded-full px-4 py-2 font-semibold ">+62518135</button> 
                </Link>
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={()=>{setIsOpen(!isOpen)}}>
                  <AiOutlineMenu size={20} className='text-black font-bold'/>
                </button>
            </div>
            <div className={isOpen 
                ? "fixed left-0 top-0 w-[100%] md:hidden h-[75%] bg-[#ffffff] p10 ease-in duration-500" 
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500"}>
            <div className="flex w-full items-center px-4 pt-4 pb-2 justify-between">
                <Link href="/" >
                        <Image onClick = {()=>{setIsOpen(!isOpen)} } src={logo}
                            alt='logo'
                            height="75"
                            width="205"
                            />
                    </Link>
                <div onClick = {()=>{setIsOpen(!isOpen)} }className="cursor-pointer">
                   <AiOutlineClose size={20} className='text-black font-bold'/>
                </div>
               
            </div>
 
            <div className='flex-col px-2 '>
                <ul>
                     <Link href="/">
                        <li onClick = {()=>{setIsOpen(!isOpen)} } className='py-4 px-6 cursor-pointer  hover:text-gray-500 font-semibold text-sm'>Home</li>
                     </Link>
                     <Link href="/jobseekers">
                        <li onClick = {()=>{setIsOpen(!isOpen)} } className='py-4 px-6 cursor-pointer  hover:text-gray-500 font-semibold text-sm'>Job Seekers</li>
                     </Link>
                     <Link href="/availablejobs">
                        <li onClick = {()=>{setIsOpen(!isOpen)} } className='py-4 px-6 cursor-pointer  hover:text-gray-500 font-semibold text-sm'>Available Jobs</li>
                     </Link>
                     <Link href="/employers"> 
                        <li onClick = {()=>{setIsOpen(!isOpen)} } className='py-4  px-6 cursor-pointer  hover:text-gray-500 font-semibold text-sm'>Employers Page</li>
                     </Link>
                     <Link href="/aboutus">
                        <li onClick = {()=>{setIsOpen(!isOpen)} } className='py-4 px-6 cursor-pointer  hover:text-gray-500 font-semibold text-sm'>About Us</li>
                     </Link>
                     <Link href="/contactus">
                        <li onClick = {()=>{setIsOpen(!isOpen)} } className='py-4 px-6 cursor-pointer  hover:text-gray-500 font-semibold text-sm'>Contact Us</li>
                     </Link>
                     <Link  href="/">
                        <button onClick = {()=>{setIsOpen(!isOpen)} } className="  my-2 mx-2 bg-slate-950  hover:bg-slate-800 text-white  rounded-full px-6 py-2 font-semibold cursor-pointer">+62518135</button> 
                     </Link>
                </ul>
            </div>
            </div>
        </div>
    </nav> 
  )
}

export default Navbar