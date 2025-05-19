"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const order_controller_1 = require("../controllers/order_controller");
const order_controller_2 = require("../controllers/order_controller");
const router = express_1.default.Router();
// Place an Order - Protected Route
router.post("/", auth_1.default, order_controller_1.placeOrder);
router.get('/:userId', auth_1.default, order_controller_2.getPreviousOrders);
exports.default = router;
