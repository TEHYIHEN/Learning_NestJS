import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './custompipes/parseIdppipe';
import { ZodValidationPipe } from './custompipes/zodValidationPipe';
import { createPropertySchema, type CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './custompipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Controller('property')
export class PropertyController {
    // propertyService: PropertyService;
    // constructor(){
    //     this.propertyService = new PropertyService();
    // }
    constructor(private propertyService: PropertyService) //官方认证
    {}


    @Get()
    findAll(){
        //return "All Properties";
        this.propertyService.findAll();
    }

    @Get(":id")
    //@Param get the "id" from URL, and pass "id" to specific function for get data in database
    // ParseIntPipe for make sure the request was integer, if not then error 400 Bad request
    /* 
        @Query use for check parameter with a symbol "?" behind URL.
        Example:
        /property/:id?sort=true
    */
    findOne(
        @Param("id", ParseIntPipe) id: number,
        //@Query("sort", ParseBoolPipe) sort
    ){ 

        // console.log(typeof id); //test type in console
        // console.log(typeof sort);
        return this.propertyService.findOne(id);


        //Mock Database
        // if(id === "1"){
        //     return {id: "1", title: "Google", status: "Active"}
        // }else if ( id === "2")
        //     return {id: "2", title: "Facebook", status: "Active"}

        //     return { message : "ID not found"}
        return id;
    }

    // @Get(":company/:ceo")
    // findCeo(
    //     @Param("company") cID: string,
    //     @Param("ceo") ceoID: string
    // ){
    //     return `Company was ${cID} and CEO was ${ceoID}.`

    // }



    /*
    Testing with the example in Postman - body Tab

    {
        "name": "teh",
        "id": 1
    }
    */


    // @Post()
    // create(@Body() body){
    //     return body;

    // }        --> result same as { "name": "teh", "id": 1}

    // @Post()
    // @HttpCode(204)   //to show status code, normal they have default value, example GET = 200. POST = 201
    // create(@Body("name") name){
    //     return name;

    // }               // --> result only have teh

    @Post()
    /* @UsePipes(new ValidationPipe())  用来检查class validator (example: @IsString) 进来的数据
        whitelist:true                 过滤并删除掉前端传了没定义type的数据
        forbidNonWhitelisted:true      直接拦下数据，bad request 400


        📌📌📌直接在 main.ts，保留全局基础安检📌📌📌
        async function bootstrap() {
            const app = await NestFactory.create(AppModule);
        --> app.useGlobalPipes(new ValidationPipe()); // 👈 全局保安，省心省力
            await app.listen(3000);

            用在其他Controller的 @UsePipes(new ValidationPipe())是针对性加强条件。
            用在module.ts的 providers:[{ provide: APP_PIPE , useclass: xxx }], 是配合@Injectable()注入的service(也就是service.ts里面的代码)
}
    */
    @UsePipes(new ValidationPipe({whitelist: true }))
    create(@Body() dto: CreatePropertyDto){

        //return body;
        return this.propertyService.create(dto);

    }


    // @Patch(":id")
    // update(@Body(new ValidationPipe({ //另一种写法直接写在@Body, 不推荐，用@Usepipes就好

    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     groups: ["update"],
    //     always: true,   //  always:true 代表不只是检查groups的数据，还要检查其他class validator。 没有放always:true ，它会skip掉其他class validator


    // })) body:CreatePropertyDto){

    //     return body;

    // }

    // @Patch(":id")
    // @UsePipes(new ValidationPipe({

    //     whitelist:true,
    //     transform:true,     //  --> 自动转换type,例如输入 26，就是number
    //     // transformOptions:{
    //     //     enableImplicitConversion: true   //--> 用这个， IdParamDto就不需要放@Type，📌做了实验结果，有没有它都没关系，但没有@Type过不了。
    //     // } 
    // }))
    // updatename(
    //     @Param() param: IdParamDto, //检查 :id 的条件, 和上面的@GET section一样，学一样就好  #注意这里idParam.dto.ts要放@Type
    //     @Body()
    //     body: CreatePropertyDto
    
    // ){
    //     console.log(typeof param.id);
    //     return body;

    // }

    // @Patch(":id")
    // @UsePipes(new ValidationPipe({

    //     whitelist:true,
    //     transform:true,
        
    // }))
    // update(
    //     @Param("id", ParseIdPipe) id,
    //     @Body()
    //     body: CreatePropertyDto

    // ){
    //     console.log(typeof id)
    //     return body;
    // }

    @Patch(":id")
    @UsePipes(new ValidationPipe({

        whitelist:true,
        transform:true,
        
    }))
    update(
        @Param("id", ParseIdPipe) id: number,
        @Body()
        body: UpdatePropertyDto,
        /*
             @Headers 可以查看访问者的信息，获取 HTTP 请求头（Request Headers）中的数据
             例如:
             user-agent  浏览器 / 设备信息
             authorization 登录 token
             accept-language 用户语言
        */
        //@Headers("host") header: HeadersDto, 
        
        @RequestHeader(HeadersDto) header: HeadersDto,
        
    ){
        //return header;
        return this.propertyService.update(id, body);
    }


    @Post(":id")
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    createID(
        @Body() body: CreatePropertyZodDto,
    ) {
        return body;
    }

    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number){
        return this.propertyService.delete(id);
    }

}







/*
📌📌📌 UnderStand the fundatamental📌📌📌

@Get     =  Read(读取)(查)        =   给我看URL里面有什么Query/Param
@Post    =  Create(创建)(增加)    =   给我存入新data from request Body
@Patch   =  Update partially(补)  =   给我换其中一个data from request Body
@Put     =  Update fully(换)       =   给我换全部data from request Body
@Delete  =  Delete                =   给我删掉它(Query/Param)



/property/24/name?id=2
以上URL,什么是route, param, query?

property  = route
24        = param
name      = route
?id=2     = query


*/