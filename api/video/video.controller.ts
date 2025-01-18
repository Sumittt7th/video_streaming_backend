import * as videoService from "./video.service";
import { createResponse } from "../../app/common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as userService from "../user/user.service";

export const uploadVideos = asyncHandler(
    async (req: Request, res: Response, next: Function) => {
        if (!req.file) {
            res.send(createResponse(null, "No file uploaded" ));
            return; 
        } 
            const result = await videoService.uploadVideo(req.body, req.file);
            res.send(createResponse(result, "Video uploaded successfully"));
    }
);

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
    res.send(createResponse({ videoUrl: video.hlsUrl }, "Video is ready for playback"));
});
