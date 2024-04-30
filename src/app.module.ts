import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule/schedule.entity/schedule.entity'
import { applynow } from './schedule/schedule.entity/applynow.entity'
import { contact } from './schedule/schedule.entity/contact.entity'
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      // ignoreEnvFile : true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'nexios_nest',
      entities: [contact, ScheduleEntity, applynow],
      synchronize: false,
    }),
    ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
