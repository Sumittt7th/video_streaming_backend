import multer from 'multer';
import path from 'path';
import fs from "fs";

const uploadDir = path.join(__dirname, 'uploads', 'videos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure the storage for file uploads
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        // Specify the directory where the uploaded files will be stored
        cb(null, uploadDir);
    },
    filename: (req,file,cb) => {
        // Set the filename format
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// File filter to allow only video files
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedMimes = ['video/mp4', 'video/mkv', 'video/webm'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only mp4, mkv, and webm are allowed.'));
    }
};

// Create the multer upload middleware
export const uploadVideo = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, 
    },
}).single('video'); // 'video' is the field name in the form
