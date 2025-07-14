// src/app.module.ts (최종 리팩토링 및 AppController/AppService 포함 버전)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 애플리케이션의 루트 레벨에서 공통 유틸리티(헬스 체크, IP, 날짜/시간)를 제공하는
// 컨트롤러와 서비스입니다.
import { AppController } from './app.controller';
import { AppService } from './app.service';

// --- 애플리케이션의 주요 기능/도메인 모듈들 ---
// Fruit 관련 비즈니스 로직 및 API를 담당하는 모듈
import { FruitModule } from './fruit/fruit.module';

// Company 관련 비즈니스 로직 및 API를 담당하는 모듈
// import { CompanyModule } from './company/company.module';

// 시스템 모니터링(CPU, Memory) 기능을 담당하는 모듈
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    // 환경 변수 설정을 위한 모듈 (애플리케이션 전역에서 사용 가능)
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 설정하여 모든 모듈에서 ConfigService 사용 가능
      envFilePath: '.env', // .env 파일은 프로젝트 루트에 위치
    }),
    // TypeORM을 이용한 데이터베이스 연결 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigService를 주입받기 위해 ConfigModule 임포트
      inject: [ConfigService], // ConfigService 인스턴스 주입
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // PostgreSQL 사용
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 모든 entity 파일 자동 로드
        synchronize: true, // 개발 목적으로 스키마 자동 동기화 (운영에서는 마이그레이션 도구 사용 권장)
      }),
    }),
    // 애플리케이션의 기능별/도메인별 모듈들을 여기에 임포트합니다.
    // 각 모듈은 자체적인 컨트롤러와 서비스를 포함하며, 해당 도메인의 책임만을 가집니다.
    FruitModule,
    //CompanyModule, // 추후 포함 
    MonitorModule,
  ],
  // AppModule이 직접적으로 관리하는 컨트롤러들 
  // AppController는 애플리케이션의 루트 레벨에서 전역적인 유틸리티 API를 제공합니다.
  controllers: [
    AppController, // 헬스 체크, IP, 날짜 및 시간과 같은 공통 기능을 제공
  ],
  // AppModule이 직접적으로 관리하는 프로바이더들
  // AppService는 AppController가 사용하는 비즈니스 로직을 포함합니다.
  providers: [
    AppService, // AppController의 공통 유틸리티 기능에 대한 서비스 로직 제공
  ],
})
export class AppModule {}