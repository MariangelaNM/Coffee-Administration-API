import { Injectable } from '@nestjs/common';
import { TiposRecoleccionRepository } from './tipos-recoleccion.repository';

@Injectable()
export class TiposRecoleccionService {

  constructor(
    private readonly tiposRecoleccionRepository: TiposRecoleccionRepository,
  ) { }

  findAll() {
    return this.tiposRecoleccionRepository.getAll();
  }
}
