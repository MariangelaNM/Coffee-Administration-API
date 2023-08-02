import { PartialType } from '@nestjs/mapped-types';
import { CreateRecolectorDto } from './create-recolectore.dto';

export class UpdateRecolectorDto extends PartialType(CreateRecolectorDto) {}
