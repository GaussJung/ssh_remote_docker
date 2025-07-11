// src/monitor/monitor.controller.ts
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Controller('monitor') // /monitor 경로
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get('cpu')
  @HttpCode(HttpStatus.OK)
  async getCpuUsage(): Promise<{ 'cpu-usage': number }> {
    const cpuUsage = await this.monitorService.getCpuUsage();
    return { 'cpu-usage': Number(cpuUsage.toFixed(2)) }; // 두 자리 소수점으로 강제
  }

  @Get('memory')
  @HttpCode(HttpStatus.OK)
  async getMemoryUsage(): Promise<{ 'memory-usage': number }> {
    const memoryUsage = await this.monitorService.getMemoryUsage();
    return { 'memory-usage': memoryUsage };
  }
}