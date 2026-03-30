import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';


/*
Use to confirm/validate the email and password correct
*/
@Injectable()
export class AuthService {

    constructor(
        private userService: UserService
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

    
}

