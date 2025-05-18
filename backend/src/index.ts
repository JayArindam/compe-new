import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from 'cors';
import userRoutes from './routes/user_routes';
import queryRoutes from './routes/query_routes';
import orderRoutes from './routes/order_routes';

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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});