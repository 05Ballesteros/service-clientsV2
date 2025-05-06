import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @IsString()
    @IsNotEmpty({message: "El nombre no puede quedar vació."})
    Nombre: string;

    @IsEmail()
    @IsNotEmpty({message: "El email no puede quedar vació."})
    Correo: string;

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
}