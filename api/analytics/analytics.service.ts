
import { IAnalytics } from "./analytics.dto";
import AnalyticsSchema from "./analytics.schema";


export const getOrCreateAnalytics = async (videoId: string, userId: string) => {
    const analytics = await AnalyticsSchema.findOne({ videoId, userId });
    if (analytics) {
        return analytics;
    }
    
    const newAnalytics = new AnalyticsSchema({
        videoId,
        userId,
        views: 0,
    });
    return await newAnalytics.save();
};

export const incrementViewCount = async (videoId: string, userId: string) => {
    const analytics = await getOrCreateAnalytics(videoId, userId);
    analytics.views += 1;  
    return await analytics.save();
};


export const getAnalyticsByVideoId = async (videoId: string) => {
    const analytics = await AnalyticsSchema.find({ videoId }).populate("userId", "name email");
    return analytics;
};
