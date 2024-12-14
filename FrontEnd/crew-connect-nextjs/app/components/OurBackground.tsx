import React from 'react'
import { CgMenuGridR } from 'react-icons/cg';
import Image from 'next/image';
import image from "public/images/our_background_bg.jpg"
const OurBackground = () => {
  return (
      <div className="w-full bg-[#0A192F] text-white p-8 md:pb-44 md:pt-20 flex justify-center items-start relative overflow-hidden">
        {/*-- Decorative elements --*/}
                  <CgMenuGridR className="absolute md:right-[-5%] right-[-35%]  top-[10%]  opacity-40 transform rotate-[46.83deg] size-[200px] text-white "/>
                  
                  <CgMenuGridR className="absolute md:left-[-5%]  left-[-35%] bottom-[1%]  opacity-40 transform rotate-[46.83deg]  size-[200px] text-white "/>
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="my-10">
                <h1 className="text-5xl md:text-6xl font-bold text-center">
                    Our Background
                </h1>
            </div>
            {/* Content Section */}
            <div className="grid  md:grid-cols-2 gap-12 items-center">
            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden">
                <div className="aspect-w-4 aspect-h-3 relative h-[400px]">
                <Image
                    src={image}
                    alt="Construction worker in orange safety gear"
                    fill
                    className="rounded-3xl object-cover"
                    priority
                />
                </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
                <p className="text-lg md:text-xl font-semibold md:text-start md:font-normal text-center text-white">
                    Finding reliable workers and consistent job opportunities can be 
                    challenging in the labour market. Our upcoming platform aims to 
                    bridge this gap by connecting employers with skilled and 
                    unskilled labourers.
                </p>
                <p className="text-lg md:text-xl font-semibold md:text-start md:font-normal text-center text-white">
                    With easy job postings, worker profiles, and smart matching tools, 
                    the website will make hiring and job-seeking simple and accessible. 
                    Designed to be user-friendly, and secure, it will create 
                    opportunities for workers and help employers find the right talent 
                    quickly and efficiently.
                </p>
            </div>
        </div>
      </div>       
    </div>
  )
}

export default OurBackground