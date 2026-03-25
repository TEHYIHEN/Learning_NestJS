import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDTO {
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    skip?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number
}