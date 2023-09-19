import { Controller, Get, UseGuards } from '@nestjs/common';
import { TiposRecoleccionService } from './tipos-recoleccion.service';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';

@UseGuards(CoffeeKeyGuard)
@Controller('tipos-recoleccion')
export class TiposRecoleccionController {
  constructor(private readonly tiposRecoleccionService: TiposRecoleccionService) { }

  @Get()
  findAll() {
    return this.tiposRecoleccionService.findAll();
  }
}
