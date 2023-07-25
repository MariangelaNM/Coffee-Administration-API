import { Module } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { ZonasController } from './zonas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zona } from './entities/zona.entity';
import { Repository } from 'typeorm';
import { ZonasRepository } from './zonas.repository';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Validators } from 'src/helpers/Validators';

@Module({
  imports: [TypeOrmModule.forFeature([Zona]), Repository],
  controllers: [ZonasController],
  providers: [ZonasService, ZonasRepository, CoffeeCrypto, Validators],
})
export class ZonasModule {}
