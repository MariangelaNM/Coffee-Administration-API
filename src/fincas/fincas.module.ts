import { Module } from '@nestjs/common';
import { FincasService } from './fincas.service';
import { FincasController } from './fincas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from './entities/finca.entity';
import { Repository } from 'typeorm';
import { FincasRepository } from './fincas.repository';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Validators } from 'src/helpers/Validators';

@Module({
  imports: [TypeOrmModule.forFeature([Finca]), Repository],
  controllers: [FincasController],
  providers: [FincasService, FincasRepository, CoffeeCrypto, Validators],
})
export class FincasModule {}
