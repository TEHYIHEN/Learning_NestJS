import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';



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

   async login(userId:number){

        // const payload: AuthJwtPayload = {
        //     sub: userId
        // }
        // //return this.jwtService.sign(payload)
        // const token = this.jwtService.sign(payload);  //module 那边默认了， 所以不像下面代码放(payload, this.refreshTokenConfig)
        // const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig);

        //有个generateTokens后更新以下代码
        const {accessToken, refreshToken} = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        

        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }

    async generateTokens(userId: number){
        const payload: AuthJwtPayload = {
            sub: userId
        }

        const [accessToken, refreshToken] = await Promise.all([

            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig),

        ])

        return {
            accessToken,
            refreshToken
        }
    }

    // refreshToken(userId:number){
        
    //     const payload: AuthJwtPayload = {
    //         sub: userId
    //     }
        
    //     const token = this.jwtService.sign(payload);
    //     return {
    //         id: userId,
    //         token
    //     }

    // }

    //refresh token rotation
    //same code as login function but this function more secure and guarded.
    async refreshToken(userId:number){

        const {accessToken, refreshToken} = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        

        return {
            id: userId,
            accessToken,
            refreshToken
        }

    }

    async validateRefreshToken(userId:number, refreshToken:string){

        //查找数据库是否有用户
        const user = await this.userService.findOne(userId);

        if(!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException("Invalid Refresh Token");
        }

        const refreshTokenMatches = await argon2.verify(
            user.hashedRefreshToken,
            refreshToken
        );

        if(!refreshTokenMatches) {throw new UnauthorizedException("Invalid Refresh Token")};

        return {id: userId}

    }
    // clear the refresh token after signOut
    async signOut(userId: number){

        await this.userService.updateHashedRefreshToken(userId, null);

    }

    async validateJwtUser(userId:number){

        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException("User not found!");
        const currentUser:CurrentUser = { id: user.id, role: user.role };
        return currentUser;

    }

}


    //if oneday login with different device, we have open entitiy add a deviceID to get diffrent hash token

    // async login(userId: number, deviceId: string) {
    //     const { accessToken, refreshToken } = await this.generateTokens(userId);
    //     const hashedRefreshToken = await argon2.hash(refreshToken);

    //     // 🏃 这里变成“新增”记录，而不是“覆盖”
    //     await this.sessionRepo.save({
    //         user: { id: userId },
    //         hashedRefreshToken,
    //         deviceId
    //      });

    // return { accessToken, refreshToken };
    // }

//     @Entity()
//     export class Session {
//         @PrimaryGeneratedColumn()
//         id: number;

//         @Column()
//         hashedRefreshToken: string;

//         @Column()
//         deviceId: string; // 用来区分是手机还是电脑

//         @ManyToOne(() => User, (user) => user.sessions)
//         user: User;
// }


