import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/LogInDto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/authentication/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coffeeCrypto: CoffeeCrypto,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  async LogIn(createAuthenticationDto: LogInDto) {
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

    const token = this.jwtService.sign(
      {
        sub: credentials.Id,
        email: credentials.Correo,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
      },
    );

    return { t: token };
  }
}
