import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../common/constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const role: Role = this.reflector.get<Role>('role', context.getHandler());
    if (!role) return true;
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    /* const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role));
    if (user && user.roles && hasRole()) return true; */
    throw new UnauthorizedException(
      `User ${user.name} does not have permissions for this action`,
    );
  }
}
