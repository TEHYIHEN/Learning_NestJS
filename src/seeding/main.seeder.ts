import { PropertyType } from "../entities/propertyType.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Property } from "../entities/property.entity";
import { faker } from "@faker-js/faker";
import { PropertyFeature } from "../entities/propertyFeature.entity";

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
        const propertyFeatureFactory = factorManager.get(PropertyFeature);

        console.log("seeding properties...");
        const properties = await Promise.all(
            Array(50).fill("").map(async ()=> {

                const property = await propertyFactory.make({
                    user: faker.helpers.arrayElement(users),
                    type: faker.helpers.arrayElement(propertyTypes),
                    propertyFeatures: await propertyFeatureFactory.save()

                });

                return property;
            }),
        );

        const propertyRepo = dataSource.getRepository(Property);
        await propertyRepo.save(properties);
    

    }
}