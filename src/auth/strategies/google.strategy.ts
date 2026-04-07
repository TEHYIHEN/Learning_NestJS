import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, StrategyOptions } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import type { ConfigType } from "@nestjs/config";
import { VerifyCallback } from "passport-jwt";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(
        @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>
    ){

        super({

            clientID: googleConfiguration.clinetID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope:["email","profile"]

        } as StrategyOptions);
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback){

        console.log({profile});
    }
}