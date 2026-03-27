import { IsEmail, IsOptional, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    firstName!:string;

    @IsString()
    lastName!:string;

    @IsString()
    @IsEmail()
    email!:string;

    @IsString()
    @MinLength(8, {message:"Password need at least 8 characters"})
    //@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/, {message:"密码必须同时包含大写字母、小写字母、数字和特殊符号 "})
    /*  
    (?=.*[a-z])：检查是否包含至少一个小写字母。
    (?=.*[A-Z])：检查是否包含至少一个大写字母。
    (?=.*\d)：检查是否包含至少一个数字。
    (?=.*[符号集])：检查是否包含至少一个特殊符号。
    [A-Za-z\d符号集]{8,}：定义允许出现的总字符集及最小长度。
    */
   @Matches(/[A-Z]/, {message:"Password need at least one uppercase letter"})
   @Matches(/[a-z]/, {message:"Password need at least one lowercase letter"})
   @Matches(/[0-9]/, {message:"Password need at least one number"})
   //@Matches(/[^a-zA-Z0-9]/, {message:"Password need at least one special character"}) //甚至包括了空格、特殊标点、甚至是表情符号（Emoji）
   @Matches(/[!@#$%^&*(),.?":{}|<>]/, {message:"Password need at least one special character"})
    password!:string;

    @IsString()
    @IsUrl()
    @IsOptional()
    avatarUrl?:string;


}
