// registro.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Repository } from 'typeorm';
import { RegistroRecoleccion } from './entities/registro.entity';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroRecoleccion, Repository])],
  controllers: [RegistroController],
  providers: [RegistroService, CoffeeCrypto, Validators],
  exports: [RegistroService], // Exporta el repositorio si es necesario
})
export class RegistroModule {}
