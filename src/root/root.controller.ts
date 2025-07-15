// src/root/root.controller.ts

import { Controller, Get, Req } from '@nestjs/common';
import { RootService } from './root.service';
import { Request } from 'express';

/**
 * RootController
 * - Provides utility endpoints: IP, Date, Time
 */
@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  /**
   * Get client IP address
   * GET /ip
   */
  @Get('ip')
  getIP(@Req() req: Request): { clientIp: string } {
    const clientIp = this.rootService.getClientIp(req);
    return { clientIp };
  }

  /**
   * Get current ISO timestamp
   * GET /date
   */
  @Get('date')
  getDate(): string {
    const now = new Date().toISOString();
    return `Now: ${now}`;
  }

  /**
   * Get detailed date/time info
   * GET /time
   */
  @Get('time')
  getDateTime(): {
    TimeZone: string;
    DateTime: string;
    UTC: string;
  } {
    const dt = this.rootService.getDateTime();
    return {
      TimeZone: dt.timeZone,
      DateTime: dt.localDateTime,
      UTC: dt.utcDateTime,
    };
  }
}
