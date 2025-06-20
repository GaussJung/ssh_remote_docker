import { Module } from '@nestjs/common';
// Below 2 Library for default web service
import { AppController } from './app.controller';
import { AppService} from './app.service';
// Below 2 Library for monitor service 
import { MonitorController } from './app.monitor.controller';
import { MonitorService} from './app.monitor.service';

@Module({
  imports: [],
  controllers: [AppController, MonitorController],  // Multi Controller / Origin  --> controllers: [AppController]
  providers: [AppService, MonitorService], // Multi provider / Origin --> providers: [AppService]
})

export class AppModule {}
