import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Явного $connect нет: Prisma подключится при первом запросе, и приложение поднимется
// даже без БД, например для генерации контракта. Состояние базы видно в GET /api/health.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
