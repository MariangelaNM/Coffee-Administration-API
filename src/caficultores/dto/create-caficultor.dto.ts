import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCaficultorDto {

    @IsNotEmpty()
    @IsString()
    Nombre: string;

    @IsNotEmpty()
    @IsString()
    Apellidos: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    Correo: string;

    @IsNotEmpty()
    @IsString()
    Contrasena: string;

    @IsNotEmpty()
    @IsNumber()
    Role: number;
}