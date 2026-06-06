import express, { Router } from "express";
import authRouter from "../modules/auth/auth.routes";

const router: Router = express.Router();

router.use("/auth", authRouter);

export default router;