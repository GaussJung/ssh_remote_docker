// src/app.module.ts (최종 리팩토링 제안 버전)
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FruitModule } from './fruit/fruit.module';
// import { CompanyModule } from './company/company.module'; // 필요 시 주석 해제하여 사용
import { MonitorModule } from './monitor/monitor.module';

import { getTypeOrmConfig } from './config/typeorm.config'; // TypeORM 설정 파일을 분리

@Module({
  imports: [
    // 환경 변수 모듈 설정 (애플리케이션 전역에서 사용 가능)
    ConfigModule.forRoot({
      isGlobal: true,
      // 개발 환경에서는 '.env'와 '.env.development' 파일을 로드합니다.
      // Docker Compose (프로덕션 환경)에서는 'env_file'을 통해 환경 변수가 직접 주입되므로,
      // 여기서는 별도의 파일을 명시적으로 로드하지 않습니다.
      envFilePath: ['.env', '.env.development'], 
    }),

    // TypeORM 데이터베이스 연결 설정 로드 (별도 파일로 분리하여 관리)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig, // 분리된 설정 함수를 사용
    }),

    // 애플리케이션의 기능별/도메인별 모듈들을 임포트
    FruitModule,
    // CompanyModule, // 필요 시 주석 해제하여 사용
    MonitorModule,
  ],
  // 루트 레벨의 컨트롤러: 전역적인 유틸리티 API (헬스 체크, IP, 시간 등)
  controllers: [AppController],
  
  // 루트 레벨의 프로바이더: AppController에 대한 서비스 로직
  providers: [AppService],
})
export class AppModule {}