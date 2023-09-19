import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposRecoleccion } from './entities/tipos-recoleccion.entity';
import { TiposRecoleccionController } from './tipos-recoleccion.controller';
import { TiposRecoleccionRepository } from './tipos-recoleccion.repository';
import { TiposRecoleccionService } from './tipos-recoleccion.service';

@Module({
  imports: [TypeOrmModule.forFeature([TiposRecoleccion]), Repository],
  controllers: [TiposRecoleccionController],
  providers: [TiposRecoleccionService, TiposRecoleccionRepository]
})
export class TiposRecoleccionModule { }
