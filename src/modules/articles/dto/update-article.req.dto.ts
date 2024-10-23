import { PartialType } from '@nestjs/mapped-types';

import { CreateArticleReqDto } from './create-article.req.dto';

export class UpdateArticleReqDto extends PartialType(CreateArticleReqDto) {}
