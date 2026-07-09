export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain?: string;
  domain: string;
  port: number;
  apiPrefix: string;
};
