import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periodo } from './entities/periodo.entity';
import { PeriodosController } from './periodos.controller';
import { PeriodosRepository } from './periodos.repository';
import { PeriodosService } from './periodos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo]), Repository],
  controllers: [PeriodosController],
  providers: [PeriodosService, PeriodosRepository]
})
export class PeriodosModule { }
