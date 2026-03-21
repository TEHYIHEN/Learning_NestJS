import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";


@Entity()
export class PropertyFeature{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    bedrooms!:number;

    @Column()
    bathrooms!:number;

    @Column()
    parkingSpots!:number;

    @Column()
    area!:number;

    @Column()
    hasBalcony!:boolean;

    @Column()
    hasGardenYard!:boolean;

    @Column()
    hasSwimmingPool!:boolean;

    //声明一对一关联，并指向 Property 类里的对应属性
    @OneToOne(()=>Property,(property)=> property.propertyFeatures, {cascade:true}) //cascade:true = 级联：保存房子时自动保存特征，删除房子时自动删除特征
    @JoinColumn() //在本表创建外键列，把两张表真正连起来
    property!:Property

}