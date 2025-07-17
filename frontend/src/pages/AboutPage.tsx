import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">About ShopHub</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Welcome to ShopHub, your premier destination for quality products and exceptional shopping experiences. 
                Founded in 2024, we've been dedicated to bringing you the best products at competitive prices, 
                backed by outstanding customer service.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At ShopHub, our mission is to revolutionize online shopping by providing a seamless, 
                secure, and enjoyable experience for every customer. We believe that shopping should be 
                convenient, affordable, and accessible to everyone.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Wide selection of products across multiple categories
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Competitive prices and regular deals
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Fast and reliable shipping
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  24/7 customer support
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Secure payment processing
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Quality</h3>
                  <p className="text-blue-700">
                    We carefully curate our products to ensure they meet the highest quality standards.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Trust</h3>
                  <p className="text-green-700">
                    Building long-term relationships with our customers based on trust and reliability.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Innovation</h3>
                  <p className="text-purple-700">
                    Constantly improving our platform to provide the best shopping experience.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                Have questions or need assistance? Our friendly customer service team is here to help. 
                Reach out to us through our contact page or call us at 1-800-SHOPHUB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
