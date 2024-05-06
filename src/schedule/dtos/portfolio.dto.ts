import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class PortfolioDto {
    @IsNotEmpty()
    title: string;

    image: string;

    @IsNotEmpty()
    description: string;

}