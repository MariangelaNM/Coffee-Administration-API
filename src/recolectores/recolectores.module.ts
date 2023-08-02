import { Module } from '@nestjs/common';
import { RecolectoresService } from './recolectores.service';
import { RecolectoresController } from './recolectores.controller';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recolector } from './entities/recolectore.entity';
import { Repository } from 'typeorm';
import { RecolectoresRepository } from './recolectores.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Recolector]), Repository],
  controllers: [RecolectoresController],
  providers: [RecolectoresService, RecolectoresRepository, CoffeeCrypto, Validators],
  exports: [RecolectoresRepository],
})
export class RecolectoresModule {}
