import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../types/AccessTokenPayload';
import { Request } from 'express';
import { AllConfigType } from 'src/config/config.types';
import { UsersService } from 'src/users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';

const cookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
    return req.cookies['access_token'];
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<AllConfigType>,
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('auth.secret', { infer: true }),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const [user, session] = await Promise.all([
      this.usersService.findOne(payload.id),
      this.sessionsService.findOne({ id: payload.sessionId }),
    ]);

    if (!user || !session) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      sessionId: payload.sessionId,
    };
  }
}
