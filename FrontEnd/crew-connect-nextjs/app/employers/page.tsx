import React from 'react'
import ContactUsForm from '../components/ContactUsForm';
import EmployersBanner from '../components/EmployersBanner';
import { FaGears } from "react-icons/fa6";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbBuildingWarehouse } from "react-icons/tb";

const page = () => {
  const advantages = [
    {
      title: "Tailored Workforce Solutions",
      description: "We specialize in connecting businesses with skilled professionals through flexible, cost-effective staffing solutions designed to meet your unique needs. Whether you need short-term support or long-term staffing, we've got you covered."
    },
    {
      title: "Focus on Quality and Compliance",
      description: "By prioritizing high standards and adherence to Australian employment regulations, we ensure you hire reliable, compliant talent. Our rigorous processes guarantee peace of mind for every employer."
    },
    {
      title: "Commitment to Client Satisfaction",
      description: "Your success is our priority. We deliver staffing solutions that drive productivity and foster long-term partnerships. Our dedicated team works closely with you to understand your goals and deliver results."
    },
    {
      title: "Industry Expertise You Can Trust",
      description: "With in-depth understanding of labor market demands, we match the right people to the right roles, ensuring every hire supports your goals. Our proven track record makes us a trusted choice for businesses across Australia."
    }
  ];

  const industries = [
    {
      title: "Logistics",
      description: "Find workers to streamline transportation, supply chain operations, and goods management.",
      icon:<FaGears className="w-12 h-12  text-black " />
    },
    {
      title: "Manufacturing",
      description: "Hire experts for production lines, assembly work, and quality control to keep operations running smoothly.",
      icon:<GiCardboardBoxClosed className="w-12 h-12  text-black" />
    },
    {
      title: "Warehousing",
      description: "Access skilled staff for inventory management, order picking, packing, and distribution tasks.",
      icon:<TbBuildingWarehouse className="w-12 h-12 text-black" />
    }
  ];

  return (
    <div>
      <EmployersBanner/>
      <div className="bg-[#021526] text-white min-h-screen relative">

        {/* Advantage Section */}
        <section className="px-4 py-16 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            The Crew Connect Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white text-[#021526] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-gray-700">{advantage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curved Transition */}
        <div className="relative pb-[8rem]">
          <svg
            className="absolute bottom-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,112C1120,96,1280,96,1360,104L1440,112L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Industries Section */}
        <section className="bg-white relative  pb-[6rem] md:pb-[12rem]">
          <div className="px-4 max-w-7xl mx-auto">
            <div className="flex items-center h-full">
              {/* Left side - Text Content (60% width) */}
              <div className="md:w-3/5 md:pr-12">
                <h2 className="text-4xl font-bold text-center text-[#021526] mb-8">
                  Industries We Serve
                </h2>
                <p className="text-gray-700 mb-12 text-center md:text-start">
                  At Crew Connect, we specialize in helping employers find top talent
                  across various industries. With our deep understanding of market
                  demands, we connect skilled workers to businesses in need of
                  reliable, efficient labour.
                </p>
                <div className="space-y-6">
                  {industries.map((industry, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4"
                    >
                      <span className="text-3xl">{industry.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-[#021526] mb-2">
                          {industry.title}
                        </h3>
                        <p className="text-gray-700">{industry.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Image Placeholder (40% width) */}
              <div className="md:w-2/5  hidden md:flex items-center pl-16">
                <img
                  src="/images/people_climbing.png"
                  alt="Industry Overview"
                  className="w-[360px] h-[480px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Curve */}
        <div className="relative ">
          <svg
            className="absolute bottom-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <path
              fill="#021526"
              d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,112C1120,96,1280,96,1360,104L1440,112L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
          <div className="w-full h-auto  bg-primary">
            <div className=" h-auto mx-auto px-10 md:px-20 py-10 bg-primary  ">
                <h2 className="text-4xl lg:text-5xl font-bold pb-10  text-center text-white">Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-2 ">
                    {/*-- Left Column --*/}
                    <div className="space-y-6 ">
                        
                        <p className="text-white text-xl md:mx-20 md:text-start font-semibold text-center">Have questions or need assistance? Our team at Crew Connect is here to help you every step of the way. Whether you’re posting a job or searching for the perfect hire, we’re just a message away.</p>
                        
                        {/*-- Illustration --*/}
                        <div className="w-full md:pl-20 max-w-lg ">
                            <img src="contactusicon.svg" alt="Contact illustration" className=""/>
                        </div>
                    </div>

                    {/*-- Right Column - Form --*/}
                    <div className="space-y-6 ">
                        <ContactUsForm/>
                    </div>
                </div>
            </div>
          </div>        
        <div className="w-full h-[0px] border border-white"></div>
      </div>
    </div>
    
  )
}

export default page