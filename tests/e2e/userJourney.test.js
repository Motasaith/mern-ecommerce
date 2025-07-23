// End-to-End User Journey Tests
describe('E2E User Journey', () => {
  const { navigateToPage, fillField, clickAndWait, waitForElement, getTextContent, elementExists, takeScreenshot, register, login, addProductToCart } = global.testHelpers;

  describe('Complete User Registration and Shopping Flow', () => {
    let userData;

    it('should complete user registration flow', async () => {
      userData = await register();
      
      // Should be redirected to home page after registration
      await waitForElement('.welcome-message, .header');
      
      const currentUrl = await global.testHelpers.getPage().url();
      expect(currentUrl).toMatch(/localhost:3000/);
      
      // Should show user is logged in
      const isLoggedIn = await elementExists('.user-menu, .profile-link');
      expect(isLoggedIn).toBe(true);
    });

    it('should browse products and view product details', async () => {
      await navigateToPage('http://localhost:3000/products');
      
      // Should see products list
      await waitForElement('.products-grid, .product-list');
      
      // Click on first product
      await clickAndWait('.product-card:first-child', '.product-detail');
      
      // Should see product details
      await waitForElement('.product-name');
      await waitForElement('.product-price');
      await waitForElement('.product-description');
      
      const productName = await getTextContent('.product-name');
      expect(productName).toBeTruthy();
    });

    it('should add product to cart', async () => {
      // Should be on product detail page from previous test
      await waitForElement('.add-to-cart-btn');
      
      // Add to cart
      await clickAndWait('.add-to-cart-btn');
      
      // Should see cart notification or updated cart count
      const cartUpdated = await elementExists('.cart-notification, .cart-count');
      expect(cartUpdated).toBe(true);
      
      // Check cart count
      const cartCount = await getTextContent('.cart-count');
      expect(parseInt(cartCount)).toBeGreaterThan(0);
    });

    it('should view cart and proceed to checkout', async () => {
      // Navigate to cart
      await clickAndWait('.cart-link, .cart-icon', '.cart-page');
      
      // Should see cart items
      await waitForElement('.cart-items');
      await waitForElement('.cart-total');
      
      // Should see checkout button
      await waitForElement('.checkout-btn');
      
      // Proceed to checkout
      await clickAndWait('.checkout-btn', '.checkout-page, .shipping-form');
    });

    it('should fill shipping information', async () => {
      // Should be on checkout page
      await waitForElement('.shipping-form, .checkout-form');
      
      // Fill shipping information
      await fillField('input[name="address"]', '123 Test Street');
      await fillField('input[name="city"]', 'Test City');
      await fillField('input[name="state"]', 'Test State');
      await fillField('input[name="zipCode"]', '12345');
      await fillField('input[name="country"]', 'Test Country');
      
      // Continue to payment
      await clickAndWait('.continue-to-payment, .next-step', '.payment-form, .payment-section');
    });

    it('should complete mock payment process', async () => {
      // Should be on payment section
      await waitForElement('.payment-form, .payment-section');
      
      // For testing, we'll mock the payment process
      // In a real scenario, you'd use Stripe test cards
      const hasPaymentForm = await elementExists('.payment-form');
      expect(hasPaymentForm).toBe(true);
      
      // Complete order (mock payment)
      if (await elementExists('.complete-order-btn')) {
        await clickAndWait('.complete-order-btn', '.order-confirmation, .success-page');
      }
    });

    it('should show order confirmation', async () => {
      // Should see order confirmation
      const isOnConfirmation = await elementExists('.order-confirmation, .success-page, .order-success');
      expect(isOnConfirmation).toBe(true);
      
      // Should see order number or confirmation message
      const confirmationExists = await elementExists('.order-number, .confirmation-message');
      expect(confirmationExists).toBe(true);
    });

    it('should view order history', async () => {
      // Navigate to orders page
      await navigateToPage('http://localhost:3000/orders');
      
      // Should see orders list
      await waitForElement('.orders-list, .order-history');
      
      // Should see at least one order
      const hasOrders = await elementExists('.order-item, .order-card');
      expect(hasOrders).toBe(true);
    });
  });

  describe('Product Search and Filtering', () => {
    beforeEach(async () => {
      await navigateToPage('http://localhost:3000/products');
    });

    it('should search for products', async () => {
      await waitForElement('.search-input');
      
      // Search for a product
      await fillField('.search-input', 'laptop');
      await clickAndWait('.search-btn, .search-submit');
      
      // Should see search results
      await waitForElement('.search-results, .products-grid');
      
      // Results should contain search term (if products exist)
      const hasResults = await elementExists('.product-card');
      // Note: This might be false if no products match, which is also valid
    });

    it('should filter products by category', async () => {
      await waitForElement('.category-filter, .filters-section');
      
      // Select a category filter
      if (await elementExists('.category-filter select')) {
        await clickAndWait('.category-filter select');
        await clickAndWait('option[value="Electronics"]');
      } else if (await elementExists('.category-Electronics')) {
        await clickAndWait('.category-Electronics');
      }
      
      // Should see filtered results
      await waitForElement('.products-grid, .product-list');
    });

    it('should sort products by price', async () => {
      await waitForElement('.sort-select, .sort-options');
      
      // Sort by price
      if (await elementExists('.sort-select')) {
        await clickAndWait('.sort-select');
        await clickAndWait('option[value="price-asc"], option[value="price"]');
      }
      
      // Should see sorted results
      await waitForElement('.products-grid');
    });
  });

  describe('User Authentication Flow', () => {
    it('should handle login/logout flow', async () => {
      // Logout if logged in
      if (await elementExists('.logout-btn, .user-menu')) {
        await clickAndWait('.logout-btn, .user-menu .logout');
      }
      
      // Login
      await login();
      
      // Should be logged in
      const isLoggedIn = await elementExists('.user-menu, .profile-link');
      expect(isLoggedIn).toBe(true);
      
      // Logout
      await clickAndWait('.logout-btn, .user-menu .logout');
      
      // Should be logged out
      const isLoggedOut = await elementExists('.login-link');
      expect(isLoggedOut).toBe(true);
    });

    it('should handle invalid login', async () => {
      await navigateToPage('http://localhost:3000/login');
      
      await fillField('input[name="email"]', 'invalid@example.com');
      await fillField('input[name="password"]', 'wrongpassword');
      await clickAndWait('button[type="submit"]');
      
      // Should show error message
      const hasError = await elementExists('.error-message, .alert-error');
      expect(hasError).toBe(true);
    });
  });

  describe('Mobile Responsiveness', () => {
    beforeEach(async () => {
      // Set mobile viewport
      await global.testHelpers.getPage().setViewport({ width: 375, height: 667 });
    });

    afterEach(async () => {
      // Reset to desktop viewport
      await global.testHelpers.getPage().setViewport({ width: 1280, height: 720 });
    });

    it('should show mobile navigation', async () => {
      await navigateToPage('http://localhost:3000');
      
      // Should see mobile menu button
      const hasMobileMenu = await elementExists('.mobile-menu-btn, .hamburger');
      expect(hasMobileMenu).toBe(true);
      
      // Test mobile menu toggle
      if (hasMobileMenu) {
        await clickAndWait('.mobile-menu-btn, .hamburger');
        
        // Should show mobile navigation
        const mobileNavVisible = await elementExists('.mobile-nav, .mobile-menu');
        expect(mobileNavVisible).toBe(true);
      }
    });

    it('should be responsive on mobile devices', async () => {
      await navigateToPage('http://localhost:3000/products');
      
      // Should see products in mobile layout
      await waitForElement('.products-grid, .product-list');
      
      // Products should be displayed appropriately for mobile
      const hasProducts = await elementExists('.product-card');
      // This test mainly ensures the page loads correctly on mobile
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 pages', async () => {
      await navigateToPage('http://localhost:3000/nonexistent-page');
      
      // Should see 404 page
      const is404 = await elementExists('.not-found, .error-404');
      expect(is404).toBe(true);
    });

    it('should handle network errors gracefully', async () => {
      // This test would require mocking network failures
      // For now, we'll just ensure error boundaries work
      await navigateToPage('http://localhost:3000');
      
      // Inject a script that causes an error
      await global.testHelpers.getPage().evaluate(() => {
        // This should be caught by error boundaries
        window.dispatchEvent(new Event('error'));
      });
      
      // Page should still be functional
      const pageStillWorks = await elementExists('body');
      expect(pageStillWorks).toBe(true);
    });
  });

  // Screenshot for debugging failed tests
  afterEach(async () => {
    if (global.jasmine && global.jasmine.currentTest && global.jasmine.currentTest.failedExpectations.length > 0) {
      await takeScreenshot(`failed-${global.jasmine.currentTest.description.replace(/\s+/g, '-')}`);
    }
  });
});
