import { Injectable } from '@nestjs/common';
import * as os from 'os';
 
@Injectable()
export class MonitorService {
 
  getCpuUsage(): any {
    const usage = process.cpuUsage();
    const cpuUsage = (usage.user + usage.system) / (os.cpus().length * 1000 * 1000);
    return { "cpu-usage" : cpuUsage };
  }
 
  getMemoryUsage(): any {
    const usage = process.memoryUsage();
    const memoryUsage = usage.heapUsed / usage.heapTotal;
    return { "memory-usage" : memoryUsage };
  }
 
};



