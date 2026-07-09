import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const url = ctx.getRequest<Request>().url;

    // When a 401 occurs, we clear the access_token to break login loops
    response.clearCookie('access_token', {
      path: '/',
    });

    // We only clear the refresh_token if the error occurred on the refresh endpoint itself
    // This allows the frontend to use the refresh_token to get a new access_token
    if (url.includes('/auth/refresh')) {
      response.clearCookie('refresh_token', {
        path: '/',
      });
    }

    response.status(status).json(exception.getResponse());
  }
}
