import React from 'react'
import Image from 'next/image'
import backgroundImage from "public/images/employers_page.png"
import BasicButton from '../components/button';
const EmployersBanner = () => {
  return (
        <div>
            <div className="w-full h-[60px] border  border-white"></div>
            <div className="w-full h-[700px] relative">
                <Image
                    src={backgroundImage} 
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-16"> 
                <div className="max-w-2xl">
                    <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight mb-6">
                    Your Next Top Employee is Just a Click Away
                    </h1>
                    <p className="text-white text-xl md:text-2xl mb-8">
                    Get started today — post a job and find the talent you need!
                    </p>
                    <BasicButton
                        href="/postjob"
                        title="Post a Job"
                        className="w-[180px]"
                    />
                
                </div>
                </div>
            </div>
        </div>
  )
}

export default EmployersBanner
