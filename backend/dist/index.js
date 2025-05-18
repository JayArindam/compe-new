"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const query_routes_1 = __importDefault(require("./routes/query_routes"));
const order_routes_1 = __importDefault(require("./routes/order_routes"));
console.log(`
⠐⣪⡑⣤⣶⣶⣶⣦⡔⣩⡒⠀ Starting the server
⢸⣯⣾⣿⢏⣿⣏⢿⣿⣮⣿⠀
⢸⣿⢸⡗⣶⠙⢱⡖⣿⢸⣿⠀
⢸⡿⠀⠳⣄⣐⣂⡴⠃⠸⣿⠀
⣾⠃⠀⡵⡔⠕⠕⡰⡅⠀⢻⡆
⢹⡆⠘⢴⠙⠑⠉⢳⡱⠀⣾⠁
⠊⠀⠀⠈⡖⡖⡖⡎⠀⠀⠈⠂
⠀⠀⠀⠀⠉⠁⠉⠁⠀⠀⠀⠀
`);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.default)();
app.use("/api/users", user_routes_1.default);
app.use("/api/queries", query_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
