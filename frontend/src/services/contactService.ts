import { apiService } from './api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: 'general' | 'support' | 'order' | 'return' | 'feedback' | 'other';
  message: string;
  phone?: string;
  orderNumber?: string;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  orderNumber?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  response?: {
    message: string;
    respondedBy: string;
    respondedAt: string;
  };
}

export interface ContactStats {
  totalContacts: number;
  pendingContacts: number;
  resolvedContacts: number;
  recentContacts: number;
  contactsBySubject: Array<{ _id: string; count: number }>;
  contactsByPriority: Array<{ _id: string; count: number }>;
  avgResponseTimeHours: number;
}

class ContactService {
  // Submit contact form
  async submitContactForm(formData: ContactFormData) {
    return apiService.post('/contact', formData);
  }

  // Get all contact submissions (admin only)
  async getContacts(page = 1, limit = 10, filters?: {
    status?: string;
    priority?: string;
    subject?: string;
  }) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return apiService.get(`/contact?${params.toString()}`);
  }

  // Get contact statistics (admin only)
  async getContactStats() {
    return apiService.get('/contact/stats');
  }

  // Get single contact submission (admin only)
  async getContact(id: string) {
    return apiService.get(`/contact/${id}`);
  }

  // Update contact status (admin only)
  async updateContactStatus(id: string, status: string) {
    return apiService.put(`/contact/${id}/status`, { status });
  }

  // Respond to contact submission (admin only)
  async respondToContact(id: string, message: string) {
    return apiService.put(`/contact/${id}/respond`, { message });
  }

  // Delete contact submission (admin only)
  async deleteContact(id: string) {
    return apiService.delete(`/contact/${id}`);
  }
}

export const contactService = new ContactService();
export default contactService;
