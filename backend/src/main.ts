import * as dotenv from 'dotenv';
dotenv.config();

import * as dns from 'dns';
// ponytail: Set public DNS servers to fix querySrv ECONNREFUSED on Node.js/Windows
dns.setServers(['8.8.8.8', '1.1.1.1']);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


