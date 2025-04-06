import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import "./src/container";
import userRoutes from "./src/users/user.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
