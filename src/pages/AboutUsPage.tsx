import React, { useEffect } from 'react';
import { Nav } from '../components/Nav';
import { Building2, Users, Target, Lightbulb, Award, Globe } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const founders = [
    {
      name: 'Christopher Haß',
      position: 'Co-Founder & CEO',
      qrCode: '/assets/C.H._QR.png',
      description: 'Christopher leads TokeItReal with extensive project management experience from Drees & Sommer, where he managed major construction projects including the revitalization of Tegel Airport and the Buckower Felder district development in Berlin-Neukölln. His technical expertise in 3D CAD and self-taught programming skills, combined with entrepreneurial experience from his family\'s business, provide the foundation for our platform development.',
      expertise: ['Project Management', 'Technical Analysis', 'Platform Development', 'Strategic Planning']
    },
    {
      name: 'Felix Behnke',
      position: 'Co-Founder & CTO',
      qrCode: '/assets/F.B._QR.png',
      description: 'Felix brings deep architectural expertise and Real Estate Project Management knowledge to TokeItReal. His experience spans from architectural firms to construction sites, including work on high-value projects and complex developments like the Berlin Bundesrat. His year-long experience in Silicon Valley, California, adds valuable international perspective to our vision.',
      expertise: ['Architecture', 'Real Estate Management', 'Network Building', 'International Markets']
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Making real estate investment accessible to everyone, starting from just €1'
    },
    {
      icon: Building2,
      title: 'Quality',
      description: 'Selecting only high-yield properties through rigorous due diligence'
    },
    {
      icon: Users,
      title: 'Transparency',
      description: 'Providing complete visibility into all transactions and property management'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Leveraging blockchain technology and AI to revolutionize real estate'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the visionaries behind TokeItReal's mission to democratize real estate investment
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  We founded TokeItReal with a simple yet powerful vision: to transform the traditional real estate market from an exclusive playground for the wealthy into an accessible investment opportunity for everyone.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Having witnessed firsthand the barriers that prevent ordinary people from participating in real estate investment, we saw an opportunity to leverage blockchain technology and tokenization to break down these walls.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our combined expertise in project management, architecture, and real estate, enhanced by our network of strategic partners and mentors, positions us uniquely to revolutionize this €164 trillion market.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/assets/Team_Photo.jpeg"
                  alt="Christopher Haß and Felix Behnke - TokeItReal Co-Founders"
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">Co-Founders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founders */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 text-center mb-12">
            Meet the Founders
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <div key={founder.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="flex-shrink-0">
                      <img
                        src={founder.qrCode}
                        alt={`${founder.name} Contact QR Code`}
                        className="w-24 h-24 rounded-lg shadow-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                        {founder.name}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {founder.position}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 text-center mb-8">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3">
                  AI-First Principle
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We leverage artificial intelligence to automate complex processes and data analysis, making our platform more efficient and accessible.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3">
                  Expert Network
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our strategic partnerships with industry experts, including FIBREE network and academic mentors, ensure professional excellence.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3">
                  Community Focus
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in building a community of investors who can participate in the real estate market regardless of their financial background.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-black dark:bg-white text-white dark:text-black rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-light mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Together, we're building the future of real estate investment
            </p>
            <a
              href="https://www.linkedin.com/company/tokeitreal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white dark:bg-black text-black dark:text-white px-8 py-4 rounded-lg font-light
                       hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300
                       transform hover:scale-105 active:scale-95"
            >
              Connect with Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};