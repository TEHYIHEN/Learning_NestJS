import { Faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import {setSeederFactory} from "typeorm-extension";


export const PropertyFactory = setSeederFactory(Property, (faker:Faker)=> {

    const property = new Property();
  
    property.name = faker.location.street();
    property.price = Math.round(+faker.commerce.price({min:10000, max:10000000})); // + is equal to Number(), commerce.price return the string result cause error.
    //or using, property.price = faker.number.int({ min: 10000, max: 10000000 });
    property.description = faker.commerce.productDescription();
    //property.description = faker.lorem.sentence({min:3, max:5});

    return property;
});