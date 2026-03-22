import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";
import { User } from "./user.entity";


@Entity()
export class Property{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column()
    description?: string;

    @Column({default:0})
    price!: number;

    @OneToOne(()=> PropertyFeature, (propertyFeature)=> propertyFeature.property)
    propertyFeatures!:PropertyFeature

    @ManyToOne(()=>User, (user)=> user.properties)
    @JoinColumn({name:"ownerId"})
    user!:User

}