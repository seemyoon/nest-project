import { forwardRef, Module } from '@nestjs/common';

import { ArticlesModule } from '../articles/articles.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => ArticlesModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
