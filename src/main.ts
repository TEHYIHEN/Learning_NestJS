import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  //Hint
  //By default, if any error happens while creating the application your app will exit with the code 1.
  // If want to make it throw an error instead disable the option abortOnError (e.g.,NestFactory.create(AppModule, { abortOnError: false })).
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true,}));    //直接这样用安全又省心
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
