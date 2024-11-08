import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagResDto } from './model/res/tag.res.dto';
import { TagMapper } from './service/tag.mapper';
import { TagService } from './service/tag.service';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopularsTags(): Promise<TagResDto[]> {
    const result = await this.tagService.getPopularsTags();
    return TagMapper.toResListDto(result);
  }
}
