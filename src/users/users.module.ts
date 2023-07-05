import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Validators } from 'src/helpers/Validators';

@Module({
  imports: [TypeOrmModule.forFeature([User]), Repository],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CoffeeCrypto, Validators],
})
export class UsersModule {}
