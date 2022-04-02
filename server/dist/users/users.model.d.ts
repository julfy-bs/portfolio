import { Model } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
interface UserCreationAttrs {
    email: string;
    password: string;
    nickName: string;
    firstName: string;
    lastName: string;
    secondName: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    nickName: string;
    firstName: string;
    secondName: string;
    lastName: string;
    description: string;
    location: string;
    birthDay: Date;
    roles: Role[];
}
export {};
