// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * TypeORM 데이터베이스 연결 설정을 반환합니다.
 * 환경 변수(ConfigService)를 통해 DB 접속 정보를 가져옵니다.
 *
 * @param configService - NestJS ConfigService 인스턴스
 * @returns TypeOrmModuleOptions 객체
 */
export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  
  autoLoadEntities: true, // TypeORM 엔티티 파일을 자동으로 로드
  synchronize: false,     // 개발 단계에서도 자동 스키마 동기화 비활성화 (마이그레이션 권장)

  // DB 연결 및 쿼리 로깅 설정 (디버깅 편의성 개선)
  // 운영 환경에서는 'error' 또는 'warn' 레벨만 남기거나 완전히 비활성화하는 것을 권장
  logging: ['query', 'schema', 'error', 'warn', 'log', 'info'], 
});