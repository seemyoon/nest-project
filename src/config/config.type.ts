export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AWSConfig;
  sentry: SentryConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};
export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};
export type AWSConfig = {
  accessKey: string;
  secretKey: string;
};
export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
