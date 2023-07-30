import { Module } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { PeriodosController } from './periodos.controller';

@Module({
  controllers: [PeriodosController],
  providers: [PeriodosService]
})
export class PeriodosModule {}
