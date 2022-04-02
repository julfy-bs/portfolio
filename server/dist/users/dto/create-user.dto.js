"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'Уникальный почтовый ящик', required: true }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой / Should be a string' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Введен email некорректного формата / Incorrect email format has been entered' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password', description: 'Пароль', required: true }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой / Should be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Длина пароля должна быть больше 5 символов / Password length should be more than 5 symbols' }),
    (0, class_validator_1.MaxLength)(16, { message: 'Длина пароля должна быть меньше 17 символов / Password length should be less than 17 symbols' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'nickname21', description: 'Никнейм / Nickname' }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой / Should be a string' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'Имя / Name' }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой / Should be a string' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Green', description: 'Фамилия / Last name' }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой / Should be a string' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map