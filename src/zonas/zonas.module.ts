import { Module } from '@nestjs/common';
import { ZonasService } from './Zonas.service';
import { ZonasController } from './Zonas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zona } from './entities/Zona.entity';
import { Repository } from 'typeorm';
import { ZonasRepository } from './Zonas.repository';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Validators } from 'src/helpers/Validators';

@Module({
  imports: [TypeOrmModule.forFeature([Zona]), Repository],
  controllers: [ZonasController],
  providers: [ZonasService, ZonasRepository, CoffeeCrypto, Validators],
})
export class ZonasModule {}
