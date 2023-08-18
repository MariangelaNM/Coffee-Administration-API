import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodoDto } from './create-periodo.dto';

export class UpdatePeriodoDto extends PartialType(CreatePeriodoDto) {}
