import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleWishlistItem, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface WishlistButtonProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showToast?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  productId, 
  size = 'md', 
  className = '',
  showToast = true 
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isInWishlist = useAppSelector(selectIsInWishlist(productId));
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await dispatch(toggleWishlistItem(productId)).unwrap();
      
      if (showToast) {
        if (result.action === 'added') {
          toast.success('Added to wishlist! ❤️');
        } else {
          toast.success('Removed from wishlist');
        }
      }
    } catch (error: any) {
      if (showToast) {
        toast.error(error || 'Failed to update wishlist');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const IconComponent = isInWishlist ? HeartIconSolid : HeartIcon;

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`
        transition-all duration-200 flex items-center justify-center
        ${isInWishlist 
          ? 'text-red-600 hover:text-red-700' 
          : 'text-gray-400 hover:text-red-600'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
        ${className}
      `}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isLoading ? (
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-red-600 ${sizeClasses[size]}`} />
      ) : (
        <IconComponent className={sizeClasses[size]} />
      )}
    </button>
  );
};

export default WishlistButton;
