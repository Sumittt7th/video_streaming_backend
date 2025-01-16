
import { Router } from "express";
import * as analyticsController from "./analytics.controller";
import * as analyticsValidator from "./analytics.validation";
import { catchError } from "../common/middleware/cath-error.middleware";
import { roleAuth } from '../common/middleware/role-auth.middleware';

const router = Router();

// Route to increment video view count (user-specific)
router
    .post("/:videoId/view", roleAuth("USER"), analyticsValidator.validateVideoId, catchError, analyticsController.incrementViewCount)

// Route to get analytics for a specific video
router
    .get("/:videoId", analyticsValidator.validateVideoId, catchError, analyticsController.getAnalyticsByVideoId);

export default router;
