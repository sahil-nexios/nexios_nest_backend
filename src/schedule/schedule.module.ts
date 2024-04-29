import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from '../schedule/schedule.entity/schedule.entity'
import { EmailService } from '../emailservice';
import { FileUploadService } from '../multerService'
import { applynow } from '../schedule/schedule.entity/applynow.entity'
import { contact } from '../schedule/schedule.entity/contact.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, applynow, contact])],
  providers: [ScheduleService, EmailService, FileUploadService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
