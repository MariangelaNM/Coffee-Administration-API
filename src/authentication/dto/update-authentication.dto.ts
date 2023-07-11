import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './SignInDto';

export class UpdateAuthenticationDto extends PartialType(SignInDto) {}
