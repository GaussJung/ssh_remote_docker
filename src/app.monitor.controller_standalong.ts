/*
- Monigoring Contoller without Monitor Service ( file : app.monitor.service.js ) 
- Use app.monitor.controller.ts (using service) instead of this controller. 
*/
import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
 
@Controller('monitor')
export class MonitorController {

  // Show CPU-Usage Information : request path >> http://example.com:3000/monitor/cpu 
  @Get('/cpu')
  getCpuUsage(): any {
    const usage = process.cpuUsage();
    const cpuUsage = (usage.user + usage.system) / (os.cpus().length * 1000 * 1000);
    return { "cpu-usage" : cpuUsage };
  }

  // Show Memory-Usage Information :request path >> http://example.com:3000/monitor/memory  
  @Get('/memory')
  getMemoryUsage(): any {
    const usage = process.memoryUsage();
    const memoryUsage = usage.heapUsed / usage.heapTotal;
    return { "memory-usage" : memoryUsage };
  }
}

 