import { Body, Controller, HttpException, Post, Get, UsePipes, UploadedFile, ValidationPipe, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from '../schedule/dtos/schedule.dto'
import { ApplynowDto } from '../schedule/dtos/applynow.dto'
import { ContactDto } from '../schedule/dtos/contact.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from '../multerService';
import { Multer } from 'multer';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { validateOrReject } from 'class-validator';


@Controller('user')
export class ScheduleController {
    constructor(
        private readonly scheduleservice: ScheduleService,
    ) { }

    @Post('schedule')
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateScheduleDto, @Res() res: Response) {
        try {
            this.scheduleservice.create(dto)
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ create ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('apply_now')
    @UseInterceptors(FileInterceptor('file', fileUploadOptions))
    async createApplynow(@UploadedFile() file, @Body() dto: ApplynowDto, @Res() res: Response) {
        try {
            this.scheduleservice.createapplynow(dto, file)
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ createApplynow ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('contact_us')
    async contact_us(@Body() dto: ContactDto, @Res() res: Response) {
        try {
            this.scheduleservice.createcontactus(dto)
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ contact_us ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Get('our_client')
    async our_client(@Res() res: Response) {
        try {
            const clientData = await this.scheduleservice.our_client();
            if (clientData.lenght <= 0) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.NO_CONTENT, status: false, message: 'No Data Found !', data: [] });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Our Clients !', data: clientData });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ our_client ~ error:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }

    @Get('our_team')
    async our_team(@Res() res: Response) {
        try {
            const teamData = await this.scheduleservice.our_team();
            if (teamData.lenght <= 0) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.NO_CONTENT, status: false, message: 'No Data Found !', data: [] });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Our Clients !', data: teamData });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ our_team ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }


    @Get('portfolio')
    async portfolio(@Res() res: Response) {
        try {
            const portfolioData = await this.scheduleservice.portfolio();
            if (portfolioData.lenght <= 0) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.NO_CONTENT, status: false, message: 'No Data Found !', data: [] });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Our Portfolio!', data: portfolioData });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ portfolio ~ error:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }


    @Get('open_position')
    async open_position(@Res() res: Response) {
        try {
            const positionData = await this.scheduleservice.open_position();
            if (positionData.lenght <= 0) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.NO_CONTENT, status: false, message: 'No Data Found !', data: [] });

            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Our Positions!', data: positionData });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ open_position ~ error:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }

}
