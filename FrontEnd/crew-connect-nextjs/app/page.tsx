import Image from 'next/image'
import CatalogSection from './components/CatalogSection'
import WhyEmployersSection from './components/WhyEmployersSection'
import BasicButton from './components/button';

export default function Home() {
  return (
    <main>
      {/**Hero Section */}
      <div className="bg-primary flex flex-col lg:flex-row mt-[66px] px-16 items-center justify-between relative overflow-hidden">
        {/* Hero Text Section */}
        <div className="w-full lg:w-1/2 text-white mb-8 mt-8 lg:mb-0 pr-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Next Job in Australia Today
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Explore a wide range of job opportunities <br/> tailored for skilled laborers across Australia.
          </p>
          <BasicButton 
            href="/jobseekers" 
            title="Search for Job" 
            className="w-[180px]"
          />
        </div>

        {/* Hero Image Section */}
        <div className="w-full lg:w-1/2 relative h-[600px] lg:h-[650px]">
          <Image
            src="/images/hero_section.png"
            alt="Construction workers discussing project"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/** Category Section */}
      <CatalogSection />

      {/** Why Employers Section */}
      <WhyEmployersSection/>
      <div className="w-full h-[0px] border border-white"></div>
    </main>
  )
}