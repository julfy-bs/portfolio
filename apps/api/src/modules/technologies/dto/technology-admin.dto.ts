import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

// name у технологий не переводится, это просто название вроде React.
export class TechnologyAdminDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, nullable: true })
  category: string | null;

  @ApiProperty()
  order: number;
}

export class CreateTechnologyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  // order бывает дробным и отрицательным: при перетаскивании админка ставит запись
  // между соседями или перед первой, не перенумеровывая остальные.
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class UpdateTechnologyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  // order бывает дробным и отрицательным: при перетаскивании админка ставит запись
  // между соседями или перед первой, не перенумеровывая остальные.
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;
}
