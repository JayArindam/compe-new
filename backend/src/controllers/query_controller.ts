// import { Request, Response } from "express";
import Query from "../models/query_model";

// Send Query - Only Registered Users
export const sendQuery = async (req: any, res: any) => {
  const { name, contactNumber, email, subject, message } = req.body;

  if (!name || !contactNumber || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newQuery = new Query({
      user: req.user, // Populated by authMiddleware
      name,
      contactNumber,
      email,
      subject,
      message,
    });

    await newQuery.save();
    res.status(201).json({ message: "Query sent successfully" });
  } catch (error) {
    console.error("Error in sendQuery:", error);
    res.status(500).json({ message: "Server error" });
  }
};
