import { diskStorage } from 'multer';
import * as fs from 'fs';


const directoryPath = './uploads/resume';
if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

export const fileUploadOptions = {
    storage: diskStorage({
        destination: './uploads/resume',
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            const fileName = `resume-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`;
            cb(null, fileName);
        }
    })
};
