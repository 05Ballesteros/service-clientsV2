import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface LabeledValue {
    label: string;
    value: string;
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @IsString()
    @IsNotEmpty({message: "El nombre no puede quedar vació."})
    Nombre: string;

    @IsEmail()
    @IsNotEmpty({message: "El email no puede quedar vació."})
    Correo: string;

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