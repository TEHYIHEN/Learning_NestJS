import { ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";


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

export const pgConfig = (configService: ConfigService): PostgresConnectionOptions => ({

    url: configService.get<string>('DATABASE_URL'),
    type: 'postgres',
    port:5432,  //5432 is postgres default, 3306 is MYSQL
    entities:[__dirname + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity
    synchronize:true, //only open in development, change to "false" in Production📌
    ssl: {
      rejectUnauthorized: false, 
    }, 
    
})