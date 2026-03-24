import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { PropertyFactory } from "./property.factory";
import { UserFactory } from "./user.factory";
import { PropertyFeatureFactory } from "./propertyFeature.factory";
import { MainSeeder } from "./main.seeder";
import "dotenv/config"


const options: DataSourceOptions & SeederOptions ={
    //...pgConfig   //cant use here because not the same type, have to copy paste
    type: 'postgres',
    url: process.env.DATABASE_URL,
    port: 5432,
    //entities: [__dirname + '/**/*.entity{.ts,.js}'], 
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false, 
    },

    factories:[PropertyFactory,UserFactory,PropertyFeatureFactory],
    seeds:[MainSeeder]
}

const dataSource = new DataSource(options);

// dataSource.initialize().then(async ()=> {
//     await dataSource.synchronize(true);
//     await runSeeders(dataSource);
//     process.exit();

// })

const runSeed = async() => {
    try {
        await dataSource.initialize();
        await dataSource.synchronize(true);
        await runSeeders(dataSource);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runSeed();



/* 注意📌📌📌

所有在factory.ts, seeder.ts, seed.ts里面的路径，
路径src必须得换成../
example: import { Property } from "src/entities/property.entity";
换去 ../entities/property.entity";

have error after proceed pnpm run seed,
seed command added in package.json

*/