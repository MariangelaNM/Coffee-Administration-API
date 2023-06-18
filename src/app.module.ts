import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        host: configService.get('HOST'),
        port: parseInt(configService.get<string>('PORT')),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PSW'),
        database: configService.get<string>('DATABASE'),
      }),
    }),
    UsersModule,
    HealthChecksModule,
  ],
})
export class AppModule {}
