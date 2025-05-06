import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:root@localhost:27017/ticketView?authSource=admin&directConnection=true'),
    ClientesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
