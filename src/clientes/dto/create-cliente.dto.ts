import { IsString, IsEmail, IsNotEmpty, IsOptional, IsMongoId } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    Nombre: string;

    @IsEmail()
    @IsNotEmpty()
    Correo: string;

    @IsMongoId()
    @IsOptional()
    Dependencia?: string;

    @IsMongoId()
    @IsOptional()
    Direccion_General?: string;

    @IsMongoId()
    @IsOptional()
    direccion_area?: string;

    @IsString()
    @IsNotEmpty()
    Telefono: string;

    @IsString()
    @IsOptional()
    Extension?: string;

    @IsString()
    @IsOptional()
    Ubicacion?: string;

    @IsString()
    @IsOptional()
    nuevaDArea?: string;

    @IsString()
    @IsOptional()
    nuevaDGeneral?: string;
}
