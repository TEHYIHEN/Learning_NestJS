import { IsInt, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class IdParamDto{

    @IsInt()
    @IsPositive()
    @Type(() => Number)   //没有这个，像@Patch(:id/name) 这种长的param+ route过不了
        id!:number;

    // @IsString()
    //     name!:string;

}