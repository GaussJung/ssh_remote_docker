import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 루트 레벨의 공통 서비스/컨트롤러 (헬스 체크, IP, 날짜/시간 등)
import { AppController } from './app.controller';  
import { AppService } from './app.service';       

// Monitor 모듈 : 모니터링 기능을 담당하는 모듈
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MonitorModule,
  ],
  controllers: [AppController], // AppController 다시 등록
  providers: [AppService],      // AppService 다시 등록
})

export class AppModule {}