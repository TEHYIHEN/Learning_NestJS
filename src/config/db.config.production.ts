import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

import * as path from "path"

//this db.config.ts is using for understanding and learning
//for offical pls using TypeOrmModuleOptions
//i put symbol 💩 for refer, in app module.ts, seed.ts 

export default():PostgresConnectionOptions => ({



    url:process.env.DATABASE_URL,

    type: 'postgres',

    port: +process.env.THEPORT!,  //5432 is postgres default, 3306 is MYSQL

    entities:[path.resolve(__dirname, "..") + '/**/*.entity{.ts,.js}'], // 让它自动找实体,也就是@Entity

    synchronize:false, //only open in development, change to "false" in Production📌

    ssl:true,

    extra: {

    ssl: {

      rejectUnauthorized: false,

    },

    }

}



)