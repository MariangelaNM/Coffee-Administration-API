import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import jwtConfig from 'src/authentication/config/jwt.config';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/LogInDto';
import { LogInResponseDto } from './dto/LogInResponseDto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coffeeCrypto: CoffeeCrypto,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  async LogIn(createAuthenticationDto: LogInDto): Promise<LogInResponseDto> {
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

    const response: LogInResponseDto = {
      token: token,
      id: credentials.Id,
    };

    return response;
  }
}
