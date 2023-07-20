import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { CaficultoresService } from './caficultores.service';
import { CreateCaficultorDto } from './dto/create-caficultor.dto';
import { UpdateCaficultoreDto } from './dto/update-caficultor.dto';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';

@UseGuards(CoffeeKeyGuard)
@Controller('caficultores')
export class CaficultoresController {
  constructor(private readonly caficultoresService: CaficultoresService) { }

  @Post()
  async create(@Body() createCaficultoreDto: CreateCaficultorDto) {
    const result = await this.caficultoresService.create(createCaficultoreDto);
    if (result) return HttpStatus.CREATED;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaficultoreDto: UpdateCaficultoreDto) {
    return this.caficultoresService.update(+id, updateCaficultoreDto);
  }
}
