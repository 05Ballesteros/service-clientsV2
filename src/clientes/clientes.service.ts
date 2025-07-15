import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clientes } from './schemas/cliente.schema';
import { Model, Types } from 'mongoose';
import { Dependencia } from './schemas/Dependencia.schema';
import { Direccionarea } from './schemas/Direccion_area.schema';
import { Direccion_general } from './schemas/Direccion_general.schema';
import { LogsService } from 'src/services/logs.service';

@Injectable()
export class ClientesService {

  constructor(
    private readonly logsService: LogsService,
    @InjectModel(Clientes.name) private readonly clienteModel: Model<Clientes>,
    @InjectModel(Dependencia.name) private readonly dependenciaModel: Model<Dependencia>,
    @InjectModel(Direccionarea.name) private readonly direccionAreaModel: Model<Direccionarea>,
    @InjectModel(Direccion_general.name) private readonly direccionGeneralModel: Model<Direccion_general>
  ) { }

  //Crear cliente, se valida mediante el correo si el cliente ya existe.
  async crearCliente(clienteDto: CreateClienteDto, token: string) {
    console.log(clienteDto);
    const DEFAULT_DEPENDENCIA = "679b8a12c9c34d1de358f1cd";
    const { Correo } = clienteDto;
    try {
      const cilenteExistence = await this.clienteModel.findOne({ Correo }).exec();
      if (cilenteExistence) {
        console.log("Este correo ya está registrado para un cliente");
        const savedlog = await this.logsService.enviarLog({ Correo: Correo }, "clienteNoCreado", token);
        throw new BadRequestException('Este correo ya está registrado para un cliente');
      }
      const clienteInstance = new this.clienteModel({
        ...clienteDto,
        Dependencia: clienteDto.Dependencia ? new Types.ObjectId(clienteDto.Dependencia) : new Types.ObjectId(DEFAULT_DEPENDENCIA),
        Direccion_General: clienteDto.Direccion_General ? new Types.ObjectId(clienteDto.Direccion_General.value) : undefined,
        direccion_area: clienteDto.direccion_area ? new Types.ObjectId(clienteDto.direccion_area.value) : undefined,
      });
      console.log("clienteInstance", clienteInstance);
      if (clienteInstance) {
        const savedlog = await this.logsService.enviarLog({ Cliente: Correo }, "clienteCreado", token);
        return clienteInstance.save();
      }
    } catch (error) {
      const savedlog = await this.logsService.enviarLog({ Correo: Correo }, "clienteNoCreado", token, error);
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

  async update(id: string, updateClienteDto: UpdateClienteDto, token: string) {
    console.log(updateClienteDto);
    try {
      const updateData: any = {
        ...updateClienteDto,
      };

      // Solo sobrescribir Direccion_General si viene en el update
      if (updateClienteDto.Direccion_General) {
        updateData.Direccion_General = new Types.ObjectId(
          typeof updateClienteDto.Direccion_General === 'string'
            ? updateClienteDto.Direccion_General
            : updateClienteDto.Direccion_General.value
        );
      }

      if (updateClienteDto.direccion_area) {
        updateData.direccion_area = new Types.ObjectId(
          typeof updateClienteDto.direccion_area === 'string'
            ? updateClienteDto.direccion_area
            : updateClienteDto.direccion_area.value
        );
      }

      const updatedCliente = await this.clienteModel.findByIdAndUpdate(id, updateData, {
        new: true,
      }).exec();

      if (!updatedCliente) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }

      if (updatedCliente) {
        const savedlog = await this.logsService.enviarLog({ Cliente: updatedCliente.Correo }, "clienteActualizado", token);
        return updatedCliente;
      }
    } catch (error) {
      const savedlog = await this.logsService.enviarLog({ Correo: "Correo" }, "clienteNoActualizado", token, error);
      throw new BadRequestException('Error interno del servidor');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }

  //Obtener selectData
  async obtenerSelectData() {
    const direccionesGenerales = await this.direccionGeneralModel.find().sort({ Direccion_General: 1 }).exec();
    const direccionesAreas = await this.direccionAreaModel.find().sort({ direccion_area: 1 }).exec();
    if (!direccionesGenerales || !direccionesAreas) {
      return false;
    }

    const groupedDGenerales = direccionesGenerales.map((dg) => ({
      label: dg.Direccion_General,
      value: dg._id,
    }));

    const groupedDAreas = direccionesAreas.map((da) => ({
      label: da.direccion_area,
      value: da._id,
    }));

    return {
      dareas: groupedDAreas,
      dgenerales: groupedDGenerales,
    };

  }
}
