import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { RecolectoresService } from './recolectores.service';
import { CreateRecolectorDto } from './dto/create-recolectore.dto';
import { UpdateRecolectorDto } from './dto/update-recolectore.dto';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';

@UseGuards(CoffeeKeyGuard)
@Controller('recolectores')
export class RecolectoresController {
  constructor(private readonly recolectoresService: RecolectoresService) { }


//Use estatus HTTP en las respuestas para obtener respuesta con los datos creados
  @Post()
  async create(@Body() createRecolectorDto: CreateRecolectorDto) {
    const createdRecolector = await this.recolectoresService.create(createRecolectorDto);
    return { statusCode: HttpStatus.CREATED, data: createdRecolector };
  }

  @Get()
  findAll() {
    return this.recolectoresService.findAll();
  }

  //Cambie decorador @Body() a @Param()
  @Get(':identificacion')
  findOne(@Param('identificacion') identificacion: string) {
    return this.recolectoresService.findOne(identificacion);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRecolectorDto: UpdateRecolectorDto) {
    return this.recolectoresService.update(id, updateRecolectorDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recolectoresService.deleterecolector(+id);
  }
}
