import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('My docs')
    .setDescription('docs description')
    .setVersion('1.0')
    .addBearerAuth({
      bearerFormat: 'JWT',
      in: 'header',
      scheme: 'bearer',
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  const port = 5300;
  const host = 'localhost';
  await app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
    console.log(`Swagger is running on http://${host}:${port}`);
  });
}

void bootstrap();
