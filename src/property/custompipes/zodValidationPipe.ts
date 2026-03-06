import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import z from "zod";


export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: z.ZodType) {}   //ZodShema已经是旧版本，我用最新的z.ZodType
  
    transform(value: any, metadata: ArgumentMetadata) {


        //这个写法是最稳的。
        // const parsedValue = this.schema.safeParse(value);
       

        // if(!parsedValue.success){

        //     const formattedError = z.treeifyError(parsedValue.error);
        //     throw new BadRequestException(formattedError);

        // } 

        // return parsedValue.data;


        //这个写法就变难变长了。
        try {
            
            const parsedValue = this.schema.parse(value);
            return parsedValue;


        } catch (error) {
            
            // const formattedError = "Validation failed!"
            // throw new BadRequestException(formattedError);

            if(error instanceof z.ZodError){

                const detailErrors = z.treeifyError(error);
                throw new BadRequestException({

                    message: "Validation failed!",
                    errors: detailErrors

                });
            }

            throw error;
        }

        
    }

    
    
}