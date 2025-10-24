import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

const uploadImage = async (file) => {
  try {
    // Case 1: File uploaded in memory (e.g., Vercel + multer memoryStorage)
    if (file.buffer) {
      const stream = Readable.from(file.buffer);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "image_uploads",
            public_id: `${Date.now()}-${file.originalname}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });

      return result.secure_url;
    }

    // Case 2: File stored locally (diskStorage)
    if (file.path) {
      const filePath = path.normalize(file.path);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "image_uploads",
      });

      // Remove file from local storage after upload
      fs.unlink(filePath, (err) => {
        if (err) console.error("File delete failed:", err);
      });

      return result.secure_url;
    }

    throw new Error("Invalid file — no buffer or path found");

  } catch (error) {
    console.error("Cloudinary Image Upload Error:", error);
    throw error;
  }
};


const uploadExcelFile = async (file) => {
  try {
    // Handle both file path (local) and buffer (memory storage on Vercel)
    if (file.buffer) {
      // Memory storage - convert buffer to stream
      const stream = Readable.from(file.buffer);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "excel_uploads",
            public_id: `${Date.now()}-${file.originalname}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });

      return result.secure_url;
    } else if (file.path) {
      // Disk storage (fallback for local development)
      const filePath = path.normalize(file.path);
      console.log("Uploading to Cloudinary:", filePath);

      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        folder: "excel_uploads",
      });

      // Delete local file
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
        else console.log("Local file deleted:", filePath);
      });

      return result.secure_url;
    } else {
      throw new Error("Invalid file object - no buffer or path found");
    }
  } catch (error) {
    console.error("Error::Cloudinary excel file upload!!", error);
    throw error;
  }
};

export { uploadExcelFile, uploadImage };
