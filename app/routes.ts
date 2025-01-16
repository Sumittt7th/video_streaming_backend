import express from "express";
import userRoutes from "./user/user.route";
import videoRoutes from "./video/video.route";
import analyticsRoutes from "./analytics/analytics.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/video", videoRoutes);
router.use("/analytics", analyticsRoutes);

export default router;