import { registerAs } from '@nestjs/config';
import {
  ValidateIf,
  IsString,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { DatabaseConfig } from './database-config.type';
import { getSecret } from 'src/utils/get-secret';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DB_URL)
  @IsString()
  DB_URL: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_TYPE: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_HOST: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_NAME: string;

  @ValidateIf((envValues) => !envValues.DB_URL)
  @IsString()
  DB_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  DB_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  DB_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  DB_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  DB_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  DB_CA: string;

  @IsString()
  @IsOptional()
  DB_KEY: string;

  @IsString()
  @IsOptional()
  DB_CERT: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  const configValues = {
    ...process.env,
    DB_USERNAME: getSecret('DB_USERNAME'),
    DB_PASSWORD: getSecret('DB_PASSWORD'),
  };

  validateConfig(configValues, EnvironmentVariablesValidator);

  return {
    isDocumentDatabase: ['mongodb'].includes(process.env.DB_TYPE ?? ''),
    url: process.env.DB_URL,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    password: configValues.DB_PASSWORD,
    name: process.env.DB_NAME,
    username: configValues.DB_USERNAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    maxConnections: process.env.DB_MAX_CONNECTIONS
      ? parseInt(process.env.DB_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: process.env.DB_SSL_ENABLED === 'true',
    rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.DB_CA,
    key: process.env.DB_KEY,
    cert: process.env.DB_CERT,
  };
});
