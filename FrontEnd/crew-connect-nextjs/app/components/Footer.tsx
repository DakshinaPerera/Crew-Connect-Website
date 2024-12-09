import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logofooter from "public/logofooter.svg"
import ceritifcates from "public/certification.svg"
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaLinkedin } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6"
import { FaPhone } from "react-icons/fa6"
const Footer = () => {
  return (
    <>
      <div className='bg-[#021526] h-1/2 w-full flex md:flex-row flex-col  md:justify-between  items-start pt-10  px-20'>
        <div className="p-5">
          <ul>
            <Link href="/"  className='pb-6'>
                <Image src={logofooter}
                  alt='logo'
                  height="75"
                  width="205"/>
            </Link>
            <div className='flex gap-6 justify-center py-5'>
              <FaInstagram className='text-2xl cursor-pointer text-white hover:text-gray-600'/>
              <FaXTwitter className='text-2xl cursor-pointer text-white hover:text-gray-600'/>
              <FaLinkedin className='text-2xl cursor-pointer text-white hover:text-gray-600'/>
              <FaFacebook className='text-2xl cursor-pointer text-white hover:text-gray-600'/>
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-10">
              Learn More
            </p>
            <Link rel="stylesheet" href="/aboutus">
              <li  className='text-white text-md pb-4 font-semibold hover:text-gray-600 cursor-pointer'>
                About us
              </li>
            </Link>
            <Link rel="stylesheet" href="/privacypolicy">
              <li className='text-white text-md pb-4 font-semibold hover:text-gray-600 cursor-pointer'>
                Privacy Policy
              </li>
            </Link>
            <Link rel="stylesheet" href="/contactus">
              <li className='text-white text-md pb-4 font-semibold hover:text-gray-600 cursor-pointer'>
                Contact us
              </li>
            </Link>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-10">
              Categories
            </p>
            <Link rel="stylesheet" href="/jobseekers">
              <li className='text-white text-md pb-4 font-semibold hover:text-gray-600 cursor-pointer'>
                Job Seekers 
              </li>
            </Link>
            <Link rel="stylesheet" href="/employers">
              <li className='text-white text-md pb-4 font-semibold hover:text-gray-600 cursor-pointer'>
                Employers
              </li>
            </Link>           
            <Link rel="stylesheet" href="/availablejobs">
              <li className='text-white text-md pb-4 font-semibold hover:text-gray-600 cursor-pointer'>
                Postings
              </li>
            </Link>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <Link rel="stylesheet" href="/">
              <li className='text-white text-md sm:w-[311px] sm:h-[88px] w-[230px] h-[88px] pb-4 gap-4 font-semibold flex items-center  hover:text-gray-600 cursor-pointer'>
                <FaLocationDot className='text-5xl cursor-pointer   hover:text-gray-600  text-white'/>
                J92/21 Hall Street Port Melbourne, Victoria 3027, Australia
              </li>
            </Link>
            <Link rel="stylesheet" href="/">
              <li className='text-white text-md pb-4 font-semibold  sm:w-[311px] sm:h-[88px] w-[230px] h-[88px] gap-4 flex items-center hover:text-gray-600 cursor-pointer'>
                <FaPhone className='text-5xl cursor-pointer   hover:text-gray-600  text-white'/>
                For Inquiries Contact:
                +61 03 0000 1111
              </li>
            </Link>
            <li className='text-md pb-4 font-semibold'>
              <Image src={ceritifcates}
                    alt='logo'
                    height="75"
                    width="255"/>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  pb-5 bg-[#021526]">
        <h1 className="text-white md:w-[490px]   h-20 font-light text-sm">Crew Connect acknowledges the Traditional Owners of Country on which we live and work throughout Australia and pay our respects to Elders past and present and extend that respect to all Aboriginal and Torres Strait Islander cultures.</h1>
      </div>
      <div className="w-full h-[0px] border border-white"></div>
      <div className="flex flex-col justify-center items-center text-center p-2 bg-[#021526]">
        <h1 className="text-white font-normal">Crew Connect 2024 | All rights reserved</h1>
      </div>
    </>  
  )
}

export default Footer

