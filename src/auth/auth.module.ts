import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import {JwtModule} from '@nestjs/jwt'
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.stragegy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    //   secret:"",
    //   signOptions:{
    //     expiresIn:"1d"  // define JWT expired time.
    //   }
    // })
    JwtModule.registerAsync(jwtConfig.asProvider()), //default jwt for whole auth
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    LocalStrategy, 
    JwtStrategy, 
    RefreshJwtStrategy,
    //order 1st was JwtAuthGuard , then RolesGuard
    //check identity 1st , then check role authorization
    {
      provide: "APP_GUARD", // register a Global Guard/全局守卫
      //telling NestJS to apply the JwtAuthGuard to every single controller and route in the entire application by default
      useClass: JwtAuthGuard //具体的执行逻辑请使用这个类 @UseGuards(JwtAuthGuard) applied on all API endpoint
    },
    {
      provide:"APP_GUARD",
      useClass: RolesGuard
    },
  
  ],
})
export class AuthModule {}

/*
📌📌
"When we register a guard using the APP_GUARD token, NestJS treats it as a 'plug-in' 
for the entire application. We don't need to manually link it because NestJS automatically 
injects this guard into the request pipeline for every controller, 
including the UserController, user.controller.ts."
(当我们使用 APP_GUARD 令牌注册守卫时，NestJS 将其视为整个应用程序的“插件”。我们不需要手动链接它，
因为 NestJS 会自动将此守卫注入到每个控制器（包括 UserController）的请求管道中。)

// app.module.ts
@Module({
  imports: [AuthModule, UserModule], // 只要这里引了 AuthModule，全局守卫就生效
})
export class AppModule {}
*/
