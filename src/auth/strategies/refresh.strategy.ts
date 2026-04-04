import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth.jwtPayload";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt"){

    constructor(
        @Inject(refreshJwtConfig.KEY)
        //put this.refreshJwtConfiguration in validate, then it will light up.
        //dont worry, it wont affect the result
         private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
         private authService: AuthService
        
    
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //secretOrKey: process.env.JWT_SECRET as string, 
            secretOrKey: refreshJwtConfiguration.secret as string,
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }
        
    validate(req: Request ,payload: AuthJwtPayload){

        // const refreshToken = req.get("authorization")?.replace("Bearer", "").trim();
        // const userId = payload.sub;
        
        // //return {id:payload.sub}
        // return this.authService.validateRefreshToken(userId, refreshToken as string);
        
        //最后我选择用这个因为不必放refreshToken as string强行换类型。
        const authHeader = req.get("authorization"); // get(name:string) : string | undefined
        //if undefined, throw error
        //if yes, pass string data
        //这里排除了undefined,所以下面的refreshToken没有报错，因为string | undefined
        if (!authHeader) {
            throw new UnauthorizedException("authHeader not a string");
        }

        const refreshToken = authHeader?.replace("Bearer", "").trim();
        const userId = payload.sub;

        return this.authService.validateRefreshToken(userId, refreshToken);
    
    }
    
}