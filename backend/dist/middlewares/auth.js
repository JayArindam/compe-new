"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
}
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization") || req.header("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({ message: "Token payload invalid" });
        }
        req.user = decoded.userId;
        next();
    }
    catch (err) {
        console.error("Error in authMiddleware:", err);
        return res.status(401).json({ message: "Token is not valid" });
    }
};
exports.default = authMiddleware;
