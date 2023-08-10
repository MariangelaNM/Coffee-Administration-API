import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { CaficultoresModule } from './caficultores/caficultores.module';
import { FincasModule } from './fincas/fincas.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { PeriodosModule } from './periodos/periodos.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ZonasModule } from './zonas/zonas.module';


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
    FincasModule,
    ZonasModule,
    AuthenticationModule,
    RolesModule,
    CaficultoresModule,
    PeriodosModule
  ],
})
export class AppModule { }
