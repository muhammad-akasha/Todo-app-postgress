import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./src/db/index.js";
import todoRoutes from "./src/routes/todo.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("POSTGRESQL connection failed !!! ", err);
  });
