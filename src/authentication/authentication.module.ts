import { Module } from '@nestjs/common';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { CaficultoresModule } from 'src/caficultores/caficultores.module';
import { CaficultoresService } from 'src/caficultores/caficultores.service';

@Module({
  controllers: [AuthenticationController],
  imports: [
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    CaficultoresModule
  ],
  providers: [AuthenticationService, UsersService, CoffeeCrypto, Validators, CaficultoresService],
})
export class AuthenticationModule { }
