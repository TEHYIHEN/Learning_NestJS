import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


/* 
    ParseIdPipe 是我自定义的Pipe名字，
    implements PipeTransform<T,R>{tranform(value:??): ??} 是必须得。
    T = InputType, R = Result   ??= string,number,,,,
*/
@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {

    //这里的是意思是turn value string to number
    // metadata.type 会告诉你数据是从哪儿来的：'body' | 'query' | 'param' | 'custom'
    // metadata.data 会告诉你参数的名字：比如 "id" 或 "page"
    transform(value: string, metadata: ArgumentMetadata): number {
        
        const val = parseInt(value, 10);

        //isNaN 是检查 val是不是number,配合parseInt是绝配
        if (isNaN(val)) {

            throw new BadRequestException("id must be a number");
        };

        if (val <= 0 ) {

            throw new BadRequestException("id must be a positive number");
        

        };

        return val;

    }
}