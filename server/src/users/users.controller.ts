import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { AddRoleDto } from './dto/add-role.dto'

@ApiTags('Список пользователей')
@Controller('users')
export class UsersController {

	constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создать пользователя / Create user' })
  @ApiResponse({ status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto)
	}

  @ApiOperation({ summary: 'Получить массив пользователей / Get array of users' })
  @ApiResponse({ status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
  	return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Выдать роль пользователю / Assign a role to the user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
  	return this.usersService.addRole(dto)
  }
}
