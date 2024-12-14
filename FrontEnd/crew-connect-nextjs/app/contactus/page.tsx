import React from 'react'
import Image  from 'next/image'
import backgroundImage from "public/images/image 21.png"
import ContactUsForm from '../components/ContactUsForm'
const page = () => {
  return (
    <div>
      <div className="w-full h-[50px] border  border-white"></div>
      {/* Top container - hidden on mobile screens */}
      <div className="w-full h-[500px] hidden md:block relative">
        <Image
          src={backgroundImage} 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#021526]/60 flex items-center justify-center"> 
          <h2 className="text-white text-5xl lg:text-6xl font-bold p-4 relative z-10">Contact Us</h2>
        </div>
      </div>
      {/* Bottom container - always visible */}
      <div className="w-full h-auto  bg-white">
        <div className=" h-auto mx-auto px-10 md:px-20 py-10 bg-white  ">
            <div className="grid md:grid-cols-2  ">
                {/*-- Left Column --*/}
                <div className="space-y-6 ">
                    <h2 className="text-4xl lg:text-5xl font-bold md:text-start text-center text-[#021526]">Get in Touch with<br/>Crew Connect</h2>
                    <p className="text-gray-600  md:text-start font-semibold text-center">Need help? Reach out for support with jobs, applications, or inquiries!</p>
                    
                    {/*-- Illustration --*/}
                    <div className="w-full max-w-lg ">
                        <img src="images/contact_us_2.jpg" alt="Contact illustration" className="w-full"/>
                    </div>
                </div>

                {/*-- Right Column - Form --*/}
                <div className="space-y-6 md:pt-20">
                    <ContactUsForm/>
                </div>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default page


