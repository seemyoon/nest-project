import { ObjectCannedACL } from '@aws-sdk/client-s3';

export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AWSConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
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
  region: string;
  bucket_name: string;
  ACL: ObjectCannedACL;
  endpoint: string;
};
export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpireIn: number;
  refreshSecret: string;
  refreshExpireIn: number;
};
