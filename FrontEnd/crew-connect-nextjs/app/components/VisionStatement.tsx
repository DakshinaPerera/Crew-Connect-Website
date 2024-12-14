import React from 'react'
import Image from 'next/image'
import backgroundImage2 from "public/images/vision_bg.jpg"
const VisionStatement = () => {
  return (
    <section className="relative w-full px-4 py-16">
      {/* Background image with reduced opacity */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/images/white_bg.png')",
        }}
       >
      </div>
      <div className="flex relative mx-auto max-w-7xl justify-center items-center text-center">
        <div className="grid grid-cols-1 ">
            <div className="relative lg:h-[636px] lg:w-[953px] h-[500px] w-[350px] mx-auto items-center overflow-hidden rounded-[50px]">
                <Image
                    src={backgroundImage2} 
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    />
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 "> 
                    <h2 className="text-white text-4xl lg:text-6xl mx-4 font-bold">
                        Vision Statement:
                    </h2>
                    <p className="text-white text-xl lg:text-2xl font-semibold mt-10 lg:mt-20 mx-8 max-w-3xl"> 
                        To be Australia's leading labour hire partner, renowned for empowering businesses with exceptional talent and fostering sustainable employment opportunities that drive economic growth and community success.
                    </p>
                </div>
            </div>         
        </div>
      </div>
    </section>
  )
}

export default VisionStatement