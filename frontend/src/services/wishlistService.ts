import { apiService } from './api';

export interface WishlistResponse {
  success: boolean;
  wishlist: {
    _id: string;
    items: Array<{
      _id: string;
      product: {
        _id: string;
        name: string;
        price: number;
        images: Array<{ url: string; public_id: string }>;
        rating: number;
        numReviews: number;
        countInStock: number;
        category: string;
        brand: string;
        description?: string;
      };
      addedAt: string;
    }>;
    itemCount: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ToggleWishlistResponse {
  success: boolean;
  message: string;
  action: 'added' | 'removed';
  wishlist: {
    _id: string;
    items: any[];
    itemCount: number;
  };
}

class WishlistService {
  // Get user's wishlist
  async getWishlist() {
    return apiService.get('/wishlist');
  }

  // Add product to wishlist
  async addToWishlist(productId: string) {
    return apiService.post('/wishlist/add', { productId });
  }

  // Remove product from wishlist
  async removeFromWishlist(productId: string) {
    return apiService.delete(`/wishlist/remove/${productId}`);
  }

  // Toggle product in wishlist
  async toggleWishlistItem(productId: string) {
    return apiService.post('/wishlist/toggle', { productId });
  }

  // Clear entire wishlist
  async clearWishlist() {
    return apiService.delete('/wishlist/clear');
  }

  // Check if product is in wishlist
  async checkWishlistItem(productId: string) {
    return apiService.get(`/wishlist/check/${productId}`);
  }
}

export const wishlistService = new WishlistService();
export default wishlistService;
