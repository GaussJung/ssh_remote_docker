import { Injectable } from '@nestjs/common';
import * as os from 'os';
 
@Injectable()
export class MonitorService {
  
  // Check cpu usage
  getCpuUsage(): any {
    const usage = process.cpuUsage();
    const cpuUsage = (usage.user + usage.system) / (os.cpus().length * 1000 * 1000);
    console.log("Monitor M10 [CPU] cpu-usage=" + cpuUsage); 
    return { "cpu-usage" : cpuUsage };
  }
 
  // Check memory usage 
  getMemoryUsage(): any {
    const usage = process.memoryUsage();
    const memoryUsage = usage.heapUsed / usage.heapTotal;
    console.log("Monitor M20 [Memory] (A)heapUsed=" + usage.heapUsed + " / (B)heapTotal=" + usage.heapTotal + " / (A/B)memoryUsage=" + memoryUsage); 
    return { "memory-usage" : memoryUsage };
  }
 
};



