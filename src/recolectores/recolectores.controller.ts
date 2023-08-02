import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { RecolectoresService } from './recolectores.service';
import { CreateRecolectorDto } from './dto/create-recolectore.dto';
import { UpdateRecolectorDto } from './dto/update-recolectore.dto';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';

@UseGuards(CoffeeKeyGuard)
@Controller('recolectores')
export class RecolectoresController {
  constructor(private readonly recolectoresService: RecolectoresService) { }

  @Post()
  async create(@Body() createRecolectorDto: CreateRecolectorDto) {
    const result = await this.recolectoresService.create(createRecolectorDto);
    if (result) return HttpStatus.CREATED;
  }

  @Get()
  findAll() {
    return this.recolectoresService.findAll();
  }

  @Get(':identificacion')
  findOne(@Param('identificacion') identificacion: string, @Body() UpdateRecolectorDto: UpdateRecolectorDto) {
    return this.recolectoresService.findOne(identificacion);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecolectorDto: UpdateRecolectorDto) {
    return this.recolectoresService.update(id, updateRecolectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recolectoresService.deleterecolector(+id);
  }
}
