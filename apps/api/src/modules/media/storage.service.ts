import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const UPLOAD_DIR_DEFAULT = 'uploads';
const PUBLIC_PREFIX = '/uploads';

// Пока файлы лежат на локальном диске. Наружу торчат только save/remove по публичному URL,
// так что переезд на S3 не затронет вызывающий код.
@Injectable()
export class StorageService {
  private readonly dir: string;

  constructor(config: ConfigService) {
    this.dir = resolve(config.get<string>('UPLOAD_DIR') ?? UPLOAD_DIR_DEFAULT);
  }

  async save(buffer: Buffer, ext: string): Promise<string> {
    await mkdir(this.dir, { recursive: true });
    const name = `${randomUUID()}.${ext}`;
    await writeFile(join(this.dir, name), buffer);
    return `${PUBLIC_PREFIX}/${name}`;
  }

  // Чужие URL и пути с попыткой выйти из каталога просто пропускаем.
  async remove(url: string): Promise<void> {
    if (!url.startsWith(`${PUBLIC_PREFIX}/`)) return;
    const name = url.slice(PUBLIC_PREFIX.length + 1);
    if (name.length === 0 || name.includes('/') || name.includes('..')) return;
    try {
      await unlink(join(this.dir, name));
    } catch {
      // Файла уже нет, для удаления это нормально.
    }
  }
}
