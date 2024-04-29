import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class ApplynowDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: number;

    subject: string;

    file: string;
}