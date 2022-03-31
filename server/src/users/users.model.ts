import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'

interface UserCreationAttrs {
  email: string;
  password: string;
  nickName: string;
  firstName: string;
  lastName: string;
  secondName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор / Unique identificator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  	id: number
  @ApiProperty({
  	example: 'user@gmail.com',
  	description: 'Уникальный почтовый ящик / Unique email'
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  	email: string
  @ApiProperty({ example: 'password', description: 'Пароль / Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  	password: string
  @ApiProperty({ example: 'nickname21', description: 'Никнейм / Nickname' })
  @Column({ type: DataType.STRING, allowNull: false })
  	nickName: string
  @ApiProperty({ example: 'Alex', description: 'Имя / Name' })
  @Column({ type: DataType.STRING, allowNull: false })
  	firstName: string
  @ApiProperty({ example: 'John', description: 'Отчество / Second name' })
  @Column({ type: DataType.STRING })
  	secondName: string
  @ApiProperty({ example: 'Green', description: 'Фамилия / Last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  	lastName: string
  @ApiProperty({
  	example: 'Star Wars fan, know Daniel Radcliffe',
  	description: 'Описание пользователя / User description'
  })
  @Column({ type: DataType.STRING })
  	description: string
  @ApiProperty({ example: 'Dublin, Ireland', description: 'Место нахождения / Current location' })
  @Column({ type: DataType.STRING })
  	location: string
  @ApiProperty({ example: '03/30/2022, 3:38:16 PM ', description: 'Дата рождения / Date of birth' })
  @Column({ type: DataType.DATE })
  	birthDay: Date
  // picture: string
  // resume: string

  @BelongsToMany(() => Role,  () => UserRoles)
  	roles: Role[]
}
