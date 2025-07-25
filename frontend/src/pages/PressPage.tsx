import React from 'react';
import { 
  NewspaperIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  CameraIcon,
  UserGroupIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const PressPage: React.FC = () => {
  const pressReleases = [
    {
      title: 'ShopHub Announces Record-Breaking Q4 Sales Growth',
      date: 'December 15, 2023',
      category: 'Financial News',
      excerpt: 'ShopHub reports 45% year-over-year growth in Q4, driven by innovative features and expanded product catalog.',
      color: 'blue'
    },
    {
      title: 'ShopHub Partners with Leading Sustainable Brands',
      date: 'November 28, 2023',
      category: 'Partnerships',
      excerpt: 'New eco-friendly initiative brings 500+ sustainable products to our platform, supporting environmental responsibility.',
      color: 'green'
    },
    {
      title: 'ShopHub Wins E-commerce Innovation Award 2023',
      date: 'October 20, 2023',
      category: 'Awards',
      excerpt: 'Recognition for outstanding customer experience and technological advancement in online retail.',
      color: 'purple'
    },
    {
      title: 'ShopHub Expands to 5 New International Markets',
      date: 'September 12, 2023',
      category: 'Expansion',
      excerpt: 'Global expansion brings ShopHub to customers in Europe and Asia, with localized shopping experiences.',
      color: 'orange'
    }
  ];

  const mediaKit = [
    {
      title: 'Company Logos',
      description: 'High-resolution logos in various formats',
      icon: CameraIcon,
      items: ['PNG', 'SVG', 'EPS formats', 'Light & dark versions']
    },
    {
      title: 'Brand Guidelines',
      description: 'Complete brand identity and usage guidelines',
      icon: DocumentTextIcon,
      items: ['Color palette', 'Typography', 'Logo usage', 'Brand voice']
    },
    {
      title: 'Product Images',
      description: 'Professional product photography and screenshots',
      icon: CameraIcon,
      items: ['App screenshots', 'Product photos', 'Interface mockups', 'Lifestyle images']
    },
    {
      title: 'Executive Photos',
      description: 'Professional headshots of leadership team',
      icon: UserGroupIcon,
      items: ['CEO headshot', 'Leadership team', 'Board members', 'Various resolutions']
    }
  ];

  const stats = [
    { number: '2M+', label: 'Active Users', color: 'blue' },
    { number: '50K+', label: 'Products', color: 'green' },
    { number: '99.9%', label: 'Uptime', color: 'purple' },
    { number: '150+', label: 'Countries', color: 'orange' }
  ];

  const awards = [
    {
      title: 'Best E-commerce Platform 2023',
      organization: 'Digital Commerce Awards',
      year: '2023',
      icon: TrophyIcon
    },
    {
      title: 'Innovation in Customer Experience',
      organization: 'Retail Tech Excellence',
      year: '2023',
      icon: TrophyIcon
    },
    {
      title: 'Sustainable Business Leader',
      organization: 'Green Commerce Initiative',
      year: '2022',
      icon: TrophyIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <NewspaperIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Press & <span className="text-yellow-300">Media</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stay updated with ShopHub's latest news, announcements, and media resources. 
              Your go-to source for company updates and press materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-lg">
                Download Media Kit
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition duration-300">
                Contact Press Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ShopHub by the Numbers</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const colorClasses = {
                blue: 'text-blue-600',
                green: 'text-green-600',
                purple: 'text-purple-600',
                orange: 'text-orange-600'
              };
              return (
                <div key={index} className="text-center group">
                  <div className={`text-4xl md:text-5xl font-bold ${colorClasses[stat.color as keyof typeof colorClasses]} mb-2 group-hover:scale-110 transform transition duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Press Releases Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest <span className="text-blue-600">Press Releases</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed with our latest company news, product launches, and business updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pressReleases.map((release, index) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600'
              };
              
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-block px-3 py-1 bg-gradient-to-r ${colorClasses[release.color as keyof typeof colorClasses]} text-white text-sm font-medium rounded-full`}>
                        {release.category}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarDaysIcon className="w-4 h-4 mr-2" />
                        {release.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition duration-300">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{release.excerpt}</p>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition duration-300">
                      Read Full Release
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Media Kit Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Media <span className="text-blue-600">Kit</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Download our complete media kit with logos, brand guidelines, and high-resolution assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaKit.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <ul className="text-gray-500 text-sm space-y-1 mb-6">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex}>• {subItem}</li>
                      ))}
                    </ul>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300">
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Awards & <span className="text-blue-600">Recognition</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're honored to be recognized by industry leaders for our innovation and excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => {
              const IconComponent = award.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-yellow-600 font-bold text-lg mb-2">{award.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{award.title}</h3>
                    <p className="text-gray-600">{award.organization}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <MegaphoneIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Press <span className="text-yellow-300">Inquiries</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            For media inquiries, interview requests, or additional information, please contact our press team. 
            We're here to help with your story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="font-semibold mb-2">Press Contact</div>
              <div className="text-yellow-300 text-lg font-bold">press@shophub.com</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="font-semibold mb-2">Media Relations</div>
              <div className="text-yellow-300 text-lg font-bold">1-800-PRESS-HUB</div>
            </div>
          </div>
          
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-xl">
            Contact Press Team
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PressPage;
