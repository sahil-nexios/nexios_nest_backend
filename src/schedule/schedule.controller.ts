import { Body, Controller, HttpException, Post, Get, UsePipes, UploadedFile, ValidationPipe, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from '../schedule/dtos/schedule.dto'
import { ApplynowDto } from '../schedule/dtos/applynow.dto'
import { ContactDto } from '../schedule/dtos/contact.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../multerService';
import { Multer } from 'multer';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { validateOrReject } from 'class-validator';


@Controller('user')
export class ScheduleController {
    constructor(
        private readonly scheduleservice: ScheduleService,
        private readonly FileUploadService: FileUploadService
    ) { }
    @Post('schedule')
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateScheduleDto, @Res() res: Response) {
        this.scheduleservice.create(dto)
        return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });
    }

    @Post('apply_now')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/resume'
            , filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1];
                const fileName = `resume-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`;
                cb(null, fileName)
            }
        })
    }
    ))
    async createApplynow(@UploadedFile() file, @Body() dto: ApplynowDto, @Res() res: Response) {
        this.scheduleservice.createapplynow(dto, file)
        return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });
    }

    @Post('contact_us')
    async contact_us(@Body() dto: ContactDto, @Res() res: Response) {
        this.scheduleservice.createcontactus(dto)
        return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });
    }

    
    @Get('our_client')
    async our_client(): Promise<any[]> {
        return this.scheduleservice.our_client();
    }
}
