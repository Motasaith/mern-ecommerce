const express = require('express');
const { check, validationResult } = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');
const emailService = require('../services/emailService');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// @route    POST api/orders
// @desc     Create new order
// @access   Private
router.post('/', [
  auth,
  [
    check('orderItems', 'Order items are required').not().isEmpty(),
    check('shippingAddress', 'Shipping address is required').not().isEmpty(),
    check('paymentMethod', 'Payment method is required').not().isEmpty(),
    check('totalPrice', 'Total price is required').isNumeric()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ msg: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();
    
    // Populate the order with user and product details for email
    const populatedOrder = await Order.findById(createdOrder._id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');
    
    // Send order confirmation email
    try {
      if (populatedOrder.user && populatedOrder.user.email) {
        // Transform order items for email template
        const orderWithItems = {
          ...populatedOrder.toObject(),
          items: populatedOrder.orderItems.map(item => ({
            product: { name: item.product?.name || item.name },
            quantity: item.qty || item.quantity,
            price: item.price
          })),
          totalAmount: populatedOrder.totalPrice
        };
        
        const emailResult = await emailService.sendOrderConfirmation(
          populatedOrder.user,
          orderWithItems
        );
        console.log('Order confirmation email sent:', emailResult.success);
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }
    
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/orders
// @desc     Get logged in user orders
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/orders/stats
// @desc     Get order statistics for analytics
// @access   Private/Admin
router.get('/stats', [auth, admin], async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get total statistics
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Get recent statistics (last 30 days)
    const recentOrders = await Order.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const recentRevenue = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Get previous period for comparison (30-60 days ago)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const previousOrders = await Order.countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    const previousRevenue = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Calculate growth percentages
    const orderGrowth = previousOrders > 0 
      ? ((recentOrders - previousOrders) / previousOrders * 100)
      : recentOrders > 0 ? 100 : 0;
    
    const revenueGrowth = previousRevenue.length > 0 && previousRevenue[0].total > 0
      ? ((recentRevenue[0]?.total || 0) - previousRevenue[0].total) / previousRevenue[0].total * 100
      : (recentRevenue[0]?.total || 0) > 0 ? 100 : 0;

    // Get average order value
    const avgOrderValue = totalOrders > 0 ? (totalRevenue[0]?.total || 0) / totalOrders : 0;

    // Get daily sales data for the last 7 days
    const dailySales = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Get top products from recent orders
    const topProducts = await Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          name: { $first: '$orderItems.name' },
          totalQuantity: { $sum: '$orderItems.qty' },
          totalRevenue: { $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);

    // Get recent activity (last 10 orders)
    const recentActivity = await Order.find({})
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(10)
      .select('_id totalPrice createdAt user isPaid isShipped isDelivered');

    // Get user count
    const User = require('../models/User');
    const totalUsers = await User.countDocuments();
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const previousUsers = await User.countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    const userGrowth = previousUsers > 0 
      ? ((recentUsers - previousUsers) / previousUsers * 100)
      : recentUsers > 0 ? 100 : 0;

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalUsers,
      avgOrderValue,
      revenueGrowth: Math.round(revenueGrowth * 100) / 100,
      orderGrowth: Math.round(orderGrowth * 100) / 100,
      userGrowth: Math.round(userGrowth * 100) / 100,
      dailySales: dailySales.map(day => ({
        date: `${day._id.year}-${String(day._id.month).padStart(2, '0')}-${String(day._id.day).padStart(2, '0')}`,
        revenue: day.revenue,
        orders: day.orders
      })),
      topProducts: topProducts.map(product => ({
        id: product._id,
        name: product.name,
        quantity: product.totalQuantity,
        revenue: product.totalRevenue
      })),
      recentActivity: recentActivity.map(order => ({
        id: order._id,
        type: 'order',
        description: `Order #${order._id.toString().slice(-6)} by ${order.user?.name || 'Unknown'}`,
        amount: order.totalPrice,
        status: order.isDelivered ? 'delivered' : order.isShipped ? 'shipped' : order.isPaid ? 'paid' : 'pending',
        createdAt: order.createdAt
      }))
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/orders/:id
// @desc     Get order by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/orders/:id/pay
// @desc     Update order to paid
// @access   Private
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/orders/:id/ship
// @desc     Update order to shipped
// @access   Private/Admin
router.put('/:id/ship', [auth, admin], async (req, res) => {
  try {
    const { trackingNumber, carrier, trackingUrl } = req.body;
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.isShipped = true;
    order.shippedAt = Date.now();
    
    if (trackingNumber) {
      order.trackingInfo = {
        trackingNumber,
        carrier: carrier || 'Unknown',
        trackingUrl: trackingUrl || null
      };
    }

    const updatedOrder = await order.save();
    
    // Send shipping notification email
    try {
      if (order.user && order.user.email) {
        const emailResult = await emailService.sendOrderShipped(
          order.user,
          order,
          order.trackingInfo
        );
        console.log('Order shipped email sent:', emailResult.success);
      }
    } catch (emailError) {
      console.error('Failed to send order shipped email:', emailError);
    }
    
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/orders/:id/deliver
// @desc     Update order to delivered
// @access   Private/Admin
router.put('/:id/deliver', [auth, admin], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/orders/admin/all
// @desc     Get all orders
// @access   Private/Admin
router.get('/admin/all', [auth, admin], async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
