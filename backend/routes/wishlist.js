const express = require('express');
const { check, validationResult } = require('express-validator');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    GET api/wishlist
// @desc     Get user's wishlist
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name price images rating numReviews countInStock category brand description'
      });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
      await wishlist.save();
    }

    res.json({
      success: true,
      wishlist: {
        _id: wishlist._id,
        items: wishlist.items,
        itemCount: wishlist.itemCount,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (err) {
    console.error('Get wishlist error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    POST api/wishlist/add
// @desc     Add product to wishlist
// @access   Private
router.post('/add', [
  auth,
  [
    check('productId', 'Product ID is required').isMongoId()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId } = req.body;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Get or create user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    // Check if product is already in wishlist
    if (wishlist.hasProduct(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product is already in your wishlist'
      });
    }

    // Add product to wishlist
    await wishlist.addItem(productId);

    // Return updated wishlist with populated product data
    const updatedWishlist = await Wishlist.findById(wishlist._id)
      .populate({
        path: 'items.product',
        select: 'name price images rating numReviews countInStock category brand'
      });

    res.json({
      success: true,
      message: 'Product added to wishlist successfully',
      wishlist: {
        _id: updatedWishlist._id,
        items: updatedWishlist.items,
        itemCount: updatedWishlist.itemCount
      }
    });
  } catch (err) {
    console.error('Add to wishlist error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    DELETE api/wishlist/remove/:productId
// @desc     Remove product from wishlist
// @access   Private
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate productId
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    // Get user's wishlist
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    // Check if product is in wishlist
    if (!wishlist.hasProduct(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product is not in your wishlist'
      });
    }

    // Remove product from wishlist
    await wishlist.removeItem(productId);

    // Return updated wishlist with populated product data
    const updatedWishlist = await Wishlist.findById(wishlist._id)
      .populate({
        path: 'items.product',
        select: 'name price images rating numReviews countInStock category brand'
      });

    res.json({
      success: true,
      message: 'Product removed from wishlist successfully',
      wishlist: {
        _id: updatedWishlist._id,
        items: updatedWishlist.items,
        itemCount: updatedWishlist.itemCount
      }
    });
  } catch (err) {
    console.error('Remove from wishlist error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    POST api/wishlist/toggle
// @desc     Toggle product in wishlist (add if not exists, remove if exists)
// @access   Private
router.post('/toggle', [
  auth,
  [
    check('productId', 'Product ID is required').isMongoId()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId } = req.body;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get or create user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    let message = '';
    let action = '';

    // Check if product is in wishlist and toggle
    if (wishlist.hasProduct(productId)) {
      await wishlist.removeItem(productId);
      message = 'Product removed from wishlist';
      action = 'removed';
    } else {
      await wishlist.addItem(productId);
      message = 'Product added to wishlist';
      action = 'added';
    }

    // Return updated wishlist with populated product data
    const updatedWishlist = await Wishlist.findById(wishlist._id)
      .populate({
        path: 'items.product',
        select: 'name price images rating numReviews countInStock category brand'
      });

    res.json({
      success: true,
      message,
      action,
      wishlist: {
        _id: updatedWishlist._id,
        items: updatedWishlist.items,
        itemCount: updatedWishlist.itemCount
      }
    });
  } catch (err) {
    console.error('Toggle wishlist error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    DELETE api/wishlist/clear
// @desc     Clear user's wishlist
// @access   Private
router.delete('/clear', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    await wishlist.clearWishlist();

    res.json({
      success: true,
      message: 'Wishlist cleared successfully',
      wishlist: {
        _id: wishlist._id,
        items: [],
        itemCount: 0
      }
    });
  } catch (err) {
    console.error('Clear wishlist error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    GET api/wishlist/check/:productId
// @desc     Check if product is in user's wishlist
// @access   Private
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate productId
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    const isInWishlist = wishlist ? wishlist.hasProduct(productId) : false;

    res.json({
      success: true,
      isInWishlist,
      productId
    });
  } catch (err) {
    console.error('Check wishlist error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    GET api/wishlist/debug-product/:productId
// @desc     Debug product structure (temporary)
// @access   Private
router.get('/debug-product/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json({
      success: true,
      product: product
    });
  } catch (err) {
    console.error('Debug product error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
