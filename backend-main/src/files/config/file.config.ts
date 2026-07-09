import { registerAs } from '@nestjs/config';
import { FileConfig } from './file-config.type';

export default registerAs<FileConfig>('file', () => {
  return { path: 'files' };
});
