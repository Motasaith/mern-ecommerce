import React from 'react';
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: ShoppingBagIcon,
      title: 'Wide Product Selection',
      description: 'Thousands of products across multiple categories to meet all your needs'
    },
    {
      icon: TruckIcon,
      title: 'Fast Shipping',
      description: 'Quick and reliable delivery right to your doorstep'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you anytime'
    },
    {
      icon: CreditCardIcon,
      title: 'Secure Payments',
      description: 'Safe and encrypted payment processing for your peace of mind'
    },
    {
      icon: HeartIcon,
      title: 'Quality Guarantee',
      description: 'Every product is carefully selected to meet our high standards'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trusted Platform',
      description: 'Built on trust, reliability, and customer satisfaction'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products Available' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We carefully curate our products to ensure they meet the highest quality standards.',
      color: 'blue',
      icon: CheckCircleIcon
    },
    {
      title: 'Customer Trust',
      description: 'Building long-term relationships with our customers based on trust and reliability.',
      color: 'green',
      icon: ShieldCheckIcon
    },
    {
      title: 'Innovation',
      description: 'Constantly improving our platform to provide the best shopping experience.',
      color: 'purple',
      icon: StarIcon
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-yellow-300">ShopHub</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your premier destination for quality products and exceptional shopping experiences. 
              Discover, shop, and enjoy with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-lg">
                Start Shopping
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transform transition duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Mission</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At ShopHub, our mission is to revolutionize online shopping by providing a seamless, 
              secure, and enjoyable experience for every customer. We believe that shopping should be 
              convenient, affordable, and accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">ShopHub?</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're committed to providing you with the best online shopping experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These values guide everything we do and shape our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600',
                green: 'from-green-500 to-green-600 bg-green-50 text-green-600',
                purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600'
              };
              
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${colorClasses[value.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[value.color as keyof typeof colorClasses].split(' ')[1]} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span className="text-yellow-300">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Have questions or need assistance? Our friendly customer service team is here to help. 
            We're available 24/7 to ensure you have the best shopping experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="font-semibold mb-2">Call Us</div>
              <div className="text-yellow-300 text-lg font-bold">1-800-SHOPHUB</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="font-semibold mb-2">Email Us</div>
              <div className="text-yellow-300 text-lg font-bold">support@shophub.com</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="font-semibold mb-2">Live Chat</div>
              <div className="text-yellow-300 text-lg font-bold">Available 24/7</div>
            </div>
          </div>
          
          <div className="mt-12">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-xl">
              Contact Support
            </button>
          </div>
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

export default AboutPage;
