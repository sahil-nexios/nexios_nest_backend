import { IsNotEmpty, IsString ,IsEmail } from "class-validator";



export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: number;

    brief: string;
}