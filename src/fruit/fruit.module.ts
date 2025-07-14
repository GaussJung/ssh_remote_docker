// src/fruit/fruit.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitService } from './fruit.service';
import { FruitController } from './fruit.controller';
import { Fruit } from './fruit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit])], // Fruit Entity를 이 모듈에서 사용
  providers: [FruitService],
  controllers: [FruitController],
})
export class FruitModule {}