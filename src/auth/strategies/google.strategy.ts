import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, StrategyOptions } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import type { ConfigType } from "@nestjs/config";
import { VerifiedCallback, VerifyCallback } from "passport-jwt";
import { AuthService } from "../auth.service";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService
    ){

        super({

            clientID: googleConfiguration.clinetID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope:["email","profile"]

        } as StrategyOptions); // put as StrategyOption to avoid/accept undefined.
        //or put || "" behind the googleConfiguration.clinetID
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback){

        console.log({profile});
        try{
        const user = await this.authService.validateGoogleUser({
                //all of this came from create-user.dto.ts
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                avatarUrl: profile.photos[0].value,
                password:"",

        });
        //return user //we can use only this more simple. but have to remove "done: VerifiedCallback"
        done(null,user);
        } catch (err) {

            done(err,false);
        }
        
    }
}