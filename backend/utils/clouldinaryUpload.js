import cloudinary from '../config/cloudinary.js'
import fs from 'fs';
import path from "path";



const uploadExcelFile = async (excelFile)=>{
    try {

        const filePath = path.normalize(excelFile.path); // normalize Windows paths
        console.log('Uploading to Cloudinary:', filePath);
        
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            folder: 'excel_uploads',
        });

        // Delete local file
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete file:', err);
            else console.log('Local file deleted:', filePath);
        });
        
        return result.secure_url;
    } catch (error) {
        console.log("Error::Cloudinary excel file upload!!");
    }

}

export {
    uploadExcelFile
}