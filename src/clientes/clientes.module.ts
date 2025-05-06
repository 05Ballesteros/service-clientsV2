import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clientes, ClienteSchema } from './schemas/cliente.schema';
import { Dependencia, DependenciaSchema } from './schemas/Dependencia.schema';
import { Direccionarea, Direccion_areaSchema } from './schemas/Direccion_area.schema';
import { Direccion_general, Direccion_generalSchema } from './schemas/Direccion_general.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clientes.name, schema: ClienteSchema },
      { name: Dependencia.name, schema: DependenciaSchema },
      { name: Direccionarea.name, schema: Direccion_areaSchema },
      { name: Direccion_general.name, schema: Direccion_generalSchema },
    ]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule { }
