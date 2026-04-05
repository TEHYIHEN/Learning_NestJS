import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth.jwtPayload";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @Inject(jwtConfig.KEY)
        //put this.jwtConfiguration in validate, then it will light up.
        //dont worry, it wont affect the result
         private jwtConfiguration: ConfigType<typeof jwtConfig>,
         private authService: AuthService,
        
    
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //secretOrKey: process.env.JWT_SECRET as string, 
            secretOrKey: jwtConfiguration.secret as string,
            ignoreExpiration: false,
        })
    }
        
    validate(payload: AuthJwtPayload){

        //return {id:payload.sub}
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    
    


    }
    
}