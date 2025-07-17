import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProduct } from '../store/slices/productSlice';
import { StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', { productId: id, quantity });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const videos = product.videos || [];
  const allMedia = [...images, ...videos];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                {allMedia.length > 0 ? (
                  <img
                    src={allMedia[selectedImage]?.url || 'https://via.placeholder.com/600x600?text=No+Image'}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/600x600?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {allMedia.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {allMedia.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={media.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/64x64?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.category}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? (
                      <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                    )
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.numReviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.comparePrice && (
                  <span className="text-xl text-gray-500 line-through">${product.comparePrice}</span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Stock */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Stock:</span>
                <span className={`text-sm font-medium ${
                  product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.countInStock > 0 ? `${product.countInStock} available` : 'Out of stock'}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <HeartIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                {product.brand && (
                  <div>
                    <span className="text-sm text-gray-600">Brand:</span>
                    <span className="ml-2 text-sm font-medium">{product.brand}</span>
                  </div>
                )}
                {product.sku && (
                  <div>
                    <span className="text-sm text-gray-600">SKU:</span>
                    <span className="ml-2 text-sm font-medium">{product.sku}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-sm text-gray-600">Weight:</span>
                    <span className="ml-2 text-sm font-medium">{product.weight} kg</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
