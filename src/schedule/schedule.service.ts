import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../schedule/schedule.entity/schedule.entity';
import { applynow } from '../schedule/schedule.entity/applynow.entity';
import { contact } from '../schedule/schedule.entity/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { read } from 'fs';
import { EmailService } from '../emailservice';
import { Connection } from 'typeorm';


@Injectable()
export class ScheduleService {
    constructor(
        private readonly connection: Connection,

        private readonly EmailService: EmailService,
        @InjectRepository(ScheduleEntity)
        private readonly todorepository: Repository<ScheduleEntity>,

        @InjectRepository(applynow)
        private readonly applyNowRepository: Repository<applynow>,

        @InjectRepository(contact)
        private readonly contactRepository: Repository<applynow>,
    ) { }

    async create(dto) {
        try {
            const schedule = this.todorepository.create(dto)
            const senddata = {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                brief: dto.brief,
                subject: 'Schedule call',
                file_template: './public/emailTemplete/Schedule.html',
            };
            this.EmailService.schedule(senddata);
            const savedSchedule = await this.todorepository.save(schedule);
            return savedSchedule;
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ create ~ error:", error)
            throw new Error("Failed to create schedule. Please try again later.");
        }
    }

    async createapplynow(dto, file) {
        try {
            const pdfpath = `uploads/resume/${file.filename}`
            const schedule = this.applyNowRepository.create({ ...dto, file: pdfpath });
            // const pdfpath = `upload/resume/${req.file.filename}`

            const senddata = {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                subject: dto.subject,
                pdfpath: pdfpath,
                file_template: './public/emailTemplete/Applynow.html'

            };
            this.EmailService.applynow(senddata);
            return await this.applyNowRepository.save(schedule)
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ createapplynow ~ error:", error)
            throw new Error("Failed to applyNow. Please try again later.");
        }
    }

    async createcontactus(dto) {
        try {
            const contactus = this.contactRepository.create(dto)
            const senddata = {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                message: dto.message,
                file_template: "./public/emailTemplete/contactus.html",
                subject: "Contact Us"
            }
            this.EmailService.contact_usemail(senddata);
            return await this.contactRepository.save(contactus)
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ createcontactus ~ error:", error)
            throw new Error("Failed to ContactUs. Please try again later.");
        }
    }

    async our_client() {
        try {
            return await this.connection.query('SELECT * FROM client');
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ our_client ~ error:", error)
            throw new Error("Failed to Fatch Data. Please try again later.");
        }
    }

    async our_team() {
        try {
            return await this.connection.query('SELECT * FROM team');
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ our_team ~ error:", error)
            throw new Error("Failed to Fatch Data. Please try again later.");
        }
    }

    async portfolio() {
        try {
            return await this.connection.query('SELECT * FROM portfolio_service');
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ portfolio ~ error:", error)
            throw new Error("Failed to Fatch Data. Please try again later.");
        }
    }

    async open_position() {
        try {
            return await this.connection.query('SELECT * FROM open_position');
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ open_position ~ error:", error)
            throw new Error("Failed to Fatch Data. Please try again later.");
        }
    }
}

