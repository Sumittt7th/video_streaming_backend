
import * as analyticsService from "./analytics.service";
import { createResponse } from "../../app/common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";


export const incrementViewCount = asyncHandler(async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const userId = req?.user?._id;
    if(userId){
    const result = await analyticsService.incrementViewCount(videoId, userId);
    res.send(createResponse(result, "View count incremented successfully"));
    }
    else{
        res.send(createResponse(null, "View count not incremented successfully"));
    }
});


export const getAnalyticsByVideoId = asyncHandler(async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const result = await analyticsService.getAnalyticsByVideoId(videoId);
    res.send(createResponse(result,"Analytics fetched sucessfully"));
});
