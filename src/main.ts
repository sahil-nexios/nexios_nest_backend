import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { error } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express();
  dotenv.config();
  expressApp.use('/uploads', express.static('uploads'));
  expressApp.use('/public', express.static('public'));

  app.use(expressApp);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        throw new BadRequestException({
          status : false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed !',
          errors: result,
        });
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
