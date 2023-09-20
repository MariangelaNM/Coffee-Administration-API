import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { PeriodosService } from './periodos.service';

@UseGuards(CoffeeKeyGuard)
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
  @Get('Periodo/:id')
  Put(@Param('id') id: string) {
    return this.periodosService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Body() updatePeriodoDto: UpdatePeriodoDto, @Param('id') id: string) {
    return this.periodosService.update(id, updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodosService.remove(+id);
  }
}
