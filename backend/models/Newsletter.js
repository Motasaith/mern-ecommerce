const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscriptionSource: {
    type: String,
    enum: ['homepage', 'footer', 'checkout', 'profile', 'admin'],
    default: 'homepage'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  unsubscribeToken: {
    type: String
  },
  preferences: {
    productUpdates: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    newArrivals: {
      type: Boolean,
      default: true
    }
  },
  emailsSent: {
    type: Number,
    default: 0
  },
  lastEmailSent: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient queries
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ isActive: 1 });
newsletterSchema.index({ subscribedAt: -1 });

// Method to generate unsubscribe token
newsletterSchema.methods.generateUnsubscribeToken = function() {
  const crypto = require('crypto');
  this.unsubscribeToken = crypto.randomBytes(32).toString('hex');
  return this.unsubscribeToken;
};

// Static method to find active subscribers
newsletterSchema.statics.findActiveSubscribers = function() {
  return this.find({ isActive: true });
};

module.exports = mongoose.model('Newsletter', newsletterSchema);
