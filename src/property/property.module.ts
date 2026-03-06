import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],
  // providers: [   //这里暂时只是学习，未来主要是配合@Injectable (service.ts)
  //   {
  //     provide: APP_PIPE,
  //     //useClass: ValidationPipe,
  //     useValue: new ValidationPipe({
  //       whitelist:true,
  //       forbidNonWhitelisted: true

  //     })
  //   }
  // ]
})
export class PropertyModule {}
