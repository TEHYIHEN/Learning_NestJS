import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth.jwtPayload";
import refreshJwtConfig from "../config/refresh-jwt.config";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt"){

    constructor(
        @Inject(refreshJwtConfig.KEY)
        //put this.refreshJwtConfiguration in validate, then it will light up.
        //dont worry, it wont affect the result
         private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>
        
    
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //secretOrKey: process.env.JWT_SECRET as string, 
            secretOrKey: refreshJwtConfiguration.secret as string,
            ignoreExpiration: false,
        })
    }
        
    validate(payload: AuthJwtPayload){

        return {id:payload.sub}
    }
    
}