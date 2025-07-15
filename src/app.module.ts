// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FruitModule } from './fruit/fruit.module';
// import { CompanyModule } from './company/company.module'; // 필요 시 주석 해제하여 사용
import { MonitorModule } from './monitor/monitor.module';

import { getTypeOrmConfig } from './config/typeorm.config'; // TypeORM 설정 파일

@Module({
  imports: [
    /**
     * ConfigModule 설정
     * 1. 공통 설정(.env)을 먼저 로드
     * 2. NODE_ENV 값에 따라 환경별 설정(.env.development, .env.production, .env.test)로 override
     * 
     * NODE_ENV 값이 없으면 기본값은 development
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        const nodeEnv = process.env.NODE_ENV || 'development';
        const envFiles = ['.env']; // always load base

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
     * TypeORM 연결 설정
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    /**
     * 도메인별 모듈
     */
    FruitModule,
    // CompanyModule,
    MonitorModule,
  ],

  /**
   * 루트 컨트롤러
   */
  controllers: [AppController],

  /**
   * 루트 프로바이더
   */
  providers: [AppService],
})
export class AppModule {}
