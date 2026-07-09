import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { AuthConfig } from './auth-config.type';
import * as ms from 'ms';
import { getSecret } from 'src/utils/get-secret';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  const configValues = {
    ...process.env,
    AUTH_JWT_SECRET: getSecret('AUTH_JWT_SECRET'),
    AUTH_REFRESH_SECRET: getSecret('AUTH_REFRESH_SECRET'),
  };

  validateConfig(configValues, EnvironmentVariablesValidator);

  return {
    secret: configValues.AUTH_JWT_SECRET,
    expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN as ms.StringValue,
    refreshSecret: configValues.AUTH_REFRESH_SECRET,
    refreshExpires: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
  };
});
