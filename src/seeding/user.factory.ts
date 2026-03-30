import { Faker } from "@faker-js/faker";
import { User } from "../entities/user.entity";
import {setSeederFactory} from "typeorm-extension";


export const UserFactory = setSeederFactory(User, (faker:Faker)=> {

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.avatarUrl = faker.image.avatar();
    user.password = "Abc@12345";
    
    return user;

});

// 🧍 Person - Generate Names, Genders, Bios, Job titles, and more.
// 📍 Location - Generate Addresses, Zip Codes, Street Names, States, and Countries!
// ⏰ Date - Past, present, future, recent, soon... whenever!
// 💸 Finance - Create stubbed out Account Details, Transactions, and Crypto Addresses.
// 👠 Commerce - Generate Prices, Product Names, Adjectives, and Descriptions.
// 👾 Hacker - “Try to reboot the SQL bus, maybe it will bypass the virtual application!”
// 🔢 Number and String - Of course, we can also generate random numbers and strings.
// 🌏 Localization - Pick from over 70 locales to generate realistic looking Names, Addresses, and Phone Numbers.