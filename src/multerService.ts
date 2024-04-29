import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const directory = 'uploads/resume';

// if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory);
// }

@Injectable()
export class FileUploadService {
    constructor() { }

    multerStorage = {
        storage: diskStorage({
            destination: directory,
            filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1];
                const fileName = `resume-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`;
                cb(null, fileName);
            },
        }),
    };

    upload() {
        return this.multerStorage;
    }
}
