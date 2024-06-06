import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbService } from './database/db.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Initialize the database connection

  const config = new DocumentBuilder()
    .setTitle('Nest CRUD Application')
    .setDescription('Basic CRUD application using NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const dbService = app.get(DbService);
  await dbService.onModuleInit();
  await app.listen(3000);
}

bootstrap();
