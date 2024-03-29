import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { CaficultoresModule } from './caficultores/caficultores.module';
import { FincasModule } from './fincas/fincas.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { PeriodosModule } from './periodos/periodos.module';
import { RolesModule } from './roles/roles.module';
import { ZonasModule } from './zonas/zonas.module';

import { RecolectoresModule } from './recolectores/recolectores.module';
import { TiposRecoleccionModule } from './tipos-recoleccion/tipos-recoleccion.module';
import { RegistroModule } from './registro/registro.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres' as const,
        host: process.env.HOST,
        port: parseInt(process.env.PG_PORT),
        username: process.env.DB_USER,
        password: process.env.PSW,
        database: process.env.DATABASE,
        autoLoadEntities: true,
        ssl: process.env.SSL === 'true',
        extra: {
          ssl: process.env.SSL === 'true' ? {
            rejectUnauthorized: false,
          }
            : null,
        },
      }),
    }),
    HealthChecksModule,
    FincasModule,
    ZonasModule,
    AuthenticationModule,
    RolesModule,
    CaficultoresModule,
    PeriodosModule,
    RecolectoresModule,
    TiposRecoleccionModule,
    RegistroModule,
  ],
})
export class AppModule { }
