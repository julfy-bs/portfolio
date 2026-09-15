import { DocumentBuilder } from '@nestjs/swagger';

// Один конфиг и для /api/docs, и для генератора контракта, чтобы контракт не разошёлся с API.
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Portfolio API')
  .setDescription(
    'Console Portfolio backend. The OpenAPI document is the contract: frontend types are generated from it.',
  )
  .setVersion('0.0.0')
  .addCookieAuth('access_token')
  .build();
