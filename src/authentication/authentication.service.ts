import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/SignInDto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coffeeCrypto: CoffeeCrypto,
  ) {}

  async SingIn(createAuthenticationDto: SignInDto) {
    const credentials = await this.usersService.getUserByEmail(
      createAuthenticationDto.email,
    );

    if (!credentials) {
      throw new UnauthorizedException('Email no registrado.');
    }

    const isValidPassword = await this.coffeeCrypto.ComparePassword(
      createAuthenticationDto.contrasena,
      credentials.Contrasena,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    return true;
  }
}
