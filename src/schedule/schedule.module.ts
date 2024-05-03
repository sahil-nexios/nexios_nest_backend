import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from '../schedule/schedule.entity/schedule.entity'
import { EmailService } from '../emailservice';
import { applynow } from '../schedule/schedule.entity/applynow.entity';
import { contact } from '../schedule/schedule.entity/contact.entity';
import { client } from '../schedule/schedule.entity/client.entity';
import { team } from '../schedule/schedule.entity/team.entity';
import { career } from '../schedule/schedule.entity/career.entity';
import { portfolio } from '../schedule/schedule.entity/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, applynow, contact, client, team, portfolio, career])],
  providers: [ScheduleService, EmailService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
