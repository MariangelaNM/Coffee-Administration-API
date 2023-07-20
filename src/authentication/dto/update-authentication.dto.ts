import { PartialType } from '@nestjs/mapped-types';
import { LogInDto } from './LogInDto';

export class UpdateAuthenticationDto extends PartialType(LogInDto) {}
