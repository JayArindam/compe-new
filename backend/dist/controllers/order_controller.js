"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const order_model_1 = __importDefault(require("../models/order_model"));
// @desc    Place a new order with multiple items
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res) => {
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
        const newOrder = new order_model_1.default({
            user: req.user, // Set by authMiddleware
            items,
            totalPrice,
            userName,
            email,
            address,
        });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
    }
    catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.placeOrder = placeOrder;
