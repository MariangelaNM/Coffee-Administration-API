import { PartialType } from '@nestjs/mapped-types';
import { CreateFincaDto } from './create-finca.dto';

export class UpdateFincaDto extends PartialType(CreateFincaDto) {}
