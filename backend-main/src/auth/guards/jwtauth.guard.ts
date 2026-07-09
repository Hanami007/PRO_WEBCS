import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AccessTokenPayload } from '../types/AccessTokenPayload';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = AccessTokenPayload>(
    err: Error,
    user: TUser | null,
    info: Error,
    context: ExecutionContext,
  ): TUser | null {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const hasToken = !!request.cookies?.['access_token'];

    if (user) {
      this.logger.debug(
        `User authenticated successfully: ${user || 'Unknown ID'}`,
      );
      return user;
    }

    if (hasToken && !user) {
      this.logger.warn(
        `Invalid or expired token detected. Rejecting request. Info: ${info?.message}`,
      );
      throw new UnauthorizedException(
        info?.message || 'Session expired or invalid',
      );
    }

    if (isPublic) {
      this.logger.debug('No token found on public route. Proceeding as guest.');
      return null;
    }

    this.logger.warn(
      'Unauthorized access attempt on private route (No token).',
    );
    throw err || new UnauthorizedException();
  }
}
