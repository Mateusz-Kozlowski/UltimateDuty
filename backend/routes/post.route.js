import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getPublicPosts, getPersonalizedExploreFeed, getNetworkPosts, deletePost, createPost, getPostById, createComment, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/explore/public", getPublicPosts);
router.get("/explore/personalized", protectRoute, getPersonalizedExploreFeed);
router.get("/network", protectRoute, getNetworkPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);

export default router;
