import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposRecoleccionDto } from './create-tipos-recoleccion.dto';

export class UpdateTiposRecoleccionDto extends PartialType(CreateTiposRecoleccionDto) {}
