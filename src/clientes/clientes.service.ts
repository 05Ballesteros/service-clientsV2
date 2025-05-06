import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clientes } from './schemas/cliente.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ClientesService {

  constructor(
    @InjectModel(Clientes.name) private readonly clienteModel: Model<Clientes>,
  ) { }

  async crearCliente(clienteDto: CreateClienteDto): Promise<Clientes> {
    // Convertir Dependencia y Direcciones a ObjectId
    const clienteInstance = new this.clienteModel({
      ...clienteDto,
      Dependencia: clienteDto.Dependencia ? new Types.ObjectId(clienteDto.Dependencia) : undefined,
      Direccion_General: clienteDto.Direccion_General ? new Types.ObjectId(clienteDto.Direccion_General) : undefined,
      direccion_area: clienteDto.direccion_area ? new Types.ObjectId(clienteDto.direccion_area) : undefined,
    });

    return clienteInstance.save();
  }

  async findAll(): Promise<Clientes[]> {
    const clientes = await this.clienteModel.find().populate('Dependencia direccion_area Direccion_General').exec();
    return clientes;
  }

  async finByCorreo(Correo: string) {
    const cliente = await this.clienteModel.findOne({ Correo: Correo }).populate('Dependencia direccion_area Direccion_General').exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente no encontrado`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Clientes> {
    const updateData = {
      ...updateClienteDto,
      Dependencia: updateClienteDto.Dependencia ? new Types.ObjectId(updateClienteDto.Dependencia) : undefined,
      Direccion_General: updateClienteDto.Direccion_General ? new Types.ObjectId(updateClienteDto.Direccion_General) : undefined,
      direccion_area: updateClienteDto.direccion_area ? new Types.ObjectId(updateClienteDto.direccion_area) : undefined,
    };
  
    const updatedCliente = await this.clienteModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedCliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  
    return updatedCliente;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
