import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    //extra guard service can put here
    //example: do the user isBanned?

    constructor(private reflector: Reflector){
        super(); //call to initialize the parent logic.

        //📌why role.guard.ts no need super()? becos roleguard dont have extends from parent
    }
    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{

    //     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [

    //         context.getHandler(),
    //         context.getClass()

    //     ]);

    //     if(isPublic) {return true};

    //     return super.canActivate(context);

    // }

     async canActivate(context: ExecutionContext): Promise<boolean>{

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [

            context.getHandler(),
            context.getClass()

        ]);

        try {

            if(isPublic) {return true};

            const result = await super.canActivate(context);

            return result as boolean;


        } catch (error) {
            
            throw new UnauthorizedException("Unauthorized");
        }
    }
}
