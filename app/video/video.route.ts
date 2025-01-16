import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as videoController from "./video.controller";
import * as videoValidator from "./video.validation";
import { uploadVideo } from '../common/services/file.upload.service';
import { roleAuth } from '../common/middleware/role-auth.middleware';

const router = Router();

router
  .get("/", videoController.getAllVideos)
  .get("/:id", videoController.getVideoById)
  .delete("/:id",roleAuth("ADMIN"), videoController.deleteVideo)
  .post("/", uploadVideo,videoValidator.createVideo,roleAuth("ADMIN"), catchError, videoController.uploadVideos)
  .put("/:id", videoValidator.updateVideo, catchError,roleAuth("ADMIN"), videoController.updateVideo)
  .post("/:id/view", catchError, videoController.incrementViewCount)
  .get("play/:id/:userId",videoController.getVideoPlayback);

export default router;
