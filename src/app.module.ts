import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'coffee1234',
        database: 'postgres',
        autoLoadEntities: true,
      }),
    }),
    HealthChecksModule,
    UsersModule,
    AuthenticationModule,
  ],
})
export class AppModule { }
