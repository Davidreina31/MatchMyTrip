import { Role } from "../enums/Role.enum";

export class UserDTO {
    public id: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public email: string;
    public role: Role;
}
