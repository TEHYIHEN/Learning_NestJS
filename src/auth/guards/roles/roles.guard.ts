import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    
    const requirendRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [


      /*
      Inside the @Controller

      @Delete()
      @Roles(Role.USER)
      */
      context.getHandler(), //1. 先看方法（Method）上的标签

      /*
      @Roles(Role.Admin)
      @Controller("user")
      */
      context.getClass(),  //2. 再看类（Controller）上的标签

    ]);

    const user = context.switchToHttp().getRequest().user;
    //.some method checks if at least one element in an array passes a specific test
    const hasRequireRole = requirendRoles.some(role => user.role === role);

    return hasRequireRole;

  }
}
