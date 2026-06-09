import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes/routes";
import { seedDefaultAdmin } from "../create-admin";

dotenv.config();

const app = express();

// Logger untuk nge-track request masuk
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

const allowedOrigins = (process.env.ALLOW_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// configuration of CORS untuk mengizinkan origin tertentu dan mendukung credentials (cookies)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isLocalhost = origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("192.168");
      if (allowedOrigins.includes(origin) || isLocalhost) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS. Origin:", origin, "Allowed:", allowedOrigins);
        callback(null, false); // Block it gracefully instead of crashing
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

// serve static files
app.use("/public", express.static(path.join(process.cwd(), "public")));

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

async function bootstrap() {
  try {
    await seedDefaultAdmin();
    app.listen(process.env.PORT!, () => {
      console.log(`Server is running on port ${process.env.PORT!}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan seeder admin:", error);
    process.exit(1);
  }
}

bootstrap();
