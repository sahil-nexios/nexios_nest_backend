import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../schedule/schedule.entity/schedule.entity';
import { applynow } from '../schedule/schedule.entity/applynow.entity';
import { contact } from '../schedule/schedule.entity/contact.entity';
import { client } from '../schedule/schedule.entity/client.entity';
import { team } from '../schedule/schedule.entity/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { read } from 'fs';
import { EmailService } from '../emailservice';
import { Connection } from 'typeorm';
import * as fs from 'fs';


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
        private readonly contactRepository: Repository<contact>,

        @InjectRepository(client)
        private readonly clientRepository: Repository<client>,


        @InjectRepository(team)
        private readonly teamRepository: Repository<team>,
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

    async Add_client(dto, file) {
        try {
            const image = `public/client/${file.filename}`
            const client = this.clientRepository.create({ ...dto, image: image })
            return await this.clientRepository.save(client)
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ Add_client ~ error:", error)
            throw new Error("Failed to Add Data In Client . Please try again later.");
        }
    }

    async Update_client(id, dto, file) {
        try {
            // const datas = await this.clientRepository.query('SELECT * FROM client WHERE id = ?', [id]);
            const datas = await this.clientRepository.findOne({ where: { id: id } });
            if (!datas) return null
            let image;
            if (file) {
                fs.unlinkSync(datas.image);
                image = `public/client/${file.filename}`;
            }
            const setdata = {
                ...dto,
                image: image
            }
            return this.clientRepository
                .createQueryBuilder()
                .update()
                .set(setdata)
                .where('id = :id', { id })
                .execute()
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ Update_client ~ error:", error)
            throw new Error("Failed to Update Data In Client . Please try again later.");
        }
    }

    async delete_client(id) {
        try {
            const datas = await this.clientRepository.findOne({ where: { id: id } });
            if (!datas) return null
            fs.unlinkSync(datas.image);
            return await this.clientRepository.delete(id);
        } catch (error) {
            throw new Error("Failed to Delete Data In Client . Please try again later.");
        }
    }

    async Add_team(dto, file) {
        try {
            const image = `public/team/${file.filename}`
            const team = this.teamRepository.create({ ...dto, image: image })
            return await this.teamRepository.save(team)
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ Add_team ~ error:", error)
            throw new Error("Failed to Add Data In Team . Please try again later.");
        }
    }

    async Team_update(id, dto, file) {
        try {
            // const datas = await this.clientRepository.query('SELECT * FROM client WHERE id = ?', [id]);
            const datas = await this.teamRepository.findOne({ where: { id: id } });
            if (!datas) return null
            let image;
            if (file) {
                fs.unlinkSync(datas.image);
                image = `public/team/${file.filename}`;
            }
            const setdata = {
                ...dto,
                image: image
            }
            return this.teamRepository
                .createQueryBuilder()
                .update()
                .set(setdata)
                .where('id = :id', { id })
                .execute()
        } catch (error) {
            console.log("🚀 ~ ScheduleService ~ Update_team ~ error:", error)
            throw new Error("Failed to Update Data In team . Please try again later.");
        }
    }

    async delete_team(id){
        try {
            const datas = await this.teamRepository.findOne({ where: { id: id } });
            if (!datas) return null
            fs.unlinkSync(datas.image);
            return await this.teamRepository.delete(id);
        } catch (error) {
            throw new Error("Failed to Delete Data In Team . Please try again later.");
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

