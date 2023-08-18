import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';
import { CreateZonaDto, ZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { ZonasService } from './zonas.service';


@UseGuards(CoffeeKeyGuard)
@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) { }

  @Post()
  async create(@Body() createZonaDto: CreateZonaDto) {
    const result = await this.zonasService.create(createZonaDto);
    if (result) return HttpStatus.CREATED;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateZonaDto: UpdateZonaDto) {
    return this.zonasService.updateZona(id, updateZonaDto);
  }

  @Put()
  async put(@Body() zonaDto: ZonaDto) {
    const result = await this.zonasService.getByFinca(zonaDto);
    if (result) return result;
  }

  @Get(':id')
  get(@Param('id') id: number, @Body() updateZonaDto: UpdateZonaDto) {
    return this.zonasService.getById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.zonasService.deleteZona(id);
  }
}
