import express, { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import usersRouter from "../modules/users/users.routes";
import vocabulariesRouter from "../modules/vocabularies/vocabularies.routes";
import materialsRouter from "../modules/materials/materials.routes";
import quizzesRouter from "../modules/quizzes/quizzes.routes";
import scoresRouter from "../modules/scores/scores.routes";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/vocabularies", vocabulariesRouter);
router.use("/materials", materialsRouter);
router.use("/quizzes", quizzesRouter);
router.use("/scores", scoresRouter);

export default router;