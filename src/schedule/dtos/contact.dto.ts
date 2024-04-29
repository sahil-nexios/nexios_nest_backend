import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class ContactDto {
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

    message: string;

}