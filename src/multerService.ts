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


const clientimageuploadPath = './public/client';

if (!fs.existsSync(clientimageuploadPath)) {
    fs.mkdirSync(clientimageuploadPath, { recursive: true });
}

export const clientimageupload = {
    storage: diskStorage({
        destination: clientimageuploadPath,
        filename: (req, file, cb) => {
            let ext = file.mimetype.split("/")[1];
            if(ext == "svg+xml") ext = "svg"
            const fileName = `${file.originalname.split('.')[0]}-${Date.now()}.${ext}`;
            cb(null, fileName);
        }
    })
}



const teamimageuploadPath = './public/team';

if (!fs.existsSync(teamimageuploadPath)) {
    fs.mkdirSync(teamimageuploadPath, { recursive: true });
}

export const teamimageupload = {
    storage: diskStorage({
        destination: teamimageuploadPath,
        filename: (req, file, cb) => {
            let ext = file.mimetype.split("/")[1];
            if (ext == "svg+xml") ext = "svg"
            const fileName = `${file.originalname.split('.')[0]}-${Date.now()}.${ext}`;
            cb(null, fileName);
        }
    })
}