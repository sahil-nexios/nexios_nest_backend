import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class ClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    image: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    designation: number;

}