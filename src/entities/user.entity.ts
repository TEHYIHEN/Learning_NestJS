import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

import * as bcrypt from 'bcrypt';
import { IsOptional, Matches, MinLength } from "class-validator";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    firstName!:string;

    @Column()
    lastName!:string;

    @Column()
    email!:string;

    @Column({ nullable: true }) //allow no value inside the colimn, we call it NULL
    avatarUrl!:string;

    @CreateDateColumn()
    createAt!: Date;

    /* 
    Do not store password direct in database
    Use Hashing, to transform the password to an irreversible STRING of characters
    */
    @Column({type:"varchar" , length: 255 , default:"temporary_password"})
    password!:string;

    @Column({ nullable: true, type: 'varchar' })
    hashedRefreshToken?:string | null;

    @BeforeInsert() //在save进database之前的意思
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10) // saltOrRounds choose 10 is better, more larger the value more laggy
    }


    @OneToMany(()=>Property, (property)=> property.user)
    properties!:Property[];

    @ManyToMany(()=>Property, (property)=> property.likedBy)
    likedProperties!:Property[]

}