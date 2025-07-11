// src/monitor/monitor.module.ts
import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';

@Module({
  providers: [MonitorService], // 서비스 등록
  controllers: [MonitorController], // 컨트롤러 등록
  exports: [MonitorService], // 필요하다면 다른 모듈에서 사용 가능하도록 export
})
export class MonitorModule {}