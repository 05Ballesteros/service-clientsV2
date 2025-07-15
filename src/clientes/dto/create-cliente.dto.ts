import { IsString, IsEmail, IsNotEmpty, IsOptional, IsMongoId } from "class-validator";

interface LabeledValue {
    label: string;
    value: string;
}

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
    Direccion_General?: LabeledValue;

    @IsMongoId()
    @IsOptional()
    direccion_area?: LabeledValue;

    @IsString()
    @IsNotEmpty()
    Telefono: string;

    @IsString()
    @IsOptional()
    Extension?: string;

    @IsString()
    @IsOptional()
    Ubicacion?: string;
}
