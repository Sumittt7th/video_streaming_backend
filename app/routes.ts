import express from "express";
import userRoutes from "../api/user/user.route";
import videoRoutes from "../api/video/video.route";
import analyticsRoutes from "../api/analytics/analytics.route";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger/swagger.json");

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/video", videoRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;