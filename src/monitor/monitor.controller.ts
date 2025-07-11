/*
- Monigoring Contoller with Monitor Service ( file : app.monitor.service.js ) 
- Logic is processed in Monitor Service after triggered by main.js 
*/
import { Controller, Get } from '@nestjs/common';
import { MonitorService } from './monitor.service';
 
@Controller('monitor')
export class MonitorController {

  // Initial construction 
  constructor(private readonly monitorService: MonitorService) {}
  
  // Show CPU-Usage Information : request path >> http://example.com:3000/monitor/cpu 
  @Get('/cpu')
  ShowCpuUsage(): any {
    return this.monitorService.getCpuUsage();
  }

  // Show Memory-Usage Information :request path >> http://example.com:3000/monitor/memory  
  @Get('/memory')
  ShowMemoryUsage(): any {
    return this.monitorService.getMemoryUsage();
  }
}
 