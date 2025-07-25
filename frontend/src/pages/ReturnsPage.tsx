import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowPathIcon,
  ClockIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  ChatBubbleLeftEllipsisIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  CubeIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

const ReturnsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('policy');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const tabs = [
    { id: 'policy', label: 'Return Policy', icon: ArrowPathIcon },
    { id: 'process', label: 'Return Process', icon: ClockIcon },
    { id: 'tracking', label: 'Track Return', icon: MagnifyingGlassIcon },
    { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon }
  ];

  const returnReasons = [
    { id: 'defective', label: 'Defective/Damaged', icon: ExclamationTriangleIcon, color: 'red' },
    { id: 'size', label: 'Wrong Size', icon: CubeIcon, color: 'blue' },
    { id: 'not-expected', label: 'Not as Expected', icon: XCircleIcon, color: 'yellow' },
    { id: 'changed-mind', label: 'Changed Mind', icon: ArrowPathIcon, color: 'green' }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Start your return request online or contact customer service',
      icon: DocumentTextIcon,
      status: 'complete'
    },
    {
      step: 2,
      title: 'Pack & Ship',
      description: 'Pack your items securely and ship with provided label',
      icon: CubeIcon,
      status: 'active'
    },
    {
      step: 3,
      title: 'Processing',
      description: 'We inspect your return and process the refund',
      icon: ClockIcon,
      status: 'pending'
    },
    {
      step: 4,
      title: 'Refund Issued',
      description: 'Refund is issued to your original payment method',
      icon: CreditCardIcon,
      status: 'pending'
    }
  ];

  const faqs = [
    {
      question: 'How long do I have to return an item?',
      answer: 'You have 30 days from the delivery date to return most items. Some categories like electronics may have different return windows.'
    },
    {
      question: 'Who pays for return shipping?',
      answer: 'Return shipping is free for defective or incorrect items. For other returns, a small return shipping fee may apply, which will be deducted from your refund.'
    },
    {
      question: 'How long does it take to get my refund?',
      answer: 'Once we receive your return, refunds are typically processed within 3-5 business days. It may take additional time to appear on your statement depending on your bank.'
    },
    {
      question: 'Can I return items without the original packaging?',
      answer: 'Items should be returned in their original packaging when possible. Items without original packaging may be subject to a restocking fee.'
    },
    {
      question: 'What items cannot be returned?',
      answer: 'Personalized items, digital downloads, perishable goods, and items damaged by misuse cannot be returned. Health and beauty items must be unopened.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes! You can exchange items for a different size, color, or style. Exchanges are processed as a return and new order to ensure faster delivery.'
    }
  ];

  const handleTrackReturn = () => {
    if (trackingNumber.trim()) {
      // In a real app, this would navigate to a tracking page
      alert(`Tracking return with number: ${trackingNumber}`);
    }
  };

  const renderPolicyTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <ArrowPathIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hassle-Free Returns</h2>
          <p className="text-lg text-gray-600 mb-6">
            We want you to love your purchase! If you're not completely satisfied, 
            return it within 30 days for a full refund or exchange.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-green-600">
              <CheckCircleIconSolid className="h-5 w-5 mr-2" />
              <span className="font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircleIconSolid className="h-5 w-5 mr-2" />
              <span className="font-medium">Free Return Shipping*</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircleIconSolid className="h-5 w-5 mr-2" />
              <span className="font-medium">Fast Refunds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Return Requirements */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">What You Can Return</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircleIconSolid className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Items in original, unused condition</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIconSolid className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Items with original packaging and tags</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIconSolid className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Items returned within 30 days of delivery</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIconSolid className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Items with proof of purchase</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <XCircleIcon className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">What You Cannot Return</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <XCircleIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Personalized or customized items</span>
            </li>
            <li className="flex items-start">
              <XCircleIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Digital downloads and software</span>
            </li>
            <li className="flex items-start">
              <XCircleIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Perishable goods and food items</span>
            </li>
            <li className="flex items-start">
              <XCircleIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Items damaged by misuse</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Return Timeframes */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <CalendarDaysIcon className="h-6 w-6 text-blue-600 mr-2" />
          Return Timeframes by Category
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Most Items</h4>
            <p className="text-green-700 text-sm">30 days from delivery</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Electronics</h4>
            <p className="text-yellow-700 text-sm">15 days from delivery</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Health & Beauty</h4>
            <p className="text-blue-700 text-sm">30 days, unopened only</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessTab = () => (
    <div className="space-y-8">
      {/* Process Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Return Process Timeline</h3>
        <div className="relative">
          {processSteps.map((step, index) => (
            <div key={step.step} className="flex items-center mb-8 last:mb-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-4 border-blue-600 relative z-10">
                <step.icon className="h-6 w-6 text-blue-600" />
              </div>
              {index < processSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300 -z-10"></div>
              )}
              <div className="ml-6 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">Step {step.step}: {step.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    step.status === 'complete' ? 'bg-green-100 text-green-800' :
                    step.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {step.status === 'complete' ? 'Complete' :
                     step.status === 'active' ? 'In Progress' : 'Pending'}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Start a Return</h3>
          <p className="text-blue-700 mb-6">Have an order you need to return? Start the process now.</p>
          <Link
            to="/orders"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            View My Orders
          </Link>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">Need Help?</h3>
          <p className="text-green-700 mb-6">Our customer service team is here to assist you.</p>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>

      {/* Return Reasons */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Common Return Reasons</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {returnReasons.map((reason) => {
            const colorClasses = {
              red: { border: 'border-red-200', bg: 'bg-red-50', icon: 'text-red-600', text: 'text-red-900' },
              blue: { border: 'border-blue-200', bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-900' },
              yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', icon: 'text-yellow-600', text: 'text-yellow-900' },
              green: { border: 'border-green-200', bg: 'bg-green-50', icon: 'text-green-600', text: 'text-green-900' }
            };
            const colors = colorClasses[reason.color as keyof typeof colorClasses];
            
            return (
              <div key={reason.id} className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg}`}>
                <reason.icon className={`h-8 w-8 ${colors.icon} mb-2`} />
                <h4 className={`font-semibold ${colors.text}`}>{reason.label}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTrackingTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <TruckIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Track Your Return</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your return tracking number to see the current status of your return shipment.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex space-x-2">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleTrackReturn}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Track
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Return Tracking Tips:</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Tracking numbers are provided via email once your return is processed</li>
            <li>• It may take 24-48 hours for tracking information to appear</li>
            <li>• Contact customer service if you can't locate your tracking number</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Alternative Tracking Methods</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/orders"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
          >
            <DocumentTextIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">My Orders</h4>
            <p className="text-sm text-gray-600">View all your orders and returns</p>
          </Link>
          <Link
            to="/contact"
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center"
          >
            <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Live Chat</h4>
            <p className="text-sm text-gray-600">Chat with customer service</p>
          </Link>
          <a
            href="tel:1-800-746-7482"
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-center"
          >
            <PhoneIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Call Us</h4>
            <p className="text-sm text-gray-600">1-800-SHOPHUB</p>
          </a>
        </div>
      </div>
    </div>
  );

  const renderFaqTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <QuestionMarkCircleIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <p className="text-gray-600">Find quick answers to common questions about returns and refunds.</p>
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

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Still Have Questions?</h4>
        <p className="text-gray-600 mb-6">Can't find what you're looking for? Our customer service team is here to help!</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Contact Support
          </Link>
          <a
            href="tel:1-800-746-7482"
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <PhoneIcon className="h-5 w-5 mr-2" />
            Call 1-800-SHOPHUB
          </a>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Easy returns, fast refunds, and excellent customer service. We're here to make your shopping experience worry-free.
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
          {activeTab === 'policy' && renderPolicyTab()}
          {activeTab === 'process' && renderProcessTab()}
          {activeTab === 'tracking' && renderTrackingTab()}
          {activeTab === 'faq' && renderFaqTab()}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <ShieldCheckIcon className="h-16 w-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">100% Satisfaction Guarantee</h2>
            <p className="text-xl text-blue-100 mb-8">
              We stand behind every product we sell. If you're not completely satisfied, 
              we'll make it right with our hassle-free return policy.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <EnvelopeIcon className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Email Support</h3>
                <p className="text-blue-200 text-sm">returns@shophub.com</p>
              </div>
              <div>
                <PhoneIcon className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Phone Support</h3>
                <p className="text-blue-200 text-sm">1-800-SHOPHUB</p>
              </div>
              <div>
                <ClockIcon className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-blue-200 text-sm">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
