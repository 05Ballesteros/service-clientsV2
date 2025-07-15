import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/jwt-roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Token } from 'src/decorators/token.decorator';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto, @Token() token: string) {
    return this.clientesService.crearCliente(createClienteDto, token);
  }

  @Get()
  @Roles('Root', 'Administrador')
  async findAll() {
    return await this.clientesService.findAll();
  }

  @Put(':id')
  @Roles('Root', 'Administrador')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto, @Token() token: string) {
    return this.clientesService.update(id, updateClienteDto, token);
  }

  @Get('selectData')
  @Roles('Root', 'Administrador')
  async obtenerSelectData() {
    try {
      const result = await this.clientesService.obtenerSelectData();

      if (!result) {
        throw new HttpException('No se encontraron datos para SelectData', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.error('Error en obtenerSelectData:', error.message);
      throw new HttpException(
        error.message || 'Error interno del servidor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':Correo')
  @Roles('Root', 'Administrador')
  findByCorreo(@Param('Correo') Correo: string) {
    return this.clientesService.finByCorreo(Correo);
  }

}
