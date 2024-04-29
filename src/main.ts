import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express();

  expressApp.use('/uploads', express.static('uploads'));
  expressApp.use('/public', express.static('public'));
  app.use(expressApp);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
