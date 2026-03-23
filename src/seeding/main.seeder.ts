import { PropertyType } from "src/entities/propertyType.entity";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { PropertyFactory } from "./property.factory";
import { Property } from "src/entities/property.entity";
import { faker } from "@faker-js/faker";

export class MainSeeder implements Seeder{
    public async run(
        dataSource:DataSource,
        factorManager:SeederFactoryManager
    ):Promise<any>{

        const typeRepo = dataSource.getRepository(PropertyType);
        
        console.log("seeding PropertyTypes...");
        const propertyTypes = await typeRepo.save([
            {value:"Condo"},
            {value:"Apartment"},
        ]);

        const userFactory = factorManager.get(User);

        console.log("seeding users...");
        const users = await userFactory.saveMany(10);
        
        const propertyFactory = factorManager.get(Property);
        const properties = await Promise.all(
            Array(50).fill("").map(async ()=> {

                const property = await propertyFactory.make({
                    user: faker.helpers.arrayElement(users),
                })
            })
        );
    }
}