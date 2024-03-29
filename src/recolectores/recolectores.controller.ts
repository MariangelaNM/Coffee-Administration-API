import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RecolectoresService } from './recolectores.service';
import { CreateRecolectorDto } from './dto/create-recolectore.dto';
import { UpdateRecolectorDto } from './dto/update-recolectore.dto';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';

@UseGuards(CoffeeKeyGuard)
@Controller('recolectores')
export class RecolectoresController {
  constructor(private readonly recolectoresService: RecolectoresService) {}

  //Use estatus HTTP en las respuestas para obtener respuesta con los datos creados
  @Post()
  async create(@Body() createRecolectorDto: CreateRecolectorDto) {
    const createdRecolector = await this.recolectoresService.create(
      createRecolectorDto,
    );
    return { statusCode: HttpStatus.CREATED, data: createdRecolector };
  }

  @Get()
  findAll() {
    return this.recolectoresService.findAll();
  }

  @Get(':id/recolector')
  findOneById(@Param('id') id: number) {
    return this.recolectoresService.findOneById(id);
  }

  @Get(':caficultorId/caficultor')
  async findAllByCaficultor(@Param('caficultorId') caficultorId: number) {
    return this.recolectoresService.findAllByCaficultor(caficultorId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRecolectorDto: UpdateRecolectorDto,
  ) {
    return this.recolectoresService.update(id, updateRecolectorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const { nombre, apellido } =
      await this.recolectoresService.getRecolectorNameAndApellidoById(id);
    await this.recolectoresService.deleterecolector(+id);
    return {
      message: `El recolector ${nombre} ${apellido} ha sido eliminado correctamente.`,
    };
  }
}
