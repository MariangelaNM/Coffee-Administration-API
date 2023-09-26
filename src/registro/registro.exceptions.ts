// registro.exceptions.ts
import { NotFoundException } from '@nestjs/common';

export class RegistroNotFoundException extends NotFoundException {
  constructor(message: string = 'No se encontraron registros para los criterios de búsqueda especificados.') {
    super(message);
  }
}
