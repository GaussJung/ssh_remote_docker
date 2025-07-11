import { Injectable } from '@nestjs/common';
import * as os from 'os';
 
@Injectable()
export class MonitorService {
  
  // Check cpu usage
  getCpuUsage(): any {
    const usage = process.cpuUsage();
    const cpuUsage = (usage.user + usage.system) / (os.cpus().length * 1000 * 1000);
    const outFixed = Number(cpuUsage.toFixed(5)) 
    console.log("Monitor M10 [CPU] cpu-usage=" + outFixed); 
    return { "cpu-usage" : outFixed };
  }
 
  // Check memory usage 
  getMemoryUsage(): any {
    const usage = process.memoryUsage();
    const memoryUsage = usage.heapUsed / usage.heapTotal;
    const outFixed = Number(memoryUsage.toFixed(5)) 
    console.log("Monitor M20 [Memory] (A)heapUsed=" + usage.heapUsed + " / (B)heapTotal=" + usage.heapTotal + " / (A/B)memoryUsage=" + outFixed); 
    return { "memory-usage" : outFixed };
  }
 
};



