import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { LocalizedTextDto, LocalizedTextInput } from '../../../common/i18n/localized.dto';

// Показатель в блоке «Обо мне». В публичном ответе подпись уже переведена.
export class ProfileHighlightDto {
  @ApiProperty({ description: 'значение показателя, напр. "3+" или "C1"' })
  value: string;

  @ApiProperty({ description: 'подпись показателя (локализована)' })
  label: string;
}

// Для админки подпись нужна сразу на обоих языках.
export class ProfileHighlightAdminDto {
  @ApiProperty()
  value: string;

  @ApiProperty({ type: () => LocalizedTextDto })
  label: LocalizedTextDto;
}

export class ProfileHighlightInput {
  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty({ type: () => LocalizedTextInput })
  @ValidateNested()
  @Type(() => LocalizedTextInput)
  label: LocalizedTextInput;
}
