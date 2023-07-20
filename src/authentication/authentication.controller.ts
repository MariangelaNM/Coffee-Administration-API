import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LogInDto } from './dto/LogInDto';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';

@UseGuards(CoffeeKeyGuard)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async create(@Body() createAuthenticationDto: LogInDto) {
    return await this.authenticationService.LogIn(createAuthenticationDto);
  }
}
