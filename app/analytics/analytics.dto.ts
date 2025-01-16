// analytics.dto.ts
import { ObjectId } from 'mongoose';
import { BaseSchema } from "../common/dto/base.dto";

export interface IAnalytics extends BaseSchema {
    videoId: string | ObjectId;       
    userId: string | ObjectId;         
    views: number;          
}
