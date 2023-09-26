import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroRecoleccionDto } from './create-registro.dto';

export class UpdateRegistroRecoleccionDto extends PartialType(CreateRegistroRecoleccionDto) {}
