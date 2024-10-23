import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { Config, SentryConfig } from '../../config/config.type';

@Injectable()
export class LoggerService {
  private readonly isLocal: boolean;
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService<Config>) {
    const sentryConfig = this.configService.get<SentryConfig>('sentry');
    Sentry.init({
      dsn: sentryConfig.dsn,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  }

  public log(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'log');
    }
  }

  public info(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'info');
    }
  }

  public warning(message: string) {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'warning');
    }
  }

  public error(error: any) {
    if (this.isLocal) {
      this.logger.log(error);
    } else {
      Sentry.captureException(error, { level: 'error' });
    }
  }
}
