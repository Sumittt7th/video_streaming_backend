import * as videoService from "./video.service";
import { createResponse } from "../../app/common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uploadVideo } from '../../app/common/services/file.upload.service';
import * as userService from "../user/user.service";

export const uploadVideos = asyncHandler(async (req: Request, res: Response) => {
    uploadVideo(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const result = await videoService.uploadVideo(req.body, req.file);
        res.send(createResponse(result, "Video uploaded successfully"));
    });
});

export const getAllVideos = asyncHandler(async (req: Request, res: Response) => {
    const result = await videoService.getAllVideos();
    res.send(createResponse(result));
});

export const getVideoById = asyncHandler(async (req: Request, res: Response) => {
    const result = await videoService.getVideoById(req.params.id);
    res.send(createResponse(result));
});

export const updateVideo = asyncHandler(async (req: Request, res: Response) => {
    const result = await videoService.updateVideo(req.params.id, req.body);
    res.send(createResponse(result, "Video updated successfully"));
});

export const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
    const result = await videoService.deleteVideo(req.params.id);
    res.send(createResponse(result, "Video deleted successfully"));
});

export const incrementViewCount = asyncHandler(async (req: Request, res: Response) => {
    const result = await videoService.incrementViewCount(req.params.id);
    res.send(createResponse(result, "View count updated"));
});

export const getVideoPlayback = asyncHandler(async (req: Request, res: Response) => {
    const { videoId, userId } = req.params;  
    const video = await videoService.getVideoById(videoId);
    if (!video) {
        res.status(404).send(createResponse(null, "Video not found"));
        return;
    }
    if (video.access==="paid") {
        const isSubscribed = await userService.getUserSubscription(userId);
        if (!isSubscribed) {
            res.send(createResponse(null, "Please subscribe to view this video"));
            return;
        }
    }
    res.send(createResponse({ videoUrl: video.url }, "Video is ready for playback"));
});
