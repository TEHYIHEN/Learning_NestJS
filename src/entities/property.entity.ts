import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";
import { User } from "./user.entity";
import { property } from "zod";
import { PropertyType } from "./propertyType.entity";


@Entity()
export class Property{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column()
    description?: string;

    // @Column({ type: 'decimal', precision: 12, scale: 2 }) // 12位有效数字，2位小数
    // price: number;
    @Column({default:0})
    price!: number;

    @OneToOne(()=> PropertyFeature, (propertyFeature)=> propertyFeature.property)
    propertyFeatures!:PropertyFeature

    @ManyToOne(()=>User, (user)=> user.properties)
    @JoinColumn({name:"ownerId"})
    user!:User

    @ManyToMany(()=>User, (user)=> user.likedProperties)
    @JoinTable({name:"user_liked_properties"})
    likedBy!:User[]

    @ManyToOne(()=>PropertyType)
    type!:PropertyType


}