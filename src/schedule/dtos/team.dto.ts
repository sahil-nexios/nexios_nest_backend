import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class TeamDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    image: string;

    @IsNotEmpty()
    designation: string;

}