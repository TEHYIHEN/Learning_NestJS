import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { AnyCaaRecord } from "dns";

export default registerAs("jwt" ,(): JwtModuleOptions => ({

    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: "1d" ,
    },

}));

