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
} from '@nestjs/common';
import { CreateZonaDto, ZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { ZonasService } from './zonas.service';

@Controller('zonas')
export class ZonasController {
  constructor(private readonly ZonasService: ZonasService) {}

  @Post()
  async create(@Body() createZonaDto: CreateZonaDto) {
    const result = await this.ZonasService.create(createZonaDto);
    if (result) return HttpStatus.CREATED;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateZonaDto: UpdateZonaDto) {
    return this.ZonasService.updateZona(id, UpdateZonaDto);
  }
  
  @Put()
  async put(@Body() ZonaDto: ZonaDto) {
    const result = await this.ZonasService.getByFinca(ZonaDto);
    if (result) return result;
  }

  @Get(':id')
  get(@Param('id') id: number, @Body() UpdateZonaDto: UpdateZonaDto) {
    return this.ZonasService.getById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ZonasService.deleteZona(id);
  }
}
