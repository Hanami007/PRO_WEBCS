import { AuthConfig } from 'src/auth/config/auth-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { AppConfig } from './app-config.type';
import { FileConfig } from 'src/files/config/file-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  file: FileConfig;
};
