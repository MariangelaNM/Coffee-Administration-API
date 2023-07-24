import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { UsersModule } from './users/users.module';

import { FincasModule } from './fincas/fincas.module';
import { ZonasModule } from './zonas/zonas.module';

import { RolesModule } from './roles/roles.module';
import { CaficultoresModule } from './caficultores/caficultores.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres' as const,
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        username: process.env.DB_USER,
        password: process.env.PSW,
        database: process.env.DATABASE,
        autoLoadEntities: true,
      }),
    }),
    HealthChecksModule,
    UsersModule,
    FincasModule,
    ZonasModule,
    AuthenticationModule,
    RolesModule,
    CaficultoresModule
  ],
})
export class AppModule { }
