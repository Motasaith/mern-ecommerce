import React from 'react';

const ReturnsPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns & Refunds</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Return Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We want you to be completely satisfied with your purchase. If you're not happy with your order, 
                you can return it within 30 days of delivery for a full refund or exchange.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Return Requirements</h3>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>• Items must be returned within 30 days of delivery</li>
                <li>• Items must be in original, unused condition</li>
                <li>• Items must be in original packaging</li>
                <li>• Include original receipt or order confirmation</li>
                <li>• Return shipping is free for defective items</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Return an Item</h3>
              <ol className="text-gray-700 mb-6 space-y-2">
                <li>1. Log into your account and go to "My Orders"</li>
                <li>2. Find your order and click "Return Item"</li>
                <li>3. Select the items you want to return</li>
                <li>4. Choose your reason for return</li>
                <li>5. Print the prepaid return label</li>
                <li>6. Pack the items securely</li>
                <li>7. Drop off at any shipping location</li>
              </ol>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Refund Processing</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Once we receive your return, we'll process your refund within 3-5 business days. 
                The refund will be issued to your original payment method. Please note that it may 
                take additional time for the credit to appear on your statement.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Exchanges</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you need a different size or color, you can exchange your item for free. 
                Simply follow the return process and indicate that you want an exchange instead of a refund.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Items That Cannot Be Returned</h3>
              <ul className="text-gray-700 mb-6 space-y-2">
                <li>• Personalized or customized items</li>
                <li>• Digital downloads</li>
                <li>• Perishable goods</li>
                <li>• Items damaged by misuse</li>
              </ul>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-blue-700 mb-4">
                  If you have any questions about returns or need assistance with your return, 
                  please contact our customer service team.
                </p>
                <div className="space-y-2">
                  <p className="text-blue-700">Email: returns@shophub.com</p>
                  <p className="text-blue-700">Phone: 1-800-SHOPHUB</p>
                  <p className="text-blue-700">Hours: Monday-Friday 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
