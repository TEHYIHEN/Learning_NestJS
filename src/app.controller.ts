import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()                   // --> url就是  / 而已 ,refer at btm.
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()                    
  getHello(): string {
    //return this.appService.getHello(); //result = "Hello Word"
    //💩return this.configService.get('dbconfig.dev.type'); //when search localhost:3000/ using GET method, result will be postgre
    return this.configService.get<string>('database.port') ?? "Please check the configService in controller";  //result will be 5432
  }
}


//Controller是负责接收客户端发来的 HTTP 请求,并将这些请求分发给对应的处理逻辑.
//Controller handle incoming HTTP requests and return responses to the client.

/* 

@Controller("users")          -->这里负责的路径(url)就是 /users , /users/any
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("all")                 -->这里负责的路径就是  /users/all
  getHello(): string {
    return this.appService.getHello();
  }

*/

/* @Controller({
          path: "user"
          host: "teh.example.com"   // results will be teh.example.com/user

})                   // --> url就是  / 而已
export class AppController {
  constructor(private readonly appService: AppService) {} */