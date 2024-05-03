import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class CareerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    vacancy: number;

    @IsNotEmpty()
    experiance_year: string;

}