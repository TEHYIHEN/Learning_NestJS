import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import { id } from 'zod/v4/locales';


/*
Use to confirm/validate the email and password correct
*/
@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,

        @Inject(refreshJwtConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ){}

    async validateUser(
        email: string,
        password: string
    ){
        const user = await this.userService.findByEmail(email);

        // console.log('1. Postman 传来的明文密码:', password);
        // console.log('2. 数据库查出来的对象:', user);

        if(!user) throw new UnauthorizedException("User not found!");

        const isPasswordMatch = await compare(password, user.password);
        if(!isPasswordMatch) throw new UnauthorizedException("Invalid password!");

        return {id: user.id};
        
    }

    login(userId:number){

        const payload: AuthJwtPayload = {
            sub: userId
        }
        //return this.jwtService.sign(payload)
        const token = this.jwtService.sign(payload);  //module 那边默认了， 所以不像下面代码放(payload, this.refreshTokenConfig)
        const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig);

        return {
            id: userId,
            token,
            refreshtoken
        }
    }

    refreshToken(userId:number){
        
        const payload: AuthJwtPayload = {
            sub: userId
        }
        
        const token = this.jwtService.sign(payload);
        return {
            id: userId,
            token
        }

    }
}

