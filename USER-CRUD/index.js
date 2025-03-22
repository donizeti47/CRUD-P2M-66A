import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
 console.log("Database connected");
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
