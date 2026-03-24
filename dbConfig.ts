import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
//import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";


// export const pgConfig: PostgresConnectionOptions = {

//     url:process.env.DATABASE_URL,
//     type: 'postgres',
//     port:5432,  //5432 is postgres default, 3306 is MYSQL
//     entities:[__dirname + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity
//     synchronize:true, //only open in development, change to "false" in Production📌
//     ssl:true,
//     extra: {
//     ssl: {
//       rejectUnauthorized: false, 
//     }, 
//     }
// }


// all of this link to app.module.ts
//最后我选择用这个，因为PostgresConnectionOptions 放不了autoLoadEntities
export const pgConfig = (configService: ConfigService): TypeOrmModuleOptions => ({

    url: configService.get<string>('DATABASE_URL'), // .env 
    type: 'postgres',
    port: 5432,  //5432 is postgres default, 3306 is MYSQL
    
    //autofind @Entity
    autoLoadEntities: true, 

    entities: [__dirname + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity,但注意filename一定得有.entity.ts, 写错一个字都会报错。避免这问题的方案是autoLoadEntities
    synchronize: true, //only open in development, change to "false" in Production📌
    ssl: {
      rejectUnauthorized: false, 
    }, 
    
})



// export const pgConfig = (configService: ConfigService): PostgresConnectionOptions => ({

//     url: configService.get<string>('DATABASE_URL'),
//     type: 'postgres',
//     port:5432,  //5432 is postgres default, 3306 is MYSQL
//     entities:[__dirname + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity,但注意filename一定得有.entity.ts, 写错一个字都会报错。避免这问题的方案是autoLoadEntities
//     synchronize:true, //only open in development, change to "false" in Production📌
//     ssl: {
//       rejectUnauthorized: false, 
//     }, 
    
// })