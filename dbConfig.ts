import { ConfigService, registerAs } from "@nestjs/config";
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
//本来我选择用这个，因为PostgresConnectionOptions 放不了autoLoadEntities
//最后选了下一个
// export const pgConfig = (configService: ConfigService): TypeOrmModuleOptions => ({//🐒

//     url: configService.get<string>('DATABASE_URL'), // .env 
//     type: 'postgres',
//     port: 5432,  //5432 is postgres default, 3306 is MYSQL
    
//     //autofind @Entity
//     autoLoadEntities: true, 

//     entities: [__dirname + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity,但注意filename一定得有.entity.ts, 写错一个字都会报错。避免这问题的方案是autoLoadEntities
//     synchronize: true, //only open in development, change to "false" in Production📌
//     ssl: {
//       rejectUnauthorized: false, 
//     }, 
    
// })


//最后我用了这个，我会用🐒标记过去的代码， 只是在app.module.ts
export default registerAs("database", (): TypeOrmModuleOptions => ({
    
    //url: configService.get<string>('DATABASE_URL'),
    url: process.env.DATABASE_URL, // 在 load 模式下，这里可以直接用 process.env
    type: 'postgres',
    port: 5432,  //5432 is postgres default, 3306 is MYSQL
    
    //autofind @Entity
    autoLoadEntities: true, 

    entities: [__dirname + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity,但注意filename一定得有.entity.ts, 写错一个字都会报错。避免这问题的方案是autoLoadEntities
    synchronize: true, //only open in development, change to "false" in Production📌
    ssl: {
      rejectUnauthorized: false, 
    }, 
    //dropSchema: true  //📌添加这一行，启动时会清空所有表里的data   !!!💀注意，用了后换掉false或 "//"掉
    
}))

//console.log(process.env.url); //result was undefined and it prove read .env file 1st.

