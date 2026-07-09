import {
  Injectable,
  ExecutionContext,
  ClassSerializerInterceptor,
  ClassSerializerContextOptions,
  Logger,
} from '@nestjs/common';

@Injectable()
export class RoleSerializerInterceptor extends ClassSerializerInterceptor {
  private readonly logger = new Logger(RoleSerializerInterceptor.name);

  getContextOptions(
    context: ExecutionContext,
  ): ClassSerializerContextOptions | undefined {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role?.name || 'guest';

    const defaultOptions = super.getContextOptions(context) || {};

    this.logger.debug(request.user);
    this.logger.debug(`Applying serialization groups: [${userRole}]`);

    return {
      ...defaultOptions,
      groups: [userRole],
    };
  }
}
