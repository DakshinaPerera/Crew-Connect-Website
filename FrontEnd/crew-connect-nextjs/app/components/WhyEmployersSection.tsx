import React from 'react';
import BasicButton from './button';

const WhyEmployersSection = () => {
  const features = [
    {
      icon: <img src="/images/group_icon.png" alt="Feature 1" className="h-18 w-22" />,
      title: 'Reach a Wide Network of Skilled Labourers',
      description:
        'Crew Connect connects you with a vast pool of active job seekers across Australia, making it easy to find reliable candidates quickly.',
    },
    {
      icon: <img src="/images/post_icon.png" alt="Feature 2" className="h-20 w-20" />,
      title: 'Simple and Efficient Job Posting',
      description:
        'Our platform offers an intuitive interface that allows you to post jobs effortlessly, helping you reach potential hires without any hassle.',
    },
    {
      icon: <img src="/images/price_tag_icon.png" alt="Feature 3" className="h-20 w-20" />,
      title: 'Compliance with Industry Standards',
      description:
        'We ensure all job postings adhere to Australian employment and safety regulations, giving you peace of mind.',
    },
    {
      icon: <img src="/images/success_icon.png" alt="Feature 4" className="h-20 w-20" />,
      title: 'Affordable and Transparent Pricing',
      description:
        'With no hidden fees, Crew Connect offers cost-effective solutions for employers looking to fill their positions quickly and efficiently.',
    },
  ];

  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column */}
          <div className="w-full lg:w-2/5 px-4 mb-8 lg:mb-0 flex flex-col items-center justify-center">
            <div className="relative mb-8 overflow-hidden rounded-lg">
              <img
                src="/images/home_employers_cropped.png"
                alt="Employers discussing work"
                className="w-[400px] rounded-lg object-cover h-[320px] object-center"
              />
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white text-center">
              Why Employers Choose <br /> Crew Connect
            </h2>
            <BasicButton
              href="/employers"
              title="Post a Job"
              className="w-[180px]"
            />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-3 p-6 text-center"
              >
                <div className="flex justify-center items-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEmployersSection;