import { Request, Response } from "express";
import Order from "../models/order_model";

// @desc    Place a new order with multiple items
// @route   POST /api/orders
// @access  Private
export const placeOrder = async (req: any, res: any) => {
  const { items, userName, email, address } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items array is required" });
  }

  if (!userName || !email || !address) {
    return res.status(400).json({ message: "User details and address are required" });
  }

  let totalPrice = 0;

  for (const item of items) {
    if (!item.itemName || !item.quantity || !item.price) {
      return res.status(400).json({ message: "Each item must have itemName, quantity, and price" });
    }

    if (item.quantity <= 0 || item.price <= 0) {
      return res.status(400).json({ message: "Quantity and price must be positive numbers" });
    }

    totalPrice += item.quantity * item.price;
  }

  try {
    const newOrder = new Order({
      user: req.user, // Set by authMiddleware
      items,
      totalPrice,
      userName,
      email,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPreviousOrders = async (req: any, res: any) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No previous orders found' });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};