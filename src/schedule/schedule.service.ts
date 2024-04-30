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
        return await this.todorepository.save(schedule)
    }

    async createapplynow(dto, file) {
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
    }

    async createcontactus(dto) {
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
    }

    async our_client() {
        return await this.connection.query('SELECT * FROM client');
    }

    async our_team(){
        return await this.connection.query('SELECT * FROM team');
    }

    async portfolio(){
        return await this.connection.query('SELECT * FROM portfolio_service');
    }

    async open_position(){
        return await this.connection.query('SELECT * FROM open_position');
    }
}

