import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TruckIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CalculatorIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

const ShippingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('domestic');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [zipCode, setZipCode] = useState('');

  const tabs = [
    { id: 'domestic', label: 'Domestic Shipping', icon: MapPinIcon },
    { id: 'international', label: 'International', icon: GlobeAltIcon },
    { id: 'calculator', label: 'Shipping Calculator', icon: CalculatorIcon }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 'FREE',
      originalPrice: 'Rs. 150',
      time: '5-7 business days',
      description: 'Free shipping on orders over Rs. 1000',
      icon: TruckIcon,
      features: ['Tracking included', 'Insurance included', 'Signature not required'],
      popular: true
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 'Rs. 300',
      time: '2-3 business days',
      description: 'Faster delivery for urgent orders',
      icon: ClockIcon,
      features: ['Priority handling', 'Tracking included', 'Insurance included'],
      popular: false
    },
    {
      id: 'overnight',
      name: 'Overnight Express',
      price: 'Rs. 800',
      time: '1 business day',
      description: 'Next day delivery for major cities',
      icon: CheckCircleIcon,
      features: ['Next day delivery', 'Signature required', 'Full insurance'],
      popular: false
    }
  ];

  const internationalZones = [
    {
      zone: 'Zone 1',
      countries: ['United States', 'Canada', 'United Kingdom', 'Australia'],
      price: 'Rs. 1,500',
      time: '7-14 business days',
      expressPrice: 'Rs. 3,000',
      expressTime: '3-5 business days'
    },
    {
      zone: 'Zone 2',
      countries: ['Germany', 'France', 'Japan', 'South Korea'],
      price: 'Rs. 1,800',
      time: '10-16 business days',
      expressPrice: 'Rs. 3,500',
      expressTime: '4-7 business days'
    },
    {
      zone: 'Zone 3',
      countries: ['Brazil', 'Russia', 'South Africa', 'Middle East'],
      price: 'Rs. 2,200',
      time: '14-21 business days',
      expressPrice: 'Rs. 4,000',
      expressTime: '7-10 business days'
    }
  ];

  const faqs = [
    {
      question: 'How do I qualify for free shipping?',
      answer: 'Free standard shipping is available on all orders over Rs. 1,000 within Pakistan. The discount is automatically applied at checkout when your order meets the minimum threshold.'
    },
    {
      question: 'Do you ship on weekends and holidays?',
      answer: 'We process orders Monday through Friday. Weekend and holiday orders are processed on the next business day. Express and overnight shipping is not available on weekends and holidays.'
    },
    {
      question: 'Can I change my shipping address after placing an order?',
      answer: 'You can change your shipping address within 1 hour of placing your order by contacting customer service. After that, we cannot guarantee the change as your order may have already been processed.'
    },
    {
      question: 'What happens if I\'m not home for delivery?',
      answer: 'Our delivery partner will attempt delivery 3 times. If unsuccessful, the package will be held at the local facility for 7 days. You\'ll receive notifications and can arrange redelivery or pickup.'
    },
    {
      question: 'Do you ship to PO Boxes?',
      answer: 'We can ship to PO Boxes using standard shipping only. Express and overnight shipping options are not available for PO Box addresses due to signature requirements.'
    },
    {
      question: 'How accurate are delivery estimates?',
      answer: 'Our delivery estimates are accurate 95% of the time. Delays may occur due to weather, customs (for international), or high-volume periods like holidays. We\'ll notify you of any delays.'
    }
  ];

  const calculateShipping = () => {
    if (!zipCode.trim()) {
      alert('Please enter a valid ZIP code');
      return;
    }
    // This would integrate with a real shipping API
    alert(`Shipping options for ${zipCode} calculated! (This is a demo)`);
  };

  const renderDomesticTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
        <TruckIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fast & Reliable Shipping</h2>
        <p className="text-lg text-gray-600 mb-6">
          We deliver across Pakistan with multiple shipping options to meet your needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-green-600">
            <CheckCircleIconSolid className="h-5 w-5 mr-2" />
            <span className="font-medium">Free Shipping Rs. 1000+</span>
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircleIconSolid className="h-5 w-5 mr-2" />
            <span className="font-medium">Tracking Included</span>
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircleIconSolid className="h-5 w-5 mr-2" />
            <span className="font-medium">Secure Packaging</span>
          </div>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="grid md:grid-cols-3 gap-6">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-200 hover:shadow-xl ${
              option.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {option.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center">
              <option.icon className={`h-12 w-12 mx-auto mb-4 ${option.popular ? 'text-blue-600' : 'text-gray-600'}`} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
              <div className="mb-2">
                <span className={`text-2xl font-bold ${option.popular ? 'text-blue-600' : 'text-gray-900'}`}>
                  {option.price}
                </span>
                {option.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">{option.originalPrice}</span>
                )}
              </div>
              <p className="text-gray-600 font-medium mb-3">{option.time}</p>
              <p className="text-gray-500 text-sm mb-4">{option.description}</p>
              
              <ul className="space-y-2">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-center text-sm text-gray-600">
                    <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Coverage Map */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <MapPinIcon className="h-6 w-6 text-blue-600 mr-2" />
          Delivery Coverage Areas
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Major Cities (1-2 Days)</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                Karachi
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                Lahore
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                Islamabad
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                Rawalpindi
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                Faisalabad
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                Multan
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Other Areas (3-7 Days)</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-blue-500 mr-2" />
                All major towns and cities
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-blue-500 mr-2" />
                Rural areas (delivery to nearest hub)
              </div>
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-4 w-4 text-blue-500 mr-2" />
                Remote locations (additional charges may apply)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Services */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Special Shipping Services</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
              Fragile Item Shipping
            </h4>
            <p className="text-gray-600 text-sm">
              Special packaging and handling for delicate items. Additional Rs. 200 for extra protection.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <CalendarDaysIcon className="h-5 w-5 text-blue-500 mr-2" />
              Scheduled Delivery
            </h4>
            <p className="text-gray-600 text-sm">
              Choose a specific delivery date and time slot. Available for express shipping only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInternationalTab = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
        <GlobeAltIcon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">International Shipping</h2>
        <p className="text-lg text-gray-600 mb-6">
          We ship worldwide with reliable delivery and customs support.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-green-600">
            <CheckCircleIconSolid className="h-5 w-5 mr-2" />
            <span className="font-medium">150+ Countries</span>
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircleIconSolid className="h-5 w-5 mr-2" />
            <span className="font-medium">Customs Support</span>
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircleIconSolid className="h-5 w-5 mr-2" />
            <span className="font-medium">Full Insurance</span>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="space-y-6">
        {internationalZones.map((zone, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{zone.zone}</h3>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{zone.price}</div>
                  <div className="text-sm text-gray-500">Standard</div>
                  <div className="text-sm text-gray-500">{zone.time}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{zone.expressPrice}</div>
                  <div className="text-sm text-gray-500">Express</div>
                  <div className="text-sm text-gray-500">{zone.expressTime}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {zone.countries.map((country, countryIndex) => (
                <span
                  key={countryIndex}
                  className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <InformationCircleIcon className="h-6 w-6 mr-2" />
          Important International Shipping Information
        </h3>
        <ul className="space-y-2 text-amber-800">
          <li>• Customs duties and taxes are the responsibility of the recipient</li>
          <li>• Delivery times may vary due to customs processing</li>
          <li>• Some items may be restricted or prohibited in certain countries</li>
          <li>• We provide customs documentation and support throughout the process</li>
          <li>• Insurance is included for lost or damaged packages</li>
          <li>• Tracking is available for all international shipments</li>
        </ul>
      </div>
    </div>
  );

  const renderCalculatorTab = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
        <CalculatorIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Calculator</h2>
        <p className="text-lg text-gray-600">
          Calculate shipping costs and delivery times for your location.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter ZIP/Postal Code
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter ZIP code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={calculateShipping}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Calculate
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Estimates</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Standard Shipping</span>
                <span className="font-medium">FREE (Rs. 1000+)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Express Shipping</span>
                <span className="font-medium">Rs. 300</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overnight Express</span>
                <span className="font-medium">Rs. 800</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight-Based Pricing</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Up to 1 kg</span>
              <span className="font-medium">Base rate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">1-5 kg</span>
              <span className="font-medium">+Rs. 50/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">5-10 kg</span>
              <span className="font-medium">+Rs. 40/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Over 10 kg</span>
              <span className="font-medium">+Rs. 30/kg</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Charges</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Fragile items</span>
              <span className="font-medium">+Rs. 200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remote areas</span>
              <span className="font-medium">+Rs. 150</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled delivery</span>
              <span className="font-medium">+Rs. 250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance (optional)</span>
              <span className="font-medium">2% of value</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast, reliable shipping with multiple options to meet your needs. 
              Free shipping on orders over Rs. 1,000.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'domestic' && renderDomesticTab()}
          {activeTab === 'international' && renderInternationalTab()}
          {activeTab === 'calculator' && renderCalculatorTab()}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping FAQ</h2>
            <p className="text-gray-600">Common questions about our shipping policies and procedures.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 pr-4">{faq.question}</h4>
                  {expandedFaq === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Shipping?</h2>
          <p className="text-blue-100 mb-6">
            Our customer service team is ready to help with any shipping questions or concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Support
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
