import { Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Request as ExpressRequest} from 'express'; //have 2 same Request, so i rename it as ExpressRequest

interface RequestWithUser extends ExpressRequest {
  user:{
    id:number
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) //if succes login, would be 200 OK , witout this was default 201 created
  /*
  @UseGuards(AuthGuard("local"))
  可以用这个,也可以用下面那个，开了一个 local-auth.guard.ts
  seperate to make people understand the part clearly
  */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) { //@Request is same meaning as @Req

    ///const token = this.authService.login(req.user.id);

    //return req.user;
    ///return {id: req.user.id, token}
    return await this.authService.login(req.user.id);
  }
  
  //
  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  async refreshToken(@Req() req: RequestWithUser) {
    return await this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("signout")
  async signOut(@Req() req: RequestWithUser){
    return await this.authService.signOut(req.user.id);
  }


}
