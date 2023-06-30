import { HttpException, HttpStatus } from '@nestjs/common';

export class Validators {
  ValidatePayloadKeys(obj) {
    if (Object.keys(obj).length === 0)
      throw new HttpException(
        `Por favor envie al menos un campo valido en el cuerpo de la peticion.`,
        HttpStatus.BAD_REQUEST,
      );
  }
}
