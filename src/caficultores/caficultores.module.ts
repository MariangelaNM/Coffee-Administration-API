import { Module } from '@nestjs/common';
import { CaficultoresService } from './caficultores.service';
import { CaficultoresController } from './caficultores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caficultor } from './entities/caficultor.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CaficultoresRepository } from './caficultores.repository';
import { UsersModule } from 'src/users/users.module';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';

@Module({
  imports: [TypeOrmModule.forFeature([Caficultor]), Repository, UsersModule],
  controllers: [CaficultoresController],
  providers: [CaficultoresService, CaficultoresRepository, UsersService, CoffeeCrypto, Validators],
  exports: [CaficultoresService, CaficultoresRepository]
})
export class CaficultoresModule { }
