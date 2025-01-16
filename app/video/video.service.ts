import { IVideo } from "./video.dto";
import VideoSchema from "./video.schema";
import cloudinary from "cloudinary";

export const uploadVideo = async (data: IVideo, file: Express.Multer.File) => {
    const result = await cloudinary.v2.uploader.upload(file.path, {
        resource_type: "video", 
        folder: "videos", 
      });
    const videoData = {
        ...data,
        url: result.secure_url,
       public_id: result.public_id,
        viewCount: 0,    
    };
    const results = await VideoSchema.create(videoData);
    return results;
};

export const getAllVideos = async () => {
    const result = await VideoSchema.find({}).lean();
    return result;
};

export const getVideoById = async (id: string) => {
    const result = await VideoSchema.findById(id).lean();
    return result;
};

export const updateVideo = async (id: string, data: Partial<IVideo>) => {
    const result = await VideoSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const deleteVideo = async (videoId: string) => {
    const video = await VideoSchema.findById(videoId);
  
    if (!video) {
      throw new Error("Video not found");
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.destroy(video.public_id, {
      resource_type: "video",
    });
  
    if (cloudinaryResponse.result !== "ok") {
      throw new Error("Failed to delete video from Cloudinary");
    }
    const deletedVideo = await VideoSchema.findByIdAndDelete(videoId);
  
    return deletedVideo;
  };

export const incrementViewCount = async (id: string) => {
    const video = await VideoSchema.findById(id);

    if (!video) {
        throw new Error("Video not found");
    }

    video.viewCount += 1;
    await video.save();

    return video;
};
