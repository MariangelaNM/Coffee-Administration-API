import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) { }

  @Post()
  create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodosService.create(createPeriodoDto);
  }

  @Get(':caficultorId')
  findOne(@Param('caficultorId') caficultorId: string) {
    return this.periodosService.findByCaficultorId(+caficultorId);
  }

  @Patch(':id')
  update(@Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodosService.update(updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodosService.remove(+id);
  }
}
