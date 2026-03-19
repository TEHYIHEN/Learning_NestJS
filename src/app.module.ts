import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { pgConfig } from 'dbConfig';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //TypeOrmModule.forRoot(pgConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: pgConfig
    }),
    PropertyModule, 
   ],
  controllers: [AppController],
  providers: [AppService],
  
  
})
export class AppModule {}
