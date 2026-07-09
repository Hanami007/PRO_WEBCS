import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { Response, CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.types';
import * as ms from 'ms';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth (เข้าสู่ระบบ/สมัครสมาชิก)')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'เข้าสู่ระบบ (Login)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'อีเมลผู้ใช้',
          example: 'admin@example.com',
        },
        password: {
          type: 'string',
          description: 'รหัสผ่าน',
          example: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login สำเร็จ',
    schema: { example: { message: 'Logged in successfully' } },
  })
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto | BadRequestException> {
    const { access_token, refresh_token, tokenExpires } =
      await this.authService.login(req.user, {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      });

    this.logger.log(`User logged in: ${req.user.email} (IP: ${req.ip})`);

    this.setAuthCookies(response, access_token, refresh_token, tokenExpires);

    return { message: 'Logged in successfully' };
  }

  private setAuthCookies(
    response: Response,
    access_token: string,
    refresh_token: string,
    tokenExpires: number,
  ) {
    const refreshExpires = this.configService.getOrThrow(
      'auth.refreshExpires',
      {
        infer: true,
      },
    );

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    };

    if (process.env.DOMAIN) {
      cookieOptions.domain = process.env.DOMAIN;
    }

    response.cookie('access_token', access_token, {
      ...cookieOptions,
      maxAge: tokenExpires - Date.now(),
    });

    response.cookie('refresh_token', refresh_token, {
      ...cookieOptions,
      maxAge: ms(refreshExpires),
    });
  }

  @Post('logout')
  @ApiOperation({ summary: 'ออกจากระบบ (Logout)' })
  @ApiResponse({
    status: 200,
    description: 'Logout สำเร็จ',
    schema: { example: { message: 'Logged out successfully' } },
  })
  async logout(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const sessionId = req.user?.sessionId;
    if (sessionId) {
      this.logger.log(
        `User logging out: ${req.user?.email || 'Unknown'} (Session: ${sessionId})`,
      );
      await this.authService.logout({ sessionId });
    }

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    };

    if (process.env.DOMAIN) {
      cookieOptions.domain = process.env.DOMAIN;
    }

    response.clearCookie('access_token', cookieOptions);
    response.clearCookie('refresh_token', cookieOptions);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiResponse({
    status: 200,
    description: 'Refresh สำเร็จ',
  })
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { access_token, refresh_token, tokenExpires } =
      await this.authService.refresh({
        sessionId: req.user.sessionId,
      });

    this.logger.debug(
      `Token refreshed for user: ${req.user.email || 'ID:' + req.user.id} (Session: ${req.user.sessionId})`,
    );

    this.setAuthCookies(response, access_token, refresh_token, tokenExpires);
  }

  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้ปัจจุบัน (Get Me)' })
  @ApiResponse({
    status: 200,
    description: 'ข้อมูล Profile',
    schema: {
      example: {
        data: {
          id: 'uuid-user-1234',
          email: 'test@example.com',
          role: 'user',
          name: 'John Doe',
        },
      },
    },
  })
  async getMe(@Req() req) {
    return {
      data: req.user,
    };
  }

  @ApiBearerAuth()
  @Get('sessions')
  @ApiOperation({ summary: 'List all active sessions' })
  async getSessions(@Req() req) {
    const sessions = await this.authService.getSessions(req.user);
    return sessions.map((session) => {
      session.isCurrent = session.id === req.user.sessionId;
      return session;
    });
  }

  @ApiBearerAuth()
  @Post('logout-others')
  @ApiOperation({ summary: 'Log out from all other devices' })
  async logoutOthers(@Req() req) {
    await this.authService.logoutOthers({
      userId: req.user.id,
      sessionId: req.user.sessionId,
    });
    return { message: 'Logged out from other devices' };
  }

  @ApiBearerAuth()
  @Post('changepassword')
  @ApiOperation({ summary: 'เปลี่ยนรหัสผ่าน' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'เปลี่ยนรหัสผ่านสำเร็จ',
    schema: { example: { message: 'เปลี่ยนรหัสผ่านสำเร็จ' } },
  })
  @ApiResponse({
    status: 400,
    description: 'รหัสผ่านปัจจุบันไม่ถูกต้อง',
    schema: {
      example: {
        message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(
      req.user.id,
      changePasswordDto,
    );
  }
}
