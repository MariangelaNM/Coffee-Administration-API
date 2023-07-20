import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaDto } from './create-Zona.dto';

export class UpdateZonaDto extends PartialType(CreateZonaDto) {}
