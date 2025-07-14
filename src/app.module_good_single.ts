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
// (이전 대화 흐름상 CompanyModule 주석 해제된 상태였다가 다시 주석 처리된 것으로 보이며,
// 사용자님의 요청에 따라 현재 이 라인은 주석 처리된 상태로 유지합니다.
// 만약 CompanyModule을 사용하시려면 주석을 해제해주세요.)
// import { CompanyModule } from './company/company.module';

// 시스템 모니터링(CPU, Memory) 기능을 담당하는 모듈
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    // 환경 변수 설정을 위한 모듈 (애플리케이션 전역에서 사용 가능)
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 설정하여 모든 모듈에서 ConfigService 사용 가능
      // envFilePath 설정 변경:
      // - 컨테이너 프로덕션 환경: process.env.NODE_ENV === 'production' 일 때,
      //   Docker Compose가 env_file을 통해 이미 환경 변수를 process.env에 주입하므로,
      //   ConfigModule이 별도의 파일을 읽지 않도록 envFilePath를 빈 배열로 설정합니다.
      // - 로컬 개발 환경: process.env.NODE_ENV가 'production'이 아닐 때,
      //   우선순위가 낮은 '.env'를 먼저 읽고, 그 다음 우선순위가 높은 '.env.development'를 읽습니다.
      //   이는 로컬 개발 시 ".env.development.local"이 가장 높은 우선순위를 가지는 Next.js의 동작과는 다름을 유의하세요.
      // envFilePath: process.env.NODE_ENV === 'production' ? [] : ['.env', '.env.development'],
      envFilePath: ['.env','.env.development'], 
      // 참고: .env.local, .env.<MODE>.local 파일은 ConfigModule.forRoot()에 명시하지 않아도 자동으로 로드됩니다.
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
        // TypeORM 엔티티 파일을 자동으로 로드합니다.
        // entities 배열에 직접 경로를 나열하는 대신 이 옵션을 사용하는 것이 편리합니다.
        autoLoadEntities: true, 

        // 스키마 자동 동기화 설정:
        // QueryFailedError 문제 해결을 위해 개발 환경에서도 'false'로 설정합니다.
        // 'true'는 개발 초기에만 편리하며, 실제 데이터가 있는 환경에서는 예기치 않은 문제를 일으킬 수 있습니다.
        // 'false'로 설정하면 TypeORM은 DB 스키마를 건드리지 않습니다.
        // 따라서, DB 스키마는 마이그레이션 도구(TypeORM Migrations)나 수동으로 관리되어야 합니다.
        synchronize: false, // <-- 이 부분을 'false'로 변경했습니다.

        // DB 연결 및 쿼리 로깅 설정 (디버깅용)
        // 실제 운영 환경에서는 'error' 또는 'warn' 레벨만 남기거나 완전히 끄는 것을 권장합니다.
        logging: ['query', 'schema', 'error', 'warn', 'log', 'info'],

      }),
 
    }),
    // 애플리케이션의 기능별/도메인별 모듈들을 여기에 임포트합니다.
    // 각 모듈은 자체적인 컨트롤러와 서비스를 포함하며, 해당 도메인의 책임만을 가집니다.
    FruitModule,
    // CompanyModule, // 사용자 요청에 따라 현재 주석 처리된 상태로 유지
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