// src/monitor/monitor.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as os from 'os';
import * as process from 'process';

@Injectable()
export class MonitorService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MonitorService.name);
  private cpuUsagePercentage: number = 0;
  private memoryUsagePercentage: number = 0;
  private lastCpuInfo: any;
  private cpuMonitorInterval: NodeJS.Timeout | null = null;

  // CPU 사용률 업데이트 주기 (밀리초)
  private readonly CPU_MONITOR_INTERVAL_MS = 1000; // 1초마다 업데이트

  onModuleInit() {
    this.logger.log('MonitorService initialized. Starting CPU monitoring...');
    this.initCpuMonitor();
  }

  onModuleDestroy() {
    this.logger.log('MonitorService destroyed. Clearing CPU monitoring interval...');
    if (this.cpuMonitorInterval) {
      clearInterval(this.cpuMonitorInterval);
    }
  }

  // CPU 사용률 모니터링 초기화
  private initCpuMonitor() {
    // 첫 스냅샷
    this.lastCpuInfo = this.getCpuTimes();

    // 일정 간격으로 CPU 사용률 업데이트
    this.cpuMonitorInterval = setInterval(() => {
      const currentCpuInfo = this.getCpuTimes();
      const cpuUsage = this.calculateCpuUsage(this.lastCpuInfo, currentCpuInfo);
      this.cpuUsagePercentage = cpuUsage;
      this.lastCpuInfo = currentCpuInfo;
      // this.logger.debug(`CPU Usage: ${cpuUsage.toFixed(2)}%`); // 디버깅용
    }, this.CPU_MONITOR_INTERVAL_MS);
  }

  // 현재 CPU 시간 정보 가져오기
  private getCpuTimes() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    for (const cpu of cpus) {
      for (const type in cpu.times) {
        totalTick += cpu.times[type as keyof os.CpuInfo['times']];
      }
      totalIdle += cpu.times.idle;
    }

    return { idle: totalIdle, total: totalTick };
  }

  // 두 스냅샷을 기반으로 CPU 사용률 계산
  private calculateCpuUsage(last: { idle: number; total: number }, current: { idle: number; total: number }): number {
    const idleDifference = current.idle - last.idle;
    const totalDifference = current.total - last.total;

    if (totalDifference === 0) {
      return 0; // Prevent division by zero
    }

    // (total - idle) / total = usage percent
    return ((totalDifference - idleDifference) / totalDifference) * 100;
  }

  // 외부에서 호출될 CPU 사용률 조회 메서드
  async getCpuUsage(): Promise<number> {
    // 주기적으로 업데이트되는 값을 반환
    return this.cpuUsagePercentage;
  }

  // 메모리 사용률 조회 메서드
  async getMemoryUsage(): Promise<number> {
    // Node.js 프로세스의 메모리 사용량 (RSS: Resident Set Size)
    const processMemory = process.memoryUsage().rss;
    // 시스템 전체 메모리
    const totalMemory = os.totalmem();

    // 시스템 전체 메모리 대비 프로세스 메모리 사용률
    // 또는, 시스템 전체 메모리 대비 사용 가능한 메모리 사용률을 원한다면:
    // const usedMemory = totalMemory - os.freemem();
    // return (usedMemory / totalMemory) * 100;

    // 여기서는 요청에 따라 전체 시스템 메모리 사용률을 반환
    // 샘플 출력처럼 ".7433..." 형태는 (전체 사용 메모리 / 전체 메모리) 입니다.
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    this.memoryUsagePercentage = usedMemory / totalMemory; // 소수점 형태로 유지

    return this.memoryUsagePercentage;
  }
}