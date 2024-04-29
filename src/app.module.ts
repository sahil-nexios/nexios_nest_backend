import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule/schedule.entity/schedule.entity'
import { applynow } from './schedule/schedule.entity/applynow.entity'
import { contact } from './schedule/schedule.entity/contact.entity'
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nexios_nest',
      entities: [contact, ScheduleEntity, applynow],
      synchronize: false,
    }),
    ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
