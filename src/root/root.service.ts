import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RootService {
  /**
   * Get client IP address from request headers or socket
   */
  getClientIp(req: Request): string {
    let finalIp = '';
    const forwardedIp = req.headers['x-forwarded-for'];
    if (!forwardedIp) {
      finalIp = req.ip ?? '';
    } else if (typeof forwardedIp === 'string') {
      finalIp = forwardedIp.split(',')[0].trim();
    }
    if (finalIp.startsWith('::ffff:')) {
      finalIp = finalIp.substring(7);
    }
    return finalIp;
  }

  /**
   * Get current datetime info: TimeZone, Local, and UTC
   */
  getDateTime() {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const formatDateTime = (date: Date) =>
      `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDateTime = formatDateTime(now);
    const utcDateTime = formatDateTime(new Date(now.getTime() + now.getTimezoneOffset() * 60000));

    return { timeZone, localDateTime, utcDateTime };
  }

  /**
   * Get application version from environment variables
   */
  getVersion(): string {
    return process.env.VERSION ?? 'Init Nest App';
  }
}
