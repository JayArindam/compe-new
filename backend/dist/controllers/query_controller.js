"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendQuery = void 0;
// import { Request, Response } from "express";
const query_model_1 = __importDefault(require("../models/query_model"));
// Send Query - Only Registered Users
const sendQuery = async (req, res) => {
    const { name, contactNumber, email, subject, message } = req.body;
    if (!name || !contactNumber || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newQuery = new query_model_1.default({
            user: req.user, // Populated by authMiddleware
            name,
            contactNumber,
            email,
            subject,
            message,
        });
        await newQuery.save();
        res.status(201).json({ message: "Query sent successfully" });
    }
    catch (error) {
        console.error("Error in sendQuery:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.sendQuery = sendQuery;
