import { registerAs } from "@nestjs/config";
import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";
import { AnyCaaRecord } from "dns";

export default registerAs("refresh-jwt" ,(): JwtSignOptions => ({
    
    //pay attention here
    //refresh-jwt dont have signinOption, not same as jwt.config
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: "7d" ,

}));

