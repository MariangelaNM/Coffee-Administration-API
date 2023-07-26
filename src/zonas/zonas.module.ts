import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Repository } from 'typeorm';
import { Zona } from './entities/zona.entity';
import { ZonasController } from './zonas.controller';
import { ZonasRepository } from './zonas.repository';
import { ZonasService } from './zonas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zona]), Repository],
  controllers: [ZonasController],
  providers: [ZonasService, ZonasRepository, CoffeeCrypto, Validators],
})
export class ZonasModule { }
