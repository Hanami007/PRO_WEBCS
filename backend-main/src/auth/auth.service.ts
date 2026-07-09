import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { SessionsService } from 'src/sessions/sessions.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.types';
import * as ms from 'ms';
import { AccessTokenPayload } from './types/AccessTokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sessionsService: SessionsService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(
    user: User,
    data?: { ip?: string; userAgent?: string },
  ): Promise<AccessToken> {
    const session = await this.sessionsService.create({
      user,
      hash: '', // We can store a hash of the refresh token if needed for extra security
      ip: data?.ip,
      userAgent: data?.userAgent,
    });

    return this.getTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role?.name,
      sessionId: session.id,
    });
  }

  async refresh(data: {
    sessionId: string;
    hash?: string;
  }): Promise<AccessToken> {
    const session = await this.sessionsService.findOne({ id: data.sessionId });

    if (!session) {
      throw new UnauthorizedException();
    }

    return this.getTokens({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role?.name,
      sessionId: session.id,
    });
  }

  async logout(data: { sessionId: string }): Promise<void> {
    await this.sessionsService.softDelete({ id: data.sessionId });
  }

  async logoutOthers(data: {
    userId: string;
    sessionId: string;
  }): Promise<void> {
    await this.sessionsService.softDelete({
      user: { id: data.userId },
      excludeId: data.sessionId,
    });
  }

  async getSessions(user: User) {
    return this.sessionsService.findMany({ user: { id: user.id } });
  }

  private async getTokens(payload: AccessTokenPayload): Promise<AccessToken> {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      }),
      this.jwtService.signAsync(
        { sessionId: payload.sessionId },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
      tokenExpires,
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('ไม่พบผู้ใช้งาน');
    }

    const isMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('รหัสผ่านปัจจุบันไม่ถูกต้อง');
    }

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      salt,
    );

    await this.usersService.updatePassword(userId, hashedNewPassword);

    return { message: 'เปลี่ยนรหัสผ่านสำเร็จ' };
  }
}
