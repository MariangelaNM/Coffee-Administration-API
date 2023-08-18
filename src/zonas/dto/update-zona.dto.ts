import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaDto } from './create-zona.dto';

export class UpdateZonaDto extends PartialType(CreateZonaDto) {}
