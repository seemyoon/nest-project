import { forwardRef, Module } from '@nestjs/common';

import { ArticlesModule } from '../articles/articles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => ArticlesModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
