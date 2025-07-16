import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to ShopHub</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your one-stop destination for all your shopping needs.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
