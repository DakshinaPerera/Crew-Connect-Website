import React from 'react'
import backgroundImage from "public/images/about_us.jpg"
import Image from 'next/image'
import VisionStatement from '../components/VisionStatement'
import OurBackground from '../components/OurBackground'
import OurValues from '../components/OurValues'
const page = () => {
  return (
    <div>
      {/* Background image with reduced opacity */}
      <div className="w-full h-[825px] flex relative">
        <Image
          src={backgroundImage} 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-[#021526]/60  flex items-center justify-center"> 
          <h2 className="text-white text-4xl lg:text-6xl text-center font-bold mx-1 p-4 relative z-10"> Empowering Melbourne's Workforce:<br/> Our Mission for Excellence
            <p className="text-white text-xl mx-5 lg:text-2xl font-semibold text-center pt-20 2xl:mx-96 ">Our mission is to empower Melbourne businesses with flexible, compliant, and high-quality workforce solutions by seamlessly connecting skilled professionals to the right opportunities. Through innovation, integrity, and a steadfast commitment to excellence, we strive to deliver value to both our clients and candidates while driving growth and prosperity in the local economy.</p>
          </h2> 
        </div>
      </div>
      <VisionStatement/>
      <OurBackground/>
      <OurValues/>
    </div>
  )
}

export default page