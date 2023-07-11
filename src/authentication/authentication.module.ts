import { Module } from '@nestjs/common';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  controllers: [AuthenticationController],
  imports: [UsersModule],
  providers: [AuthenticationService, UsersService, CoffeeCrypto, Validators],
})
export class AuthenticationModule {}
