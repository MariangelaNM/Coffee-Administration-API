import { PartialType } from '@nestjs/mapped-types';
import { CreateCaficultorDto } from './create-caficultor.dto';

export class UpdateCaficultoreDto extends PartialType(CreateCaficultorDto) {}
