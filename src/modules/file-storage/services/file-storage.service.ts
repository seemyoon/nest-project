import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { AWSConfig, Config } from '../../../config/config.type';
import { LoggerService } from '../../logger/logger.service';
import { FileTypeEnum } from '../enum/file-type.enum';

@Injectable()
export class FileStorageService {
  private readonly awsConfig: AWSConfig;
  private readonly s3Client: S3Client;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.awsConfig = this.configService.get<AWSConfig>('aws');
    this.s3Client = new S3Client({
      forcePathStyle: true,
      endpoint: this.awsConfig.endpoint,
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKey,
        secretAccessKey: this.awsConfig.secretKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    fileType: FileTypeEnum,
    userId: UserID,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(fileType, userId, file.originalname);
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.bucket_name,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: this.awsConfig.ACL,
        }),
      );
      return filePath;
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucket_name,
          Key: filePath,
        }),
      );
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  private buildPath(
    fileType: FileTypeEnum,
    userId: UserID,
    fileName: string,
  ): string {
    return `${fileType}/${userId}/${randomUUID()}${path.extname(fileName)}`;
  }
}
