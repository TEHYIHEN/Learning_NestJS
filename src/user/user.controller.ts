import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Roles(Role.USER) //全局默认可以使用
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }


  @UseGuards(JwtAuthGuard) //use guard to authenticate JWT
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }
 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

//@SetMetadata("role", [Role.ADMIN]) //put in roles.decoratos.ts
  @Roles(Role.ADMIN) //加了这个，USER就不可以使用
  //@UseGuards(JwtAuthGuard, RolesGuard) //Jwt 在左边先执行 //why hidden, because put global guard at auth.module.ts
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
