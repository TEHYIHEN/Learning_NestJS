import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

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
  async login(@Request() req: any) {

    return req.user;
  }

}
