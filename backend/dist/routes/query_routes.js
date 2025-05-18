"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const query_controller_1 = require("../controllers/query_controller");
const router = express_1.default.Router();
// Send Query - Protected Route
router.post("/", auth_1.default, query_controller_1.sendQuery);
exports.default = router;
