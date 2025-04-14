import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCategoryFlashcards } from "../controllers/flashcard.controller.js";

const router = express.Router();

router.get("/:category", protectRoute, getCategoryFlashcards);

export default router;
