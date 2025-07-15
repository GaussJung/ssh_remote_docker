// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FruitModule } from './fruit/fruit.module';
// import { CompanyModule } from './company/company.module'; // enable if needed
import { MonitorModule } from './monitor/monitor.module';
import { RootModule } from './root/root.module'; // 👈 root 모듈 import

import { getTypeOrmConfig } from './config/typeorm.config'; // TypeORM 설정

@Module({
  imports: [
    /**
     * Global ConfigModule
     * - Loads .env by default
     * - Overrides with NODE_ENV specific files
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        const nodeEnv = process.env.NODE_ENV || 'development';
        const envFiles = ['.env'];

        switch (nodeEnv) {
          case 'production':
            envFiles.push('.env.production');
            break;
          case 'test':
            envFiles.push('.env.test');
            break;
          case 'development':
          default:
            envFiles.push('.env.development');
            break;
        }

        return envFiles;
      })(),
    }),

    /**
     * TypeORM connection
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    /**
     * Domain modules
     */
    FruitModule,
    // CompanyModule,
    MonitorModule,

    /**
     * Root module (utility services)
     */
    RootModule, // for ROOT 
  ],

  /**
   * Root controller
   */
  controllers: [AppController],

  /**
   * Root-level services
   */
  providers: [AppService],
})
export class AppModule {}
