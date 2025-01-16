// analytics.schema.ts
import mongoose from "mongoose";
import { IAnalytics } from "./analytics.dto";

const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema<IAnalytics>({
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },  
    views: { type: Number, required: true, default: 0 }, 
}, { timestamps: true });

export default mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
