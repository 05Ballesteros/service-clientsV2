import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clientes } from './schemas/cliente.schema';
import { Model, Types } from 'mongoose';
import { Dependencia } from './schemas/Dependencia.schema';
import { Direccionarea } from './schemas/Direccion_area.schema';
import { Direccion_general } from './schemas/Direccion_general.schema';

@Injectable()
export class ClientesService {

  constructor(
    @InjectModel(Clientes.name) private readonly clienteModel: Model<Clientes>,
    @InjectModel(Dependencia.name) private readonly dependenciaModel: Model<Dependencia>,
    @InjectModel(Direccionarea.name) private readonly direccionAreaModel: Model<Direccionarea>,
    @InjectModel(Direccion_general.name) private readonly direccionGeneralModel: Model<Direccion_general>
  ) { }

  //Crear cliente, se valida mediante el correo si el cliente ya existe.
  async crearCliente(clienteDto: CreateClienteDto): Promise<Clientes> {
    try {
      const { Correo } = clienteDto;
      const cilenteExistence = await this.clienteModel.findOne({ Correo }).exec();
      if (cilenteExistence) {
        throw new BadRequestException('Este correo ya está registrado para un cliente');
      }
      const clienteInstance = new this.clienteModel({
        ...clienteDto,
        Dependencia: clienteDto.Dependencia ? new Types.ObjectId(clienteDto.Dependencia) : undefined,
        Direccion_General: clienteDto.Direccion_General ? new Types.ObjectId(clienteDto.Direccion_General) : undefined,
        direccion_area: clienteDto.direccion_area ? new Types.ObjectId(clienteDto.direccion_area) : undefined,
      });


      return clienteInstance.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error interno del servidor');
    }
  }

  //Busqueda de clientes, hace falta proteger las rutas para que el root y administrador puedan acceder a ellas
  async findAll(): Promise<Clientes[]> {
    try {
      const clientes = await this.clienteModel.find().populate('Dependencia direccion_area Direccion_General').exec();
      if (!clientes) {
        throw new BadRequestException('No se encontraron clientes');
      }
      return clientes;

    } catch (error) {
      throw new BadRequestException('Error interno en el servidor.');
    }
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

  //Obtener selectData
  async obtenerSelectData() {
    const dependencias = await this.dependenciaModel.find().exec();
    const direccionesGenerales = await this.direccionGeneralModel.find().exec();
    const direccionesAreas = await this.direccionAreaModel.find().exec();
    if (!dependencias || !direccionesGenerales || !direccionesAreas) {
      return false;
    }
    return {
      dependencias,
      direccionesGenerales,
      direccionesAreas,
    };
  }
}
