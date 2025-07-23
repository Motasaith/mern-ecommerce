// E2E Test Setup
const puppeteer = require('puppeteer');
const path = require('path');

let browser;
let page;

// Setup before all tests
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'production',
    slowMo: process.env.NODE_ENV !== 'production' ? 50 : 0,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1280, height: 720 });
  
  // Set user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
});

// Setup before each test
beforeEach(async () => {
  // Clear cookies and local storage
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  
  // Clear cookies
  const cookies = await page.cookies();
  await page.deleteCookie(...cookies);
});

// Cleanup after all tests
afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

// Helper functions for tests
global.testHelpers = {
  // Navigate to a page and wait for it to load
  async navigateToPage(url) {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('body');
  },

  // Fill form field
  async fillField(selector, value) {
    await page.waitForSelector(selector);
    await page.focus(selector);
    await page.keyboard.selectAll();
    await page.keyboard.type(value);
  },

  // Click element and wait for navigation
  async clickAndWait(selector, waitForSelector = null) {
    await page.waitForSelector(selector);
    await page.click(selector);
    
    if (waitForSelector) {
      await page.waitForSelector(waitForSelector);
    } else {
      await page.waitForTimeout(1000);
    }
  },

  // Wait for element to be visible
  async waitForElement(selector, timeout = 5000) {
    await page.waitForSelector(selector, { visible: true, timeout });
  },

  // Get text content of element
  async getTextContent(selector) {
    await page.waitForSelector(selector);
    return await page.$eval(selector, el => el.textContent.trim());
  },

  // Check if element exists
  async elementExists(selector) {
    try {
      await page.waitForSelector(selector, { timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  },

  // Take screenshot for debugging
  async takeScreenshot(name) {
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', `${name}-${Date.now()}.png`),
      fullPage: true 
    });
  },

  // Login helper
  async login(email = 'test@example.com', password = 'password123') {
    await this.navigateToPage('http://localhost:3000/login');
    await this.fillField('input[name="email"]', email);
    await this.fillField('input[name="password"]', password);
    await this.clickAndWait('button[type="submit"]', '.header');
  },

  // Register helper
  async register(userData = {}) {
    const defaultData = {
      firstName: 'John',
      lastName: 'Doe',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      phone: '+1234567890',
    };
    
    const data = { ...defaultData, ...userData };
    
    await this.navigateToPage('http://localhost:3000/register');
    await this.fillField('input[name="firstName"]', data.firstName);
    await this.fillField('input[name="lastName"]', data.lastName);
    await this.fillField('input[name="email"]', data.email);
    await this.fillField('input[name="password"]', data.password);
    await this.fillField('input[name="phone"]', data.phone);
    await this.clickAndWait('button[type="submit"]', '.header');
    
    return data;
  },

  // Add product to cart helper
  async addProductToCart(productId = null) {
    if (productId) {
      await this.navigateToPage(`http://localhost:3000/products/${productId}`);
    } else {
      await this.navigateToPage('http://localhost:3000/products');
      await this.clickAndWait('.product-card:first-child .view-details', '.product-detail');
    }
    
    await this.clickAndWait('.add-to-cart-btn', '.cart-notification');
  },

  // Get current page
  getPage() {
    return page;
  },

  // Get browser instance
  getBrowser() {
    return browser;
  }
};

module.exports = { browser, page };
