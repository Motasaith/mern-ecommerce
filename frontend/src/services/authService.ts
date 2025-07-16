import { apiService } from './api';
import { User } from '../types';

class AuthService {
  // Login user
  async login(credentials: { email: string; password: string }) {
    return apiService.post('/auth/login', credentials);
  }

  // Register user
  async register(userData: { name: string; email: string; password: string }) {
    return apiService.post('/auth/register', userData);
  }

  // Get current user
  async getCurrentUser() {
    return apiService.get('/auth/me');
  }

  // Update user profile
  async updateProfile(userData: { name: string; email: string; phone?: string }) {
    return apiService.put('/users/profile', userData);
  }

  // Logout user
  async logout() {
    return apiService.post('/auth/logout');
  }

  // Forgot password
  async forgotPassword(email: string) {
    return apiService.post('/auth/forgot-password', { email });
  }

  // Reset password
  async resetPassword(token: string, password: string) {
    return apiService.post(`/auth/reset-password/${token}`, { password });
  }

  // Change password
  async changePassword(oldPassword: string, newPassword: string) {
    return apiService.put('/auth/change-password', { oldPassword, newPassword });
  }

  // Verify email
  async verifyEmail(token: string) {
    return apiService.post(`/auth/verify-email/${token}`);
  }

  // Resend verification email
  async resendVerificationEmail() {
    return apiService.post('/auth/resend-verification');
  }
}

export const authService = new AuthService();
export default authService;
