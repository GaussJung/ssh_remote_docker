// src/fruit/fruit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// typeorm.config.ts: DB 연결 설정 함수 작성
// AppModule에 등록: TypeOrmModule.forRootAsync로 설정 연결
// 엔티티 → 모듈 → 서비스 → 컨트롤러 순서로 CRUD 구현

@Entity()
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}