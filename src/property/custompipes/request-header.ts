import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export const RequestHeader = createParamDecorator(

    async(
        targetDto:any, ctx: ExecutionContext
    
    ) =>{

        const headers = ctx.switchToHttp().getRequest().headers;
        const dto = plainToInstance(targetDto, headers, {

            excludeExtraneousValues:true
        })

        // 🕵️ 关键调试点 1：看看 dto 到底是不是 HeadersDto 的实例
    console.log('Is instance of DTO?', dto instanceof targetDto);
    
    // 🕵️ 关键调试点 2：看看转换后里面有什么内容
    console.log('Converted DTO content:', JSON.stringify(dto));

        try {
             await validateOrReject(dto);

        } catch (error) {
            
            throw new BadRequestException({
                message:"Header validation failed!",
                errors: error,
            })
        }
       

        return dto;
    }
)