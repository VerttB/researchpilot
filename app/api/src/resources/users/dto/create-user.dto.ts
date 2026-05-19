import { Role } from "@generated/prisma/enums";
import { IsEmail, IsEnum, IsOptional, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail(undefined, {
        message: "Invalid email"
    })
    email!:string;
    @IsStrongPassword(undefined, {
        message:'Password must be at least 8 characters long, and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',

    })
    passwordHash!: string;


    @IsOptional()
    @IsEnum(Role)
    role: Role = Role.USER

    
}
