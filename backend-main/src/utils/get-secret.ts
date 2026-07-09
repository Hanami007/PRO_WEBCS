import { readFileSync, existsSync } from 'fs';

export function getSecret(key: string): string | undefined {
  const filePath = process.env[`${key}_FILE`];

  if (filePath && existsSync(filePath)) {
    return readFileSync(filePath, 'utf8').trim();
  }

  return process.env[key];
}
