import { Body, Controller, HttpException, Param, Post, Get, UsePipes, UploadedFile, ValidationPipe, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from '../schedule/dtos/schedule.dto'
import { ApplynowDto } from '../schedule/dtos/applynow.dto'
import { ContactDto } from '../schedule/dtos/contact.dto';
import { ClientDto } from '../schedule/dtos/client.dto';
import { PortfolioDto } from '../schedule/dtos/portfolio.dto';
import { TeamDto } from '../schedule/dtos/team.dto';
import { CareerDto } from '../schedule/dtos/career.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from '../multerService';
import { clientimageupload } from '../multerService';
import { teamimageupload } from '../multerService';
import { portfolioimageupload } from '../multerService';



@Controller('user')
export class ScheduleController {
    constructor(
        private readonly scheduleservice: ScheduleService,
    ) { }

    @Post('add_schedule')
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateScheduleDto, @Res() res: Response) {
        try {
            await this.scheduleservice.create(dto)
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
            await this.scheduleservice.createapplynow(dto, file)
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ createApplynow ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('contact_us')
    async contact_us(@Body() dto: ContactDto, @Res() res: Response) {
        try {
            await this.scheduleservice.createcontactus(dto)
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Your Request Sent Succesfully !' });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ contact_us ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('Add_client')
    @UseInterceptors(FileInterceptor('image', clientimageupload))
    async Add_client(@UploadedFile() file, @Body() dto: ClientDto, @Res() res: Response) {
        try {
            if (!file) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.BAD_REQUEST, status: false, message: "Please Upload Image !", });
            await this.scheduleservice.Add_client(dto, file)
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Client Added Succesfully !' });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ Add_client ~ error:", error)
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

    @Post("update_client/:id")
    @UseInterceptors(FileInterceptor('image', clientimageupload))
    async Update_client(@Res() res: Response, @Param('id') id: string, @Body() dto: any, @UploadedFile() file?) {
        try {
            const finddata = await this.scheduleservice.Update_client(id, dto, file);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Client Not Found !", });

            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Client Updated Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ Update_client ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }

    }

    @Get("delete_client/:id")
    async delete_client(@Res() res: Response, @Param('id') id: string) {
        try {
            const finddata = await this.scheduleservice.delete_client(id);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Client Not Found !", });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Client Deleted Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ delete_client ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('Add_team')
    @UseInterceptors(FileInterceptor('image', teamimageupload))
    async Add_team(@UploadedFile() file, @Body() dto: TeamDto, @Res() res: Response) {
        try {
            if (!file) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.BAD_REQUEST, status: false, message: "Please Upload Image !", });
            await this.scheduleservice.Add_team(dto, file);
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Team Added Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ Add_team ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Get('our_team')
    async our_team(@Res() res: Response) {
        try {
            const teamData = await this.scheduleservice.our_team();
            if (teamData.lenght <= 0) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.NO_CONTENT, status: false, message: 'No Data Found !', data: [] });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Our Teams !', data: teamData });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ our_team ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }

    @Post("update_team/:id")
    @UseInterceptors(FileInterceptor('image', teamimageupload))
    async Team_update(@Res() res: Response, @Param('id') id: string, @Body() dto: any, @UploadedFile() file?) {
        try {
            const finddata = await this.scheduleservice.Team_update(id, dto, file);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Team Not Found !", });

            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Team Updated Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ Team_update ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }

    }

    @Get("delete_team/:id")
    async delete_team(@Res() res: Response, @Param('id') id: string) {
        try {
            const finddata = await this.scheduleservice.delete_team(id);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Team Not Found !", });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Team Deleted Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ delete_team ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('Add_portfolio')
    @UseInterceptors(FileInterceptor('image', portfolioimageupload))
    async Add_portfolio(@Res() res: Response, @Body() dto: PortfolioDto, @UploadedFile() file) {
        try {
            if (!file) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.BAD_REQUEST, status: false, message: "Please Upload Image !", });
            await this.scheduleservice.Add_portfolio(dto, file);
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Portfolio Added Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ Add_portfolio ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
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
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }

    @Post("update_portfolio/:id")
    @UseInterceptors(FileInterceptor('image', portfolioimageupload))
    async portfolio_update(@Res() res: Response, @Param('id') id: string, @Body() dto: any, @UploadedFile() file?) {
        try {
            const finddata = await this.scheduleservice.portfolio_update(id, dto, file);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Portfolio Not Found !", });

            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Portfolio Updated Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ portfolio_update ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }

    }

    @Get("delete_portfolio/:id")
    async delete_portfolio(@Res() res: Response, @Param('id') id: string) {
        try {
            const finddata = await this.scheduleservice.delete_portfolio(id);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Portfolio Not Found !", });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Portfolio Deleted Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ delete_portfolio ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Post('Add_position')
    async Add_position(@Body() dto: CareerDto, @Res() res: Response) {
        try {
            await this.scheduleservice.Add_position(dto);
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Position Added Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ Add_position ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
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
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !" });
        }
    }

    @Post("update_position/:id")
    async update_position(@Res() res: Response, @Param('id') id: string, @Body() dto: any) {
        try {
            const finddata = await this.scheduleservice.update_position(id, dto);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Position Not Found !", });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Position Updated Succesfully !' });
        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ update_position ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

    @Get("delete_position/:id")
    async delete_position(@Res() res: Response, @Param('id') id: string) {
        try {
            const finddata = await this.scheduleservice.delete_position(id);
            if (finddata == null) return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.NOT_FOUND, status: false, message: "Position Not Found !", });
            return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, status: true, message: 'Position Deleted Succesfully !' });

        } catch (error) {
            console.log("🚀 ~ ScheduleController ~ delete_position ~ error:", error)
            return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
        }
    }

}
