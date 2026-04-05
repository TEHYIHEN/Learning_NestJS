import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const ROLES_KEY = "roles";
//export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


//Non-empty Tuple , at least 1 Role , cannot be null.
//i choose this one to learn new Typescript and more safety to avoid no any access/authorize in the @Roles()
export const Roles = (...roles: [Role, ...Role[]]) => SetMetadata(ROLES_KEY, roles);