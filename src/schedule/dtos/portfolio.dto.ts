import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class PortfolioDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    image: string;

    @IsNotEmpty()
    description: string;

}