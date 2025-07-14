// src/app.module.ts (리팩토링된 버전)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Fruit 모듈
import { FruitModule } from './fruit/fruit.module';

// Company 모듈
// import { CompanyModule } from './company/company.module';

// Monitor 모듈 : 모니터링 기능을 담당하는 모듈
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    // 애플리케이션 전역 설정을 위한 모듈
    ConfigModule.forRoot({
      isGlobal: true, // 이 ConfigModule은 애플리케이션 어디서든 접근 가능
      envFilePath: '.env', // .env 파일 경로 지정 (프로젝트 루트에 위치한다고 가정)
    }),
    // TypeORM 데이터베이스 연결 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 사용하기 위해 임포트
      inject: [ConfigService], // ConfigService를 주입받기 위해 선언
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 모든 엔티티 파일 자동 로드
        synchronize: true, // 개발용: 애플리케이션 시작 시 DB 스키마 자동 동기화 (운영에서는 마이그레이션 사용 권장)
      }),
    }),
    // --- 애플리케이션의 주요 기능/도메인 모듈들을 여기에 임포트 ---
    FruitModule,    // 과일 관련 기능 모듈
    // CompanyModule,  // 회사 정보 관련 기능 모듈
    MonitorModule,  // 시스템 모니터링 기능 모듈
  ],
  // 루트 AppController와 AppService는 더 이상 특정 비즈니스 로직을 담당하지 않고
  // 각 도메인 모듈로 역할이 분리되었기 때문에 여기서는 비워둡니다.
  // 만약 애플리케이션의 최상위 레벨에서 전역적인 컨트롤러나 서비스 (예: 헬스 체크, 공통 에러 핸들링 등)가
  // 필요하다면 여기에 추가할 수 있지만, 지금은 각 도메인 모듈에 위임된 것으로 간주합니다.
  controllers: [],
  providers: [],
})
export class AppModule {}