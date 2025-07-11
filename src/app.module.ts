// src/app.module.ts (리팩토링된 버전)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 루트 레벨의 공통 서비스/컨트롤러 (헬스 체크, IP, 날짜/시간 등)
import { AppController } from './app.controller';  
import { AppService } from './app.service';       

// 기존에 제공되었던 Fruit 모듈
// import { FruitModule } from './fruit/fruit.module';
// 이전 답변에서 추가된 Company 모듈
// import { CompanyModule } from './company/company.module';
// 이전 답변에서 추가된 Monitor 모듈 (app.monitor.controller/service 파일이 이제 monitor/ 폴더 안으로 이동했다고 가정)
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Below if for TypeORM with PostgreSQL
    // TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
        // type: 'postgres',
        // host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USERNAME'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_DATABASE'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: true,
      //}),
    // }),
    //FruitModule,
    //CompanyModule,
    MonitorModule,
  ],
  controllers: [AppController], // AppController 다시 등록
  providers: [AppService],      // AppService 다시 등록
})

export class AppModule {}