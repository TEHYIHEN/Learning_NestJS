import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import dbConfig from 'dbConfig';
//import dbConfigProduction from './config/db.config.production';
//import dbConfig from './config/db.config';


@Module({
  imports: [
    ConfigModule.forRoot({ //if needed process.env, ConfigModule is needed
      isGlobal: true,  //allow all to use process.env
      expandVariables:true, // allow using expand in .env， example: ${url}/user
      load:[dbConfig] //注意这个是来自src外面的 dbConfig.ts
      //load: [dbConfig, dbConfigProduction] //💩
      
    }),
    //TypeOrmModule.forRoot(pgConfig), 用TypeOrmModule.forRootAsync，先读.env再link database
    /* 
    
      为什么有了CongifModule跑dotenv,还需要以下TypeOrmModule.forRootAsync?
      Ans: Race condition problem => TypeORM link to database then read .env , cause undefined and fail to run system.
      So, we using forRootAsync method to read .env 1st b4 link to database.
      pgConfig inside have console.log to show and prove.
    */
     TypeOrmModule.forRootAsync({ 
       inject: [ConfigService],
       //useFactory: pgConfig //🐒
       useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>("database")!,
       /* 
       📌推荐这个非常安全，不放这个是为了让我注意 ! 这个符号
        useFactory: (configService: ConfigService) => {
          const dbConfig = configService.get<TypeOrmModuleOptions>('database');
          if (!dbConfig) {
              throw new Error('Database configuration is missing!');
          }
          return dbConfig;
        },
       */
     }),
     PropertyModule,
     UserModule,  // 👆nest g res user 后自动来了这里
    // TypeOrmModule.forRootAsync({//💩
    //   useFactory: process.evn.NODE_ENV === "production" ? dbConfigProduction : dbConfig , // for safe enviroment
    // }),
    // PropertyModule, //💩
    ], 

  controllers: [AppController],
  providers: [AppService],
  
  
})
export class AppModule {}
