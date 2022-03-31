import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Уникальный почтовый ящик', required: true })
  @IsString({message: 'Должно быть строкой / Should be a string'})
  @IsEmail({}, {message: 'Введен email некорректного формата / Incorrect email format has been entered'})
	readonly email: string
  @ApiProperty({ example: 'password', description: 'Пароль', required: true })
  @IsString({message: 'Должно быть строкой / Should be a string'})
  @MinLength(6,  {message: 'Длина пароля должна быть больше 5 символов / Password length should be more than 5 symbols'})
  @MaxLength(16,  {message: 'Длина пароля должна быть меньше 17 символов / Password length should be less than 17 symbols'})
  readonly password: string
  @ApiProperty({ example: 'nickname21', description: 'Никнейм / Nickname' })
  @IsString({message: 'Должно быть строкой / Should be a string'})
  readonly nickName: string
  @ApiProperty({ example: 'Alex', description: 'Имя / Name' })
  @IsString({message: 'Должно быть строкой / Should be a string'})
  readonly firstName: string
  @ApiProperty({ example: 'Green', description: 'Фамилия / Last name' })
  @IsString({message: 'Должно быть строкой / Should be a string'})
  readonly lastName: string
}
