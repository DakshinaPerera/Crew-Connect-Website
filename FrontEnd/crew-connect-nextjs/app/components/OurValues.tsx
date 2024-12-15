import { FaClipboardCheck, FaUsers, FaBook, FaUser } from 'react-icons/fa';
import { MdWork, MdDiversity3 } from 'react-icons/md';
import { BiBuildings } from 'react-icons/bi';
import { FaLightbulb } from "react-icons/fa";
import backgroundImage2 from "public/images/vision_bg.jpg"

export default function OurValues() {
  const values = [
    {
      title: "Commitment to Compliance and Safety",
      description: "We adhere strictly to Australian labour laws and industry standards, ensuring a safe and compliant work environment for all employees and clients.",
      icon: <FaClipboardCheck className="w-12 h-12" />,
      bgColor: "bg-blue-500" 
    },
    {
      title: "Quality Workforce Solutions",
      description: "We provide skilled and reliable workers tailored to meet the unique needs of businesses, helping them achieve operational excellence.",
      icon: <FaUsers className="w-12 h-12" />,
      bgColor: "bg-gray-900"
    },
    {
      title: "Ethical and Transparent Practices",
      description: "Our business operates with integrity, fostering trust through fair and transparent recruitment, placement, and payroll processes.",
      icon: <FaBook className="w-12 h-12" />,
      bgColor: "bg-blue-500"
    },
    {
      title: "Customer-Centric Approach",
      description: "Our business operates with integrity, fostering trust through fair and transparent recruitment, placement, and payroll processes.",
      icon: <FaUser className="w-12 h-12" />,
      bgColor: "bg-gray-900"
    },
    {
      title: "Empowering the Workforce",
      description: "We support employees by offering competitive pay, ongoing training opportunities, and clear pathways for career advancement.",
      icon: <MdWork className="w-12 h-12" />,
      bgColor: "bg-gray-900"
    },
    {
      title: "Focus on Diversity and Inclusion",
      description: "We champion a diverse workforce, promoting equal opportunities and creating inclusive workplaces that reflect the communities we serve.",
      icon: <MdDiversity3 className="w-12 h-12" />,
      bgColor: "bg-blue-500"
    },
    {
      title: "Sustainability and Community Impact",
      description: "We aim to contribute positively to local communities by supporting sustainable practices and providing employment opportunities that uplift lives.",
      icon: <BiBuildings className="w-12 h-12" />,
      bgColor: "bg-gray-900"
    },
    {
      title: "Innovative Solutions",
      description: "Leveraging technology and industry insights, we streamline the hiring process to ensure efficiency and optimal results for both employers and workers.",
      icon: <FaLightbulb className="w-12 h-12" />,
      bgColor: "bg-blue-500"
    }
  ];

  return (
    <div 
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: "url('/images/white_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-700 mb-4">Our Values</h1>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${value.bgColor} rounded-xl p-6 md:w-[273px] md:h-[349px]  text-white text-center transform transition duration-500 hover:scale-105 backdrop-blur-sm`}
            >
              <div className="flex flex-col justify-center items-center h-full">
                <div className="mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-sm opacity-90">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}