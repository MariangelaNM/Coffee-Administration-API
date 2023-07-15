import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import { FincasService } from './fincas.service';

@Controller('fincas')
export class FincasController {
  constructor(private readonly FincasService: FincasService) {}

  @Post()
  async create(@Body() createFincaDto: CreateFincaDto) {
    const result = await this.FincasService.create(createFincaDto);
    if (result) return HttpStatus.CREATED;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateFincaDto: UpdateFincaDto) {
    return this.FincasService.updatefinca(id, UpdateFincaDto);
  }

  @Get(':id')
  get(@Param('id') id: number, @Body() UpdateFincaDto: UpdateFincaDto) {
    return this.FincasService.getById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.FincasService.deletefinca(id);
  }
}
