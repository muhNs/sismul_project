import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5174", "http://localhost:5173", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177"];

// configuration of CORS untuk mengizinkan origin tertentu dan mendukung credentials (cookies)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "authorization"],
  }),
);

// middleware untuk parsing JSON, URL-encoded data, dan cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// endpoint API versioning
app.use("/api/v1", router);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Terjadi kesalahan pada server internal",
  });
});


app.listen(process.env.PORT!, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});

