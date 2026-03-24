import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { User } from '../entities/user.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Property, User])], //give permission to get Property in database(@Entity). Beside, control the Property using the Repository inside the service.ts. Example: this.repo.save(), .delete()
  controllers: [PropertyController],
  providers: [PropertyService],
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
