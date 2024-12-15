import React from 'react'
import { CgMenuGridR } from 'react-icons/cg';

const page = () => {
  return (
    <div>
      <div className="min-h-screen bg-[#021526] flex justify-center items-center relative overflow-hidden">
          {/*-- Decorative elements --*/}
          <CgMenuGridR className="absolute left-[-5%] top-[10%]  opacity-40 transform rotate-[46.83deg] size-[200px] text-white "/>
          
          <CgMenuGridR className="absolute right-[-5%] bottom-[1%]  opacity-40 transform rotate-[46.83deg]  size-[200px] text-white "/>
          

          {/*-- Main content container --*/}
          <div className="w-[90%] max-w-[938px] opacity-100 z-10 bg-[#d9d9d9] rounded-[30px] p-8 m-4 flex flex-col items-center">
              <h1 className="text-[#021526] text-[40px] font-bold  leading-[38px] mb-8">
                  Privacy Policy
              </h1>
              
              <div className="max-w-[734px] text-center">
                  <p className="text-[#021526] text-xl font-normal font-['Roboto'] leading-[30px]">
                      At Crew Connect, safeguarding your privacy is our priority. We adhere strictly to the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). The personal information we collect is used exclusively for recruitment purposes, such as evaluating your suitability for job opportunities, sharing relevant details with prospective employers, and meeting legal requirements. Your information is securely stored and will not be shared with third parties without your consent, except where required by law. You can request access to, correction of, or updates to your personal information by contacting us at <a href="mailto:admin@crewconnect.com.au" className="underline">admin@crewconnect.com.au</a>.
                  </p>
              </div>
          </div>
      </div> 
      <div className="w-full h-[0px] border border-white"></div>
    </div>
  )
}

export default page