import { IsInt, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto{


    // ! meaning compulsory needed
    // ? meaning optional, better use @IsOptional when using it

    @IsString()
    @Length(1, 20, {message:"Name must be between 1 and 20 characters"})
        name!: string;
    
    @IsString()
    //groups用来分类给controller用哪种length, 通常都不怎么会用它
    //没放groups的controller会默认选择第一排@Lenght的规则，默认选A
    @Length(2, 10, {groups: ["update"]})   //A
    @Length(1, 15, {groups: ["create"]})   //B
        description!: string;

    @IsInt()
    @IsPositive()
        area!: number;
    
}