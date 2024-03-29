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
import { CreateFincaDto, FincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import { FincasService } from './fincas.service';

@UseGuards(CoffeeKeyGuard)
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
  
  @Put()
  async put(@Body() FincaDto: FincaDto) {
    const result = await this.FincasService.getByCaficultor(FincaDto);
    if (result) return result;
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
